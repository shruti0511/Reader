import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, ListItem, ListItemText, Rating, TextField, Typography } from '@mui/material'
import SoftBox from 'components/SoftBox'
import Ratings from './Ratings'
import SoftButton from 'components/SoftButton'
import ratingService from 'services/ratingService'

const UserReview = ({ userReview,getBookDetails }) => {
  const [userRatingShow, setUserRatingShow] = useState(true)
  const [show, setShow] = useState(false)
  const [ratingValue, setRatingValue] = useState(null)
  const [review, setReview] = useState('');

  const handleReviewchange = (e) => {
    setReview(e.target.value);
  }

  const onEditClicked = () => {
    setRatingValue(userReview.rating)
    setReview(userReview.review)
    setUserRatingShow(false)
    setShow(true)
  }
  const onDeleteClicked = () => {
    const obj = {
      id: userReview._id
    }
    ratingService.deleteRating(obj)
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

  const updateReview = () => {
    const obj = {
      rating: ratingValue,
      review: review,
      id: userReview._id
    }
    ratingService.updateRating(obj)
      .then((response) => {
        if (response.status === 200) {
          getBookDetails()
          setUserRatingShow(true)
          setShow(false)
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
    <>
      <ListItem alignItems="flex-start" sx={{ marginBottom: '20px' }}>
        <ListItemText
          primary={
            <SoftBox display="flex" flexDirection="row">
              <Typography
                variant="h5"
                color="text.secondary" >
                {userReview.user?.name}
              </Typography>

              <Button
                size="small"
                sx={{ textTransform: "none" }}
                onClick={onEditClicked}
              >
                Edit
              </Button>
              <Button
                // variant='error'
                color='error'
                size="small"
                sx={{ textTransform: "none", color:'red' }}
                onClick={onDeleteClicked}
              >
                Remove
              </Button>

            </SoftBox>
          }
          secondary={userRatingShow &&
            <SoftBox display="flex" flexDirection="column">

              <Typography
                variant="body2"
                color="text.secondary" >
                {userReview.review}
              </Typography>

              <Ratings ratings={userReview.rating} showNumber={false} smallSize={false} />
            </SoftBox>
          }
        />
      </ListItem>
      {show &&
        <>
          <Rating
            name="half-rating"
            value={ratingValue}
            precision={0.5}
            size='large'
            onChange={(event, newValue) => {

              setRatingValue(newValue);
            }}
          />

          {ratingValue !== null &&
            <>
              <SoftBox mb={1}>
                <TextField
                  multiline
                  rows={3}
                  onChange={handleReviewchange}
              value={review}
              placeholder='Enter your review....'
                />
              </SoftBox>
              <SoftButton m={1} color="info" onClick={updateReview}>Update Review</SoftButton>
            </>
          }
        </>
      }

    </>
  )
}
UserReview.propTypes = {
  userReview: PropTypes.object.isRequired,
  getBookDetails:PropTypes.func.isRequired
};
export default UserReview