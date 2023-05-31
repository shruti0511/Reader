import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import bookService from 'services/bookService';
import BookView from './component/BookView';
import ratingService from 'services/ratingService';

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

  const submitReview = (rating, review) => {
    const obj = {rating,review,book:book._id}
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
      <DashboardNavbar />
      {book &&
        <BookView book={book} submitReview={submitReview} />
      }
    </DashboardLayout>
  )
}

export default BookDetails