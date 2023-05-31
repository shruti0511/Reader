import { Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import Ratings from './Ratings'
import SoftBox from 'components/SoftBox'
import PropTypes from 'prop-types'
import SoftTypography from 'components/SoftTypography'

const ReviewList = ({ reviews }) => {
    const reviewBox = (review) => {
        return (

            <SoftBox display="flex" flexDirection="column" ml={2}>
                <Typography
                    component="span"
                    variant="body2"
                    color="text.primary">
                    {review.user?.name}
                </Typography>
                <Typography
                    variant="caption"
                    color="text.secondary" >
                    {review.review}
                </Typography>
                <Ratings ratings={review.rating} showNumber={false} smallSize={false}/>
            </SoftBox>
        )
    }

    const allReviews = reviews.map((review) => reviewBox(review))
    return (
        <>
            <SoftTypography variant="body1" color="text" fontWeight="medium">Reviews</SoftTypography>
            <Divider variant="inset"/>
            {allReviews}

        </>
    )
}
ReviewList.propTypes = {
    reviews: PropTypes.isRequired,
};
export default ReviewList