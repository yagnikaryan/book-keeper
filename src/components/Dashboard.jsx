import BookSearch from './dashboard-components/BookSearch'
import Estimate from './dashboard-components/Estimate'
import CurrentBook from './dashboard-components/CurrentBook'
import './Dashboard.css'
import Library from './dashboard-components/Library'

export default function Dashboard(){
    return(
        <div className='main-container'>
            <div>
                <Estimate/>
                
            </div>
            
          

            <div className='component1'>
                <BookSearch/>
                <div className='component2'>
                    <CurrentBook/>
                    <Library/>
                </div>
            </div>
            


        </div>
    )
}