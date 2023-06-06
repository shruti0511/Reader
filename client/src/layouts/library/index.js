import { Grid, Stack } from '@mui/material'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import libraryService from 'services/libraryService'
import LibraryBook from './component/LibraryBook'
import SoftBox from 'components/SoftBox'

const MyLibrary = () => {
    const [myBooks, setMyBooks] = useState([]);

    useEffect(() => {
        getLibraryData()
    }, [])


    const getLibraryData = () => {
        libraryService.getUserLibrary()
            .then((response) => {
                if (response.status === 200) {
                    setMyBooks(response.data)
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

    const removeBookFromLibrary = (id) => {

        libraryService.removeFromLibrary({ id: id })
            .then((response) => {
                if (response.status === 200) {
                    getLibraryData()
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
        <DashboardLayout>
            <DashboardNavbar />

            {
                myBooks.length !== 0 ?
                    <Grid container>
                        {myBooks.map((book, index) => {
                            return <LibraryBook book={book?.book} removeBookFromLibrary={() => { removeBookFromLibrary(book._id) }} key={index} />
                        })}
                    </Grid>
                    :
                    <Stack spacing={2}>
                        No Book in Library
                    </Stack>
            }

        </DashboardLayout>
    )
}

export default MyLibrary