import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import React, { useState } from 'react'
import { DateRangePicker } from 'react-date-range';
import {useStateValue} from '../backend/StateProvider'
const DatePicker = () => {

    const [startDate,setStartDate] = useState(new Date())
    const [endDate,setEndDate] = useState(new Date())
  const [beginDate,dispatch] = useStateValue()
  const [finalDate] = useStateValue()

      const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
      }
    const handleSelect = (ranges)=>{
      
         
          
      setStartDate(ranges.selection.startDate)
      setEndDate(ranges.selection.endDate)

dispatch({
  type:'ADD_DATE',
 end:endDate
})    
 }

  

    return (
        <div>
               <DateRangePicker
                ranges={[selectionRange]}
              
        onChange={handleSelect}
      />
        </div>
    )
}

export default DatePicker
