
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import SoftBox from 'components/SoftBox';
import React from 'react'
import Prototypes from 'prop-types'
import defaultCategory from "assets/images/default-images/defaultCategory.jpg"
import SoftBadge from 'components/SoftBadge';
import Ratings from '../../component/Ratings';
import ReviewList from '../../component/ReviewList';
import 'assets/css/bookModal.css';
import SoftTypography from 'components/SoftTypography';
import ReadOrBuyButton from '../../component/ReadOrBuyButton';
import AddReview from 'layouts/component/AddReview';


// const styles = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 1000,
//     height: 600,
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     borderRadius: "10px",
//     boxShadow: 24,
//     p: 4,
// };
const BookView = ({ book,submitReview }) => {
    var imageSrc = book.image ? process.env.REACT_APP_SERVER_API + book.imagePath + "/" + book.image : defaultCategory;
    //const avgRating = book.rating.reduce((a, { rating }) => a + rating, 0) / book.rating.length;
    const Released_date = new Date(book.publication_date)
    return (
        <Box >
            <Grid container mt={5}>
                <Grid item xs={12} md={4} xl={3} xxl={2}>
                    <SoftBox
                        height="100%"
                        display="flex"
                        justifyContent="left"
                        borderRadius="lg"

                    >
                        <SoftBox component="img" src={imageSrc} alt="rocket" width="180px" ml={2} />
                    </SoftBox>
                </Grid>
                <Grid item xs={12} md={8} xl={9} xxl={10}>
                    <SoftTypography variant="h3" mb={0.5}>
                        {book.title}
                    </SoftTypography>
                    <SoftTypography variant="body1" color="text" fontWeight="medium" mb={0.5}>
                        {book.author}
                    </SoftTypography>
                    <SoftTypography variant="body2" color="text" fontWeight="medium" mb={1}>
                        Released {Released_date.toDateString()}
                    </SoftTypography>
                    <SoftBadge variant="gradient" badgeContent={book.category.name} color="success" size='xl' container />
                    <SoftTypography mt={1} mb={1}>
                        <Ratings ratings={book.avgRating} showNumber={true} smallSize={false} />
                    </SoftTypography>
                    <SoftBox>
                        <ReadOrBuyButton price={book.price} bookFile={book.bookFile} bookFilePath={book.bookFilePath}  bookId={book._id}/>
                    </SoftBox>

                </Grid>
            </Grid>
            <SoftBox m={2}>
                <SoftTypography variant="body1" color="text" fontWeight="medium">
                    About the Book
                </SoftTypography>
                <Divider variant="inset" />
                <SoftTypography mb={2} variant='body2' >
                    {book.description}
                </SoftTypography>
                <ReviewList reviews={book.rating} />
                <AddReview addReviewFun={submitReview} />

            </SoftBox>
        </Box>
    )
}
BookView.propTypes = {
    book: Prototypes.object.isRequired,
    submitReview: Prototypes.func.isRequired
}


export default BookView