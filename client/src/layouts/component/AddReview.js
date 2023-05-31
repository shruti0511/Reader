import {  Rating, TextField } from '@mui/material'
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftTypography from 'components/SoftTypography'
import Prototypes from 'prop-types'
import React, { useState } from 'react'

const AddReview = ({addReviewFun}) => {
    const [ratingValue, setRatingValue] = useState(0);
    const [review, setReview] = useState('');
    const [error, setError] = useState('');

    const handleReviewchange = (e) => {
        setReview(e.target.value);
    }

    const submitReview = () => {
        if (ratingValue == 0) {
            setError('select your rating')
        } else {
            setError('')
            setRatingValue(0)
            setReview('')
            addReviewFun(ratingValue,review)
        }

    }

    return (
        <>
            <SoftTypography variant="body1" color="text" fontWeight="medium" mt={2}>
                Add Your Review
            </SoftTypography>

                <Rating name="half-rating" value={ratingValue} precision={0.5}
                onChange={(event, newValue) => {
                        if (newValue !== 0) {
                            setError('')
                        }
                        setRatingValue(newValue);
                    }}
            />


            <SoftBox mb={1}>
                <TextField
                    multiline
                    rows={3}
                    onChange={handleReviewchange}
                    value={review}
                />
            </SoftBox>
            {error &&
                <SoftBox mb={1}>
                <SoftTypography variant="caption" color="error">
                    {error}
                </SoftTypography></SoftBox>
            }
            <SoftButton m={1} color="info" onClick={submitReview}>Add Review</SoftButton>
        </>
    )
}
AddReview.propTypes = {
    addReviewFun: Prototypes.func.isRequired
}
export default AddReview