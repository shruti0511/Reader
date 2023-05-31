import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Rating, Typography } from '@mui/material';

const Ratings = ({ ratings, showNumber,smallSize }) => {
    return (
        <>
            <Grid container>
                <Grid item mt={0.5}>
                    <Typography >
                        <Rating name="half-rating-read" value={ratings.toFixed(2)} precision={0.5} readOnly size={ smallSize ? "small": "medium"} />
                    </Typography>
                </Grid>
                {showNumber &&

                <Grid item>
                    |
                </Grid>
                }
                {showNumber &&
                <Grid item>
                    <Typography mt={0.5} ml={0.5} sx={{fontSize:'17px'}}>{ratings.toFixed(2)}</Typography>
                </Grid>
                }
            </Grid>

        </>
    )
}
Ratings.propTypes = {
    ratings: PropTypes.isRequired,
    showNumber: PropTypes.bool.isRequired,
    smallSize:PropTypes.bool.isRequired
}
export default Ratings