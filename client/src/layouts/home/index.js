import {  Grid } from '@mui/material'
import SoftBox from 'components/SoftBox'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import bookService from 'services/bookService'
import Book from './component/Book'
import FilterBox from './component/FilterBox'

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
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
                    setAllBooks(response.data);
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

    const filterBooks = (authors, categories, languages) => {
        let filteredBooks =allBooks
        console.log(filteredBooks, "asd");
        console.log(authors);
        if (authors.length > 0) {
            console.log('saa1');
            filteredBooks = filteredBooks.filter(i => authors.includes(i.author._id ))
            console.log(filteredBooks);
        }
        if (categories.length > 0) {
            console.log('saa2');
            filteredBooks = filteredBooks.filter(i =>  categories.includes(i.category._id))
        }
        if (languages.length > 0) {
            console.log('saa3');
            filteredBooks = filteredBooks.filter(i => languages.includes( i.language._id ))
        }
        console.log(filteredBooks,"filter");
        setBooks(filteredBooks)

    }
    const resetBooks = () => {
        console.log('yeah');
        getBooks()
    }
    return (
        <DashboardLayout>
            <DashboardNavbar navTitle="Home"/>
            <SoftBox py={3}>
                <FilterBox filterBooks={filterBooks} resetBooks={resetBooks} />
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