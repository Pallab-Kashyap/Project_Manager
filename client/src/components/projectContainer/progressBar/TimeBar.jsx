import React, { useEffect } from 'react'
import { IoIosTimer } from "react-icons/io";


function TimeBar({info}) {

    let remaining = ''
    const now = new Date(); 
    const endDate = info.endDate;
    const startedDate = info.startDate
    let width = ''
    let color = 'text-green-500'
    let bg = 'bg-green-500'


    const calsTime = () => {
      let remainingTime = endDate - now;
      // .log(remainingTime);
    

      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      // console.log(days, hours);
      if(days > 0){
           remaining = `${days}d`
      }else{
           remaining = ` ${hours}h`
      }

      // console.log(endDate);
      // console.log(startedDate);

       const totalTime = (endDate - startedDate) / (1000 * 60 * 60); 
     
      //   remainingTime = (endDate - now) / (1000 * 60 * 60); 
        remainingTime = (endDate - now) / (1000 * 60 * 60); 
  //       console.log(endDate);
  //       console.log(startedDate);
  //       console.log(now);
  //  console.log(remainingTime);
  //  console.log(totalTime);

      const remainingPercentage = (remainingTime / totalTime) * 100;
      width = `${remainingPercentage}%`
      
      // console.log(width);
      return remainingPercentage
    }

    if(endDate > now){
        // console.log(endDate, now);
        let remainingPercentage = calsTime()
             if (remainingPercentage < 25) {
               color = 'text-red-500';
               bg = 'bg-red-500';
             } else if (remainingPercentage < 50) {
               color = 'text-orange-500';
               bg = 'bg-orange-500';
             } else if (remainingPercentage < 75) {
               color = 'text-yellow-500';
               bg = 'bg-yellow-500';
             } else if (remainingPercentage < 100){
               color = 'text-green-500';
               bg = 'bg-green-500';
             }
          }
          else{
            width = '0%'
            color = 'text-red-500'
          }
        


    return (
        <div className='progressBar hidden sm:block ml-3 mt-2 p-2 py-3 group'>
            <div className='flex gap-3 mt-2'>
            <div className={`${color} text-xl`}>
                <IoIosTimer />
            </div>
            <div className='w-full mt-[1px] p-1 border-2 border-gray-500 rounded-full'>
              <div className={`${bg} h-2  rounded-full }`} style={{width}}></div>
            </div>
            </div>
            <div className='text-center mt-3 hidden group-hover:block text-slate-400'>remaining time: {remaining}</div>
        </div>
    )
}

export default TimeBar



