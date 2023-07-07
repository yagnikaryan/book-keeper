import { useState, useEffect } from 'react';
import { Grid, Dialog, DialogContent, DialogTitle, Card, CardMedia, Typography, CardContent, Box, Button } from '@mui/material';
import './Library.css'





function Library() {
    const [library, setLibrary] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState(JSON.parse(localStorage.getItem('currentBook')) || null);

    const handleSetCurrentBook = () => {
        localStorage.setItem('currentBook', JSON.stringify(selectedBook));
        setCurrentBook(selectedBook);
        handleClose()
    };

    const handleRemove = (bookId) => {
        console.log(bookId)
    
        // Get the current list of book IDs in local storage
        let bookIds = JSON.parse(localStorage.getItem('library') || '[]');
    
        // Filter out the ID of the book you're removing
        let updatedBookIds = bookIds.filter(id => id !== bookId);
    
        // Save the updated list back to local storage
        localStorage.setItem('library', JSON.stringify(updatedBookIds));
    
        // Remove the book from localStorage
        localStorage.removeItem(bookId);
    
        // Fetch the books corresponding to the updated IDs
        let updatedBooks = updatedBookIds.map(id => JSON.parse(localStorage.getItem(id)));
    
        // Check if the book to be removed is the current book
        let currentBook = JSON.parse(localStorage.getItem('currentBook') || '{}');
        if (currentBook.id === bookId) {
            localStorage.removeItem('currentBook');
            setCurrentBook(null);
        }
    
        // Update the library state
        setLibrary(updatedBooks);
    
        // Clear the selectedBook state and close the dialog
        setSelectedBook(null);
        handleClose();
    };
    
    
    
    useEffect(() => {
        const savedLibrary = localStorage.getItem('library');
        if (savedLibrary) {
            const bookIds = JSON.parse(savedLibrary);
            const books = bookIds.map(id => JSON.parse(localStorage.getItem(id)));
            setLibrary(books);
        }
    }, []);

    const handleBookClick = (book) => {
        setSelectedBook(book);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='main-div' style={library.length === 0 ? {display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'} : {}}>
            {library.length == 0 ? (
                <Typography variant='h5' style={{textAlign: 'center'}}>No Books in Library</Typography>
            ) : ( 
                <Grid container spacing={3}>
                    {library.map((book, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <Card className='book-card' onClick={() => handleBookClick(book)}>
                                <CardMedia 
                                    className='book-img'
                                    component='img' 
                                    sx={{width:151, height: '100%'}} 
                                    image={book.imageLinks == undefined ? "" : book.imageLinks.smallThumbnail}
                                />
                                <CardContent>
                                    <Typography variant='h5'>{book.title}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            
            {selectedBook && 
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={'paper'}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">{selectedBook.title}</DialogTitle>
                    <DialogContent dividers={true}>
                        <Box>
                            <Typography variant='h5' className='author'>Author(s): {selectedBook.authors}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5" className='book-desc' style={{fontSize: '24px'}}>Description</Typography>
                            <Typography variant="h4" className='book-desc-card' style={{fontSize: '20px'}}>{selectedBook.description}</Typography>
                            <Typography gutterBottom>
                                Number of pages: {selectedBook.pageCount}
                            </Typography>
                            <Button variant='contained' color='secondary' onClick={() => {
                                console.log(selectedBook)
                                handleRemove(selectedBook.id)
                                }}>Remove</Button>
                            <Button variant='contained' color='primary' onClick={() => handleSetCurrentBook(selectedBook)}>
                                Set As Current
                            </Button>
                        </Box>
                    </DialogContent>
                </Dialog>
            }
        </div>
    );
}

export default Library;
