import './SetBookNumber.css'
import React, {useState} from 'react'

export default function SetBookNumber(){


    const [numberOfBooks, setNumberOfBooks] = React.useState(0)
    
    const [isButtonNeeded, setIsButtonNeeded] = React.useState(false)

    function onType(event){
        let value = event.target.value
        setNumberOfBooks(value)
        setIsButtonNeeded(true)

    }    

    return(
        <div className="set-books-main">
            <div className="set-books-title">
                <h1>How many books would you like to read this year?</h1>
            </div>
            <div className="set-books-number">
                <input type='number' id='books-number' name='books-number' className='books-num-input' placeholder='0' onChange={onType}></input>
            </div>
            <div className='response'>
                {isButtonNeeded && <button className='submit-response'>Submit</button>}
            </div>
        </div>
    )
}