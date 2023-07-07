import React from "react";
import './Search.css'
import { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, IconButton, Typography, CardActions} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export default function Search(){

    const [searchQuery, setSearchQuery] = React.useState("")
    const [expanded, setExpanded] = React.useState(false)
    const [library, setLibrary] = React.useState(() => {
        const savedLibrary = localStorage.getItem('library')
        if (savedLibrary) return JSON.parse(savedLibrary)
        else return []
    })

    useEffect(() => {
        localStorage.setItem('library', JSON.stringify(library))
    }, [library])

    const handleExpandClick = (id) => {
        setExpanded(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }))
    }

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

    useEffect(() =>{
        books()
    }, [])

    function books(){
        fetch('https://www.googleapis.com/books/v1/volumes?q=search+terms')
            .then((res) => res.json())
            .then((json) => {
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

        console.log(booksData)
    }

    let objectExists = false

    if(Object.keys(booksData).length > 0){
        objectExists = true
    }

    let bookCards;
    if(objectExists){
        bookCards = booksData.bookData.items.map(data=>{
            
            const isInLibrary = library.includes(data.id)

            const handleAddToLibrary = () => {
                const bookData = {
                    ...data.volumeInfo,
                    id: data.id
                }
                localStorage.setItem(data.id, JSON.stringify(bookData))
                setLibrary(prevLibrary => [...prevLibrary, data.id])
            }
            
            const handleRemoveFromLibrary = () => {
                localStorage.removeItem(data.id);
                setLibrary(prevLibrary => prevLibrary.filter(bookId => bookId != data.id))
            }

            const handleButtonClick = isInLibrary ? handleRemoveFromLibrary : handleAddToLibrary
            const buttonText = isInLibrary ? "Remove" : "Add To Library"

            return(
                <Card key={data.id} sx={{m:5}} className="card1">
                    <Box sx={{display:'flex', flexDirection: 'column', spacing: 1}} className="card2">
                        <CardContent sx={{flex: '1 0 auto'}}>
                            <Typography className='title' component='div' variant='h5'>
                                {data.volumeInfo.title}
                            </Typography>
                        </CardContent>
                    </Box>
                    <CardMedia className="image-container" component='img' sx={{width:151, height: '100%'}} image={data.volumeInfo.imageLinks == undefined ? "" : data.volumeInfo.imageLinks.smallThumbnail}/>
                    <CardActions disableSpacing>
                        <Button className="add-button" sx={{color: 'gray'}} onClick={handleButtonClick}>{buttonText}</Button>
                        <ExpandMore
                            expand={expanded[data.id]}
                            onClick={() => handleExpandClick(data.id)}
                            aria-expanded={expanded}
                            aria-label="show-more"
                        ><ExpandMoreIcon/></ExpandMore>
                    </CardActions>
                    <Collapse in={expanded[data.id]} timeout="auto" unmountOnExit>
                        <Box className='author'>
                            <Typography variant='h5'>Author(s): {data.volumeInfo.authors}</Typography>
                        </Box>
                        <Box className='description'>
                            <Typography variant="h5">Description</Typography>
                            <Typography variant="h4">{data.volumeInfo.description}</Typography>
                        </Box>
                    </Collapse>
                </Card>
            )
        })
    }

    return(
        <div className='booksearch-main'>
            <div className='searchbox'>
                <input className='searchboxtype' type='text' placeholder="Search for a book" onChange={handleInput} onKeyDown={handleKeyPress}></input>
            </div>
            <div className='searchResults'>
                {bookCards}
            </div>
        </div>
    )
}