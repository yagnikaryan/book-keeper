import './Library.css'
import React from 'react'
import LibraryItem from './library-component/LibraryItem'
import { storeItem } from './BookCard.jsx'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material'

export default function Library(){



    const [library, setLibrary] = React.useState(0)

    
    
    
    function handleClick(){
        setLibrary(library+1)
        console.log(library)
    }

    function removeItem(item){
        const index = storeItem.indexOf(item)
        if (index > -1){
            storeItem.splice(index,1)
        }
    }

    function renderedList(){
        let renderList = storeItem.map(data => {
            return(
                <div className='want-to-read'>
                    {data}
                </div>
            )
        })

        return renderList
    }

    return(
        <div className='library-container'>
            <TableContainer component={Paper}>
                <Table sx={{minWidth:650}} size ="small" aria-label="a table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Pages</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>

            {/* <div className = 'update-button-container'>
                <button onClick={handleClick} className='update-library'>Update Library</button>
            </div> */ }
            
            {/* renderedList() */}


        </div>
    )
}