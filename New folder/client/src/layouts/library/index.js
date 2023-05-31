import { Grid } from '@mui/material'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import libraryService from 'services/libraryService'
import LibraryBook from './component/LibraryBook'

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
    return (
        <DashboardLayout>
            <DashboardNavbar />
                <Grid container>
                    {
                        myBooks && myBooks.map((book,index) => {
                            return <LibraryBook book={book?.book} key={index}/>
                        })
                    }
                </Grid>
        </DashboardLayout>
    )
}

export default MyLibrary