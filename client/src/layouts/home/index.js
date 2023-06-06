import {  Grid } from '@mui/material'
import SoftBox from 'components/SoftBox'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import bookService from 'services/bookService'
import Book from './component/Book'

const HomePage = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        getBooks()

    }, [])

    const getBooks = () => {
        bookService
            .getAllBooks()
            .then((response) => {
                if (response.status === 200) {
                    const books = response.data
                    setBooks(response.data);
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
            <SoftBox py={3}>
                <Grid container spacing={3}>
                    {books && books.map((book, index) => {
                        return <Book key={index} book={book} />
                    })}
                </Grid>

            </SoftBox>
        </DashboardLayout>
    )
}

export default HomePage