import Bull from 'bull';
import mongoose from 'mongoose';
import { generateToken } from '../utils/generateAndVerifyToken';
import { addLinkToEmailTamplate } from '../utils/emailTemplates';
import nodemailer from 'nodemailer';

interface EmailJob {
  to: string;
  subject: string;
  html: string;
}

interface BatchEmailJob {
  emails: EmailJob[];
}

const emailQueue = new Bull<BatchEmailJob>('emailQueue', {
  redis: { host: 'localhost', port: 6379 },
  limiter: {
    max: 50, 
    duration: 1000 
  }
});


emailQueue.process(async (job) => {
  const { emails } = job.data;
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_PASSWORD, 
    },
  });

  const results = await Promise.allSettled(
    emails.map(async (email) => {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: email.to,
          subject: email.subject,
          html: email.html
        });
        return { email: email.to, status: 'success' };
      } catch (error) {
        return { email: email.to, status: 'failed', error };
      }
    })
  );

  return results;
});

const sendEmailsToMembers = async (
  emails: string[],
  projectId: mongoose.Schema.Types.ObjectId,
  subject: string,
  baseHtml: string,
  batchSize = 50
): Promise<boolean> => {
  try {
    
    const emailJobs = await Promise.all(
      emails.map(async (email) => {
        const data = { projectId, email };
        const token = generateToken(data, '10d');
        const clientURL = process.env.CLIENT_BASE_URL;

        if (!token || !clientURL) {
          throw new Error('Missing token or client URL');
        }

        const link = `${clientURL}onboarding/token=${token}`;
        const htmlLink = addLinkToEmailTamplate(link);
        const finalHtml = baseHtml + htmlLink;

        return {
          to: email,
          subject,
          html: finalHtml
        };
      })
    );

    
    const batches = [];
    for (let i = 0; i < emailJobs.length; i += batchSize) {
      batches.push(emailJobs.slice(i, i + batchSize));
    }

    
    const queuePromises = batches.map(batch => 
      emailQueue.add({ emails: batch }, {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000
        }
      })
    );

    await Promise.all(queuePromises);
    return true;

  } catch (error) {
    console.error('Error in sendEmailsToMembers:', error);
    return false;
  }
};


emailQueue.on('completed', (job, result) => {
  console.log(`Batch completed: ${result.length} emails processed`);
});

emailQueue.on('failed', (job, error) => {
  console.error('Job failed:', error);
});

export default sendEmailsToMembers;