import { Box, Button, Card, CardContent, Grid, Icon, Modal, Typography } from '@mui/material'
import SoftBox from 'components/SoftBox'
import SoftTypography from 'components/SoftTypography'
import React, { useEffect, useState } from 'react'
import wavesWhite from "assets/images/shapes/waves-white.svg";
import rocketWhite from "assets/images/illustrations/rocket-white.png";
import PropTypes from "prop-types"
import defaultCategory from "assets/images/default-images/defaultCategory.jpg"
import SoftBadge from 'components/SoftBadge';
import BookModal from './BookModal';


const Book = ({ book }) => {

    const [open, setOpen] = useState();
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const bookDescription = book.description.length > 90 ? `${book.description.substring(0, 90)}...` : book.description;
    var imageSrc = book.image ? process.env.REACT_APP_SERVER_API + book.imagePath + "/" + book.image : defaultCategory;
    
    return (
        <>
            <Grid item xs={12} sm={6} xl={4} >
                <Card >
                    <SoftBox p={2}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={6} >
                                <SoftBox
                                    height="100%"
                                    display="flex"
                                    justifyContent="center"
                                    // alignItems="center"
                                    // bgColor="info"
                                    borderRadius="lg"
                                    variant="gradient"

                                >
                                    <SoftBox component="img" src={imageSrc} alt="rocket" width="90%" />
                                </SoftBox>

                            </Grid >
                            <Grid item xs={12} lg={6} sx={{ position: "relative" }}>
                                <SoftBox display="flex" flexDirection="column" height="100%">
                                    <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
                                        {book.title}
                                    </SoftTypography>
                                    <SoftBox pt={1} mb={0.5}>
                                        <SoftTypography variant="body2" color="text" fontWeight="medium">
                                            {book.author}
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftBox mb={2} display="flex" flexDirection="row">
                                        {/* <SoftBadge variant="gradient" badgeContent={book.categoryName} color="success" size="xs" container /> */}
                                        <SoftTypography variant="h6" color="info"
                                        // ml={3}
                                        >
                                            Rs.{book.price}
                                        </SoftTypography>

                                    </SoftBox>
                                    <SoftBox mb={2}>
                                        <SoftTypography variant="body2" color="text" sx={{ height: '30px' }}>
                                            {/* {bookDescription} */}
                                        </SoftTypography>
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
                                        onClick={handleOpen}
                                    >
                                        Read More
                                        <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                                    </SoftTypography>
                                </SoftBox>
                            </Grid>
                        </Grid>
                    </SoftBox>
                </Card>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <BookModal book={book} handleClose={handleClose}/>
            </Modal>
        </>
    )
}
Book.propTypes = {
    book: PropTypes.isRequired,
};
export default Book