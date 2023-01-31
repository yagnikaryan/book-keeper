
import './SetBookSize.css'

export default function SetBookSize(){


    return(
        <div className="set-books-size-main">
            <div className='set-books-size-title'>
                <h1>(Estimate) On average, how big are the books you choose to read?</h1>
            </div>
            <div className='set-books-size-input'>
                <button>0-100</button>
                <button>100-500</button>
                <button>500-1000</button>
            </div>
        </div>
    )
}