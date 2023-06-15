import { Rating, TextField } from '@mui/material'
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import Prototypes from 'prop-types'
import React, { useState } from 'react'

const AddReview = ({ addReviewFun }) => {
    const [ratingValue, setRatingValue] = useState(null);
    const [review, setReview] = useState('');

    const handleReviewchange = (e) => {
        setReview(e.target.value);
    }

    const submitReview = () => {
            setRatingValue(null)
            setReview('')
            addReviewFun(ratingValue, review)

    }

    return (
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
                <SoftButton m={1} color="info" onClick={submitReview}>Add Review</SoftButton>
                </>
            }

        </>
    )
}
AddReview.propTypes = {
    addReviewFun: Prototypes.func.isRequired
}
export default AddReview