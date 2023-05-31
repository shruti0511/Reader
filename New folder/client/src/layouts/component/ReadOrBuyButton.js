import React from 'react'
import PropTypes from 'prop-types'
import SoftButton from 'components/SoftButton'
import { useNavigate } from 'react-router-dom'
import libraryService from 'services/libraryService'

const ReadOrBuyButton = ({ price, bookFilePath, bookFile,bookId }) => {
    const navigate = useNavigate()

    const readBook = () => {
        libraryService.
            addToLibrary({book:bookId})
        .then((response) => {
            if (response.status === 200) {
                navigate("/library")
            }
        })
        .catch((error) => {
            // error is handled in catch block
            if (error.response) {
                // status code out of the range of 2xx
                console.log("Data :", error.response.data);
                console.log("Status :" + error.response.status);
                //}
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Error on setting up the request
                console.log("Error", error.message);
            }
        });
    }
    return (
        <>
            {price === 0
                ? <SoftButton color="info" variant="outlined" sx={{ textTransform: 'none' }} onClick={readBook}>Start For Free</SoftButton>
                : <SoftButton color="info" variant="outlined" sx={{ textTransform: 'none' }} >Buy Rs {price}</SoftButton>}
        </>
    )
}
ReadOrBuyButton.propTypes = {
    price: PropTypes.isRequired,
    bookFile:PropTypes.isRequired,
    bookFilePath: PropTypes.isRequired,
    bookId:PropTypes.isRequired,
};
export default ReadOrBuyButton