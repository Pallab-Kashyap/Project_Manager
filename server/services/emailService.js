// const brevo = require('@getbrevo/brevo');

// const htmlContent = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
// <html dir="ltr" lang="en">

//   <head>
//     <link rel="preload" as="image" href="https://react-email-demo-d99odc1fw-resend.vercel.app/static/airbnb-logo.png" />
//     <link rel="preload" as="image" href="https://react-email-demo-d99odc1fw-resend.vercel.app/static/airbnb-review-user.jpg" />
//     <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
//     <meta name="x-apple-disable-message-reformatting" />
//   </head>
//   <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Read Alex&#x27;s review<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
//   </div>

//   <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
//     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:100%;margin:0 auto;padding:20px 0 48px;width:580px">
//       <tbody>
//         <tr style="width:100%">
//           <td>
//             <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
//               <tbody>
//                 <tr>
//                   <td><img alt="Airbnb" height="30" src="https://react-email-demo-d99odc1fw-resend.vercel.app/static/airbnb-logo.png" style="display:block;outline:none;border:none;text-decoration:none" width="96" /></td>
//                 </tr>
//               </tbody>
//             </table>
//             <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
//               <tbody>
//                 <tr>
//                   <td><img alt="Alex" height="96" src="https://react-email-demo-d99odc1fw-resend.vercel.app/static/airbnb-review-user.jpg" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto;margin-bottom:16px;border-radius:50%" width="96" /></td>
//                 </tr>
//               </tbody>
//             </table>
//             <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-bottom:20px">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
//                       <tbody style="width:100%">
//                         <tr style="width:100%">
//                           <p style="font-size:32px;line-height:1.3;margin:16px 0;font-weight:700;color:#484848">Here&#x27;s what <!-- -->Alex<!-- --> wrote</p>
//                           <p style="font-size:18px;line-height:1.4;margin:16px 0;color:#484848;padding:24px;background-color:#f2f3f3;border-radius:4px">“Alan was a great guest! Easy communication, the apartment was left
//                             in great condition, very polite, and respectful of all house rules.
//                             He’s welcome back anytime and would easily recommend him to any
//                             host!”</p>
//                           <p style="font-size:18px;line-height:1.4;margin:16px 0;color:#484848">Now that the review period is over, we’ve posted <!-- -->Alex<!-- -->’s review to your Airbnb profile.</p>
//                           <p style="font-size:18px;line-height:1.4;margin:16px 0;color:#484848;padding-bottom:16px">While it’s too late to write a review of your own, you can send your feedback to <!-- -->Alex<!-- --> using your Airbnb message thread.</p><a href="https://airbnb.com/" style="line-height:100%;text-decoration:none;display:block;max-width:100%;mso-padding-alt:0px;background-color:#ff5a5f;border-radius:3px;color:#fff;font-size:18px;padding-top:19px;padding-bottom:19px;text-align:center;width:100%;padding:19px 0px 19px 0px" target="_blank"><span><!--[if mso]><i style="mso-font-width:NaN%;mso-text-raise:28.5" hidden></i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:14.25px">Send My Feedback</span><span><!--[if mso]><i style="mso-font-width:NaN%" hidden>&#8203;</i><![endif]--></span></a>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
//             <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
//                       <tbody style="width:100%">
//                         <tr style="width:100%">
//                           <p style="font-size:18px;line-height:1.4;margin:16px 0;color:#484848;font-weight:700">Common questions</p>
//                           <p style="font-size:14px;line-height:24px;margin:16px 0"><a href="https://airbnb.com/help/article/13" style="color:#ff5a5f;text-decoration:none;font-size:18px;line-height:1.4;display:block" target="_blank">How do reviews work?</a></p>
//                           <p style="font-size:14px;line-height:24px;margin:16px 0"><a href="https://airbnb.com/help/article/1257" style="color:#ff5a5f;text-decoration:none;font-size:18px;line-height:1.4;display:block" target="_blank">How do star ratings work?</a></p>
//                           <p style="font-size:14px;line-height:24px;margin:16px 0"><a href="https://airbnb.com/help/article/995" style="color:#ff5a5f;text-decoration:none;font-size:18px;line-height:1.4;display:block" target="_blank">Can I leave a review after 14 days?</a></p>
//                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
//                           <p style="font-size:14px;line-height:24px;margin:16px 0;color:#9ca299;margin-bottom:10px">Airbnb, Inc., 888 Brannan St, San Francisco, CA 94103</p><a href="https://airbnb.com" style="color:#9ca299;text-decoration:underline;font-size:14px" target="_blank">Report unsafe behavior</a>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   </body>

// </html>`

// const sendEmail = async (receivers, htmlContent) => {
//     let defaultClient = brevo.ApiClient.instance;
    
//     let apiKey = await defaultClient.authentications['api-key'];
//     apiKey.apiKey = process.env.EMAIL_API_KEY;
    
//     let apiInstance = new brevo.TransactionalEmailsApi();

//     const sender = {
//         email: 'lukeneon7@gmail.com',
//         name: 'pallab'
//     };

//     const receivers = [
//         {
//             email: 'pallabkshyp@gmail.com',

//         }
//     ]
    
//     try{
//         const data = await apiInstance.sendTransacEmail({
//             sender,
//             to: receivers,
//             subject: "test email with sandinblue",
//             textContent: "test email",
//             htmlContent
//         })

//         console.log('data: ', data);
//     }catch(err){
//         console.log('ERROR: ', err);
//     }
 
// }

// module.exports = sendEmail
