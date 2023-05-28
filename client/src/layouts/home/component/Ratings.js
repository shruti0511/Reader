import React from 'react'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material';

const Ratings = ({ ratings }) => {



    return (
        <>
            <Grid container>
                <Grid item mt={0.5}>
                    <Typography >
                        {[...Array(Math.round(ratings))].map((x, i) =>
                            <StarOutlinedIcon key={i} style={{ color: "#ffa534" }} />
                        )}
                        {[...Array(5 - Math.round(ratings))].map((x, i) =>
                            <StarBorderOutlinedIcon key={i} style={{ color: "#ffa534" }} />
                        )}
                    </Typography>
                </Grid>
                <Grid item>
                    |
                </Grid>
                <Grid item>
                    <Typography mt={0.5} ml={0.5} sx={{fontSize:'17px'}}>{ratings.toFixed(2)}</Typography>
                </Grid>
            </Grid>

        </>
    )
}
Ratings.propTypes = {
    ratings: PropTypes.isRequired
}
export default Ratings