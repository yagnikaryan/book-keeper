import { useState, useEffect } from 'react';
import { Typography, Box, LinearProgress, Grid, Card, CardMedia, Dialog, DialogTitle, DialogContent, Button } from '@mui/material';



function Dashboard() {
    const [currentBook, setCurrentBook] = useState(null);
    const [library, setLibrary] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Retrieve the current book and library from local storage
        setCurrentBook(JSON.parse(localStorage.getItem('currentBook')));
        setLibrary(JSON.parse(localStorage.getItem('library')));
    }, []);

    useEffect(() => {
        let bookIds = JSON.parse(localStorage.getItem('library') || '[]');
        let books = bookIds.map(id => JSON.parse(localStorage.getItem(id)));
        setLibrary(books);
      }, []);
      

    const handleClickOpen = (book) => {
        setSelectedBook(book);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Typography variant="h2">Dashboard</Typography>

            <Box display="flex" my={4}>
                {currentBook && (
                    <>
                        <Box marginRight={2}>
                            <Card>
                                <CardMedia component='img' image={currentBook.imageLinks.thumbnail} />
                            </Card>
                        </Box>

                        <Box flexGrow={1}>
                            <Typography variant='h6'>{currentBook.title}</Typography>
                            <LinearProgress variant="determinate" value={50} /> {/* Replace 50 with actual reading progress */}
                        </Box>
                    </>
                )}
            </Box>

            {library.length > 1 || (library.length === 1 && library[0].id !== currentBook.id) ? (
                library.map((book) => (
                    <Grid item xs={3} key={book.id}>
                        <Card onClick={() => handleClickOpen(book)}>
                            <CardMedia component='img' image={book.imageLinks?.smallThumbnail || 'defaultImage.jpg'} />
                        </Card>
                    </Grid>
                ))
            ) : (
                <Typography variant="h6">Add more books to library</Typography>
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
                            <Typography variant="h5" className='book-desc'>Description</Typography>
                            <Typography variant="h4" className='book-desc-card'>{selectedBook.description}</Typography>
                            <Typography gutterBottom>
                                Number of pages: {selectedBook.pageCount}
                            </Typography>
                        </Box>
                    </DialogContent>
                </Dialog>
            }
        </>
    );
}

export default Dashboard;
