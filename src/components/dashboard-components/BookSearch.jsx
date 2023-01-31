import './BookSearch.css'
import React, { useEffect } from 'react'
import BookCard from './BookCard';

import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';



export default function BookSearch(){

    /*API KEY: AIzaSyB9KnXeZh_CTHkCd8xL-m2M25r8proPNuI */

    const [searchQuery, setSearchQuery] = React.useState("");
    

    let finalParam = ""


    const [booksData, setBooksData] = React.useState({})
    
    function handleInput(event){
        setSearchQuery(event.target.value)
    }

    function handleKeyPress(event){
        let key = event.keyCode
        let param = searchQuery.split("")

        if (key == 13){
            for (let i = 0; i < param.length; i++){
                if(param[i] == " "){
                    param[i] = "+"
                }
            }
            finalParam = param.join("")
            getAPIData(finalParam)

        }

    }


    useEffect(()=>{
        books()
    }, [])

    function books(){
        fetch('https://www.googleapis.com/books/v1/volumes?q=search+terms')
            .then((res) => res.json())
            .then((json) =>{
                setBooksData({
                    bookData: json
                })
            })
    

    }


    function getAPIData(title){
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}s&key=AIzaSyB9KnXeZh_CTHkCd8xL-m2M25r8proPNuI`)
            .then((res) => res.json())
            .then((json) => {
              setBooksData({
                bookData: json
              })
            })
    }

    let objectExists = false

    if(Object.keys(booksData).length>0){
        objectExists = true
    }

    let bookCards;
    
    if(objectExists){
        bookCards = booksData.bookData.items.map(data=>{
            return(
                <Card key={data.id} sx={{display:'flex', m:2}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', spacing: 1}} >
                        <CardContent sx={{flex: '1 0 auto'}}>
                            <Typography component='div' variant='h5'>
                                {data.volumeInfo.title}
                            </Typography>
                        </CardContent>
                        <Box sx={{display: 'flex'}}>
                            <IconButton aria-label="add">
                                <AddIcon/>
                            </IconButton>
                        </Box>
                    </Box>
                    <CardMedia
                        component='img'
                        sx={{width:151, height: '100%'}}
                        image={data.volumeInfo.imageLinks == undefined ? "" : data.volumeInfo.imageLinks.smallThumbnail}
                    />
                </Card>

            /* <BookCard key={data.id} bookTitle={data.volumeInfo.title} img={data.volumeInfo.imageLinks == undefined ? "" : data.volumeInfo.imageLinks.smallThumbnail}/>*/)
        })
    }
    

   

    return(
        <div className='booksearch-main'>
            <div className='searchbox'>
                <input type='text' placeholder='Search for a book' onChange={handleInput} onKeyDown={handleKeyPress}></input>
            </div>
            <div className='searchResults'>
                {bookCards}
            </div>
        </div>
    )
}