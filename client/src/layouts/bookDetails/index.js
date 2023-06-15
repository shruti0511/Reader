import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import bookService from 'services/bookService';
import ratingService from 'services/ratingService';
import { Box, Divider, Grid } from '@mui/material';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import Ratings from 'layouts/component/Ratings';
import ReadOrBuyButton from 'layouts/component/ReadOrBuyButton';
import SoftBadge from 'components/SoftBadge';
import defaultBookImage from "assets/images/default-images/defaultBookImage.jpg"
import UserReview from 'layouts/component/UserReview';
import AddReview from 'layouts/component/AddReview';
import ReviewBox from 'layouts/component/ReviewBox';

const BookDetails = () => {
  const params = useParams()
  const [book, setBook] = useState();

  useEffect(() => {
    getBookDetails()

  }, [])

  const getBookDetails = () => {
    bookService.getBookById(params.id)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setBook(response.data);
        }
      })
      .catch((error) => {
        // error is handled in catch block
        if (error.response) {
          // status code out of the range of 2xx
          console.log("Data :", error.response.data);
          console.log("Status :" + error.response.status);
          //}
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Error on setting up the request
          console.log("Error", error.message);
        }
      });
  }

  const addReview = (ratingValue, review) => {

    const obj = {
      rating: ratingValue,
      review: review,
      book: book._id
    }

    ratingService.addRating(obj)
      .then((response) => {
        if (response.status === 200) {
          getBookDetails()
        }
      })
      .catch((error) => {
        // error is handled in catch block
        if (error.response) {
          // status code out of the range of 2xx
          console.log("Data :", error.response.data);
          console.log("Status :" + error.response.status);
          //}
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Error on setting up the request
          console.log("Error", error.message);
        }
      });

  }

  return (
    <DashboardLayout>
      <DashboardNavbar navTitle="Book Detail"/>
      {book &&
        <Box >
          <Grid container mt={5}>
            <Grid item xs={12} md={4} xl={3} xxl={2}>
              <SoftBox
                height="100%"
                display="flex"
                justifyContent="left"
                borderRadius="lg"

              >
                <SoftBox component="img" src={book.image ? process.env.REACT_APP_SERVER_API + book.imagePath + "/" + book.image : defaultBookImage} alt="rocket" width="180px" ml={2} />
              </SoftBox>
            </Grid>
            <Grid item xs={12} md={8} xl={9} xxl={10}>
              <SoftTypography variant="h3" mb={0.5}>
                {book.title}
              </SoftTypography>
              <SoftTypography variant="body1" color="text" fontWeight="medium" mb={0.5}>
                {book.author.name}
              </SoftTypography>
              <SoftTypography variant="body2" color="text" fontWeight="medium" mb={1}>
                Released {new Date(book.publication_date).toDateString()}
              </SoftTypography>
              <SoftBadge variant="gradient" badgeContent={book.category.name} color="success" size='xl' container />
              <SoftTypography mt={1} mb={1}>
                <Ratings ratings={book.avgRating} showNumber={true} smallSize={false} />
              </SoftTypography>
              <SoftBox>
                <ReadOrBuyButton price={book.price} bookFile={book.bookFile} bookFilePath={book.bookFilePath} bookId={book._id} />
              </SoftBox>

            </Grid>
          </Grid>
          <SoftBox m={2}>
            <SoftTypography variant="h4" color="text" fontWeight="medium">
              About the Book
            </SoftTypography>
            {/* <Divider variant="inset" /> */}
            <SoftTypography mb={2} variant='body2'>
              {book.description}
            </SoftTypography>



            {/* <Divider variant="inset" /> */}
            <SoftTypography mb={2} variant='body2'>
              <b>Language:</b> {book.language.name}
            </SoftTypography>
            <Divider variant="inset" />
            <SoftTypography variant="h4" color="text" fontWeight="medium">
              About the Author
            </SoftTypography>
            {/* <Divider variant="inset" /> */}
            <SoftTypography mb={2} variant='body2'>
              {book.author.description}
            </SoftTypography>
            <Divider variant="inset" />
            <SoftTypography variant="h4" color="text" fontWeight="medium" mt={2} mb={1}>
              Reviews
            </SoftTypography>
            {book.userRating
              ? <UserReview userReview={book.userRating} getBookDetails={getBookDetails} />
              : <AddReview addReviewFun={addReview} />
            }
            {
              book.ratings.map((review, index) =>
                <ReviewBox review={review} key={index} />
              )
            }


          </SoftBox>
        </Box>
      }
    </DashboardLayout>
  )
}

export default BookDetails