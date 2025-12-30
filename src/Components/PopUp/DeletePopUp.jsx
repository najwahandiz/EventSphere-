import React from 'react'
import {deleteEvent} from '../../Api/request'

export default function DeletePopUp({deletedEvent, closeDeletePopup}) {

const Delete = async () =>{
    try {
      await deleteEvent (deletedEvent);
      closeDeletePopup(true);

    } catch (error) {
      console.log("error in deleting event",error)
    }
}

  return (
    <div className='popUpOverley'>
      <div className='popUpContainer'>
        <h2>Do you want to delete this event</h2>
        <div className='btnDiv'>
          <button onClick={Delete}>Confirm</button>
          <button onClick={()=>{closeDeletePopup(false)}}>Skip </button>
        </div>
      </div>
        
    </div>
  )
}