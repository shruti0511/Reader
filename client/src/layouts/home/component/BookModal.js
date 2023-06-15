import { Box, Button, CardMedia, Grid, Typography } from '@mui/material';
import SoftBox from 'components/SoftBox';
import React from 'react'
import Prototypes from 'prop-types'
import defaultBookImage from "assets/images/default-images/defaultBookImage.jpg"
import SoftBadge from 'components/SoftBadge';
import Ratings from './Ratings';



const styles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    overflowY: scroll,
    p: 4,
};
const BookModal = ({ book, handleClose }) => {
    var imageSrc = book.image ? process.env.REACT_APP_SERVER_API + book.imagePath + "/" + book.image : defaultBookImage;
    const avgRating = book.rating.reduce((a, {rating}) => a + rating, 0) / book.rating.length;
    return (
        <Box sx={styles} className="bookModal">
            <Typography id="modal-modal-title" variant="h3">
                <Button onClick={handleClose} sx={{ float: 'right', fontSize: '20px' }} variant='secondary'>x</Button>
            </Typography>
            <Grid container mt={5}>
                <Grid item xs={12} md={4} xl={3} xxl={3}>
                    <SoftBox
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        // alignItems="center"
                        // bgColor="info"
                        borderRadius="lg"
                        variant="gradient"

                    >
                        <SoftBox component="img" src={imageSrc} alt="rocket" width="150px" ml={2} />
                    </SoftBox>
                </Grid>
                <Grid item xs={12} md={8} xl={9} xxl={9}>
                    <Typography id="modal-modal-title" variant="h3" mb={2}>
                        {book.title}
                    </Typography>
                    <Typography id="modal-modal-title" variant="body1" mb={1}>
                        {book.author}
                    </Typography>
                    <SoftBadge variant="gradient" badgeContent={book.categoryName} color="success" size="large" container />
                    <Typography>
                        <Ratings ratings={avgRating?avgRating:0}/>
                    </Typography>
                </Grid>
            </Grid>
            <Typography my={2} variant='body2'>
                {book.description}
            </Typography>

            {/* <AddRating/> */}
        </Box>
    )
}
BookModal.propTypes = {
    book: Prototypes.object.isRequired,
    handleClose: Prototypes.func.isRequired
}


export default BookModal