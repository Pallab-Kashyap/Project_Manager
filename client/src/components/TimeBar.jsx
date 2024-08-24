import React from 'react'

function TimeBar({info}) {


    let remaining = ''
    const now = new Date(); // Get the current date and time
    const dueDate = info.due_date;
    const startedDate = info.start_date
    
    if(dueDate > now){
            // Calculate the difference in milliseconds
            const remainingTime = dueDate - now;
          
            // Convert milliseconds to days, hours, minutes, and seconds
            const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            if(days > 0){
                 remaining = `${days}d`
            }else{
                 remaining = ` ${hours}h`
            }

             // Calculate the total time from start to due in hours
             const totalTime = (dueDate - startedDate) / (1000 * 60 * 60); // Convert milliseconds to hours
           
             // Calculate the remaining time from now to due in hours
              remainingTime = (dueDate - now) / (1000 * 60 * 60); // Convert milliseconds to hours
           
             // Calculate the percentage of remaining time
             const remainingPercentage = (remainingTime / totalTime) * 100;
           
             // Ensure percentage is within bounds (0 - 100)
          }
          else{
            return (
                <div>time up</div>
            )
          }
        


    return (
        <></>
    )
}

export default TimeBar



