import { ListItem, ListItemText, Typography } from '@mui/material'
import SoftBox from 'components/SoftBox'
import React from 'react'
import Ratings from './Ratings'
import PropTypes from 'prop-types'

const ReviewBox = ({review}) => {
    return (
        <ListItem alignItems="flex-start" sx={{ marginBottom: '20px' }}>
            <ListItemText
                primary={review.user?.name}
                secondary={
                    <SoftBox display="flex" flexDirection="column">
                        {/* <Typography
                                    component="span"
                                    variant="body2"
                                    color="text.primary">
                                    {review.user?.name}
                                </Typography> */}
                        <Typography
                            variant="body2"
                            color="text.secondary" >
                            {review.review}
                        </Typography>
                        <Ratings ratings={review.rating} showNumber={false} smallSize={false} />
                    </SoftBox>
                }
            />
        </ListItem>
    )
}
ReviewBox.propTypes = {
    review: PropTypes.isRequired,
};
export default ReviewBox