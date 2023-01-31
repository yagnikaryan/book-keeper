import React from 'react'
import './BookCard.css'


const storeItem = []


export default function BookCard(props){

    const [isBookAdded, setIsBookAdded] = React.useState(false)

    function toStoreItems(){
        storeItem.push({title: props.bookTitle,})
        setIsBookAdded(prev => !prev)
    }

    function removeItem(){
        const index = storeItem.indexOf(props.bookTitle)
        if (index > -1){
            storeItem.splice(index,1)
        }

        setIsBookAdded(prev => !prev)
    }

    let addButton = <button onClick={toStoreItems} className='store-items-button'></button>
    let removeButton = <button className='remove-button-test'onClick={removeItem}></button>
    
    return(
        <div className='main-card'>
            <div className='info-card'>
                <div className='image-container'>
                    <img src={props.img}></img>
                </div>

                <div className='data-container'>
                    <h3>{props.bookTitle}</h3>
                </div>

                <div className='button-container'>
                    {isBookAdded ? removeButton : addButton}
                </div>

            </div>
        </div>
    )

}

export {storeItem}