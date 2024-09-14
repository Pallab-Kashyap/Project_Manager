import React, { useState } from "react";
import DateTimePicker from "flatpickr-react";
import "flatpickr/dist/flatpickr.css";
import { English } from 'flatpickr/dist/l10n/default';
// import "flatpickr/dist/l10n/en";


function SelectDate({ info }) {


    let { date, setDate } = info

    


	return (
			<DateTimePicker
				options={{
					dateFormat: "d-m-Y",
                    minDate: 'today',
					locale: English
				}}
                onChange={(e) => setDate(new Date(e))}
				value={date}
                
                className="bg-transparent border-2 border-gray-500 rounded-xl p-1 px-4 text-white w-fit"
			/>
	);
}

export default SelectDate
