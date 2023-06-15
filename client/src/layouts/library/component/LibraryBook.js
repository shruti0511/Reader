import { Grid, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SoftBox from 'components/SoftBox'
import defaultBookImage from "assets/images/default-images/defaultBookImage.jpg"
import SoftTypography from 'components/SoftTypography'
import { useNavigate } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
const ITEM_HEIGHT = 48;
const LibraryBook = ({ book, removeBookFromLibrary }) => {
    const navigate = useNavigate()
    var imageSrc = book.image ? process.env.REACT_APP_SERVER_API + book.imagePath + "/" + book.image : defaultBookImage;
    const readBook = () => {
        navigate(`/reader/${book.bookFile}`, { state: { path: book.bookFilePath } })
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        // removeBookFromLibrary()
        setAnchorEl(null);
    };
    const removeBook = () => {
        removeBookFromLibrary()
    }
    return (
        <>
            <Grid item xl={1.5} md={3} xs={12} sm={6}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                    <SoftBox display="flex" flexDirection="row" height="100%">

                        <SoftBox
                            justifyContent="center"
                            borderRadius="lg"
                            mx={1}
                            onClick={readBook}
                            width="150px"
                        >
                            <SoftBox component="img" src={imageSrc} alt="rocket" width="140px" sx={{ maxHeight: '200px', minHeight: '200px' }} />
                            {/* <SoftTypography variant="h5"  >
                            {book.title}
                        </SoftTypography>
                        <SoftTypography variant="body2"  >
                            {book.author.name}
                        </SoftTypography> */}


                        </SoftBox>
                        <SoftBox
                            // display="flex"
                            // alignItem="flex-start"
                            // justifyContent="flex-end"
                            sx={{ top: 0 }}
                        >
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            // PaperProps={{
                            //     style: {
                            //         maxHeight: ITEM_HEIGHT * 4.5,
                            //         width: '20ch',
                            //     },
                            // }}
                            >
                                {/* {options.map((option) => ( */}
                                <MenuItem key={1} onClick={removeBook}>
                                    Remove From Library
                                </MenuItem>
                                {/* ))} */}
                            </Menu>
                        </SoftBox>


                    </SoftBox>
                    <SoftBox
                        justifyContent="center"
                        mx={1}
                    >
                        <SoftTypography variant="h5"  >
                            {book.title}
                        </SoftTypography>
                        <SoftTypography variant="body2"  >
                            {book.author.name}
                        </SoftTypography>


                    </SoftBox>
                </SoftBox>


            </Grid>
        </>
    )
}
LibraryBook.propTypes = {
    book: PropTypes.isRequired,
    removeBookFromLibrary: PropTypes.func.isRequired
};

export default LibraryBook