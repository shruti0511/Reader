import {  Card, Grid, Icon, Modal } from '@mui/material'
import SoftBox from 'components/SoftBox'
import SoftTypography from 'components/SoftTypography'
import React, {  useState } from 'react'
import PropTypes from "prop-types"
import defaultCategory from "assets/images/default-images/defaultCategory.jpg"
import Ratings from '../../component/Ratings';
import { useNavigate } from 'react-router-dom'
import ReadOrBuyButton from '../../component/ReadOrBuyButton'


const Book = ({ book }) => {
    const navigate = useNavigate();

    const bookDetails = (book) => {
        navigate(`/bookDetail/${book._id}`)
    }

    var imageSrc = book.image ? process.env.REACT_APP_SERVER_API + book.imagePath + "/" + book.image : defaultCategory;
    //const avgRating = book.rating.reduce((a, { rating }) => a + rating, 0) / book.rating.length;
    const Released_date = new Date(book.publication_date)
    return (
        <>
            <Grid item xs={12} sm={6} xl={4} lg={4} >
                <Card >
                    <SoftBox p={2}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={6} xl={5}>
                                <SoftBox
                                    height="100%"
                                    display="flex"
                                    justifyContent="center"
                                    // alignItems="center"
                                    // bgColor="info"
                                    borderRadius="lg"
                                    variant="gradient"

                                    ml={2}

                                >
                                    <SoftBox component="img" src={imageSrc} alt="rocket" width="140px" m={1} sx={{maxHeight:'200px', minHeight:'200px'}}/>
                                </SoftBox>

                            </Grid >
                            <Grid item xs={12} lg={6} xl={7} sx={{ position: "relative" }}>
                                <SoftBox display="flex" flexDirection="column" height="100%">
                                    <SoftTypography variant="h4" fontWeight="bold" >
                                        {book.title}
                                    </SoftTypography>
                                    <SoftBox pt={1} mb={1}>
                                        <SoftTypography variant="body2" color="text" fontWeight="medium">
                                            {book.author}
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftBox display="flex" flexDirection="row" >
                                        <SoftTypography variant="caption" color="text" fontWeight="medium">
                                            Released {Released_date.toDateString()}
                                        </SoftTypography>
                                    </SoftBox>

                                    <SoftBox mb={1}>
                                        <Ratings ratings={book.avgRating} showNumber={false} smallSize={true} />
                                    </SoftBox>

                                    <SoftBox mb={2}>

                                        <ReadOrBuyButton price={book.price} bookFile={book.bookFile} bookFilePath={book.bookFilePath} bookId={book._id}/>
                                    </SoftBox>


                                    <SoftTypography
                                        variant="button"
                                        color="text"
                                        fontWeight="medium"
                                        sx={{
                                            mt: "auto",
                                            mr: "auto",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            cursor: "pointer",

                                            "& .material-icons-round": {
                                                fontSize: "1.125rem",
                                                transform: `translate(2px, -0.5px)`,
                                                transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                                            },

                                            "&:hover .material-icons-round, &:focus  .material-icons-round": {
                                                transform: `translate(6px, -0.5px)`,
                                            },
                                        }}
                                        onClick={()=>{bookDetails(book)}}
                                    >
                                        More
                                        <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                                    </SoftTypography>
                                </SoftBox>
                            </Grid>
                        </Grid>
                    </SoftBox>
                </Card>
            </Grid>

        </>
    )
}
Book.propTypes = {
    book: PropTypes.isRequired,
};
export default Book