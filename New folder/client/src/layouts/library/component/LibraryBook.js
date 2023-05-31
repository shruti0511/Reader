import { Grid } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import SoftBox from 'components/SoftBox'
import defaultCategory from "assets/images/default-images/defaultCategory.jpg"
import SoftTypography from 'components/SoftTypography'
import { useNavigate } from 'react-router-dom'

const LibraryBook = ({ book }) => {
    const navigate = useNavigate()
    var imageSrc = book.image ? process.env.REACT_APP_SERVER_API + book.imagePath + "/" + book.image : defaultCategory;
    const readBook = () => {
        navigate(`/reader/${book.bookFile}`, { state: { path: book.bookFilePath } })
    }
    return (
        <>
            <Grid item xl={1.5} md={3} xs={12} sm={6}>
                <SoftBox
                    justifyContent="center"
                    borderRadius="lg"
                    m={1}
                    onClick={readBook}
                >
                    <SoftBox component="img" src={imageSrc} alt="rocket" width="140px" sx={{ maxHeight: '200px', minHeight: '200px' }} />
                    <SoftTypography variant="h5"  >
                        {book.title}
                    </SoftTypography>
                    <SoftTypography variant="body2"  >
                        {book.author}
                    </SoftTypography>
                </SoftBox>

            </Grid>
        </>
    )
}
LibraryBook.propTypes = {
    book: PropTypes.isRequired,
};

export default LibraryBook