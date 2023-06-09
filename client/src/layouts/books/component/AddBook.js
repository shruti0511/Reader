import React, { useEffect, useState } from "react";
import {  Formik } from "formik";
import * as Yup from "yup";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";
import { Checkbox, FormControl, Grid, MenuItem, Select } from "@mui/material";
import bookService from "services/bookService";
import useCategories from "hooks/useCategory";
import useAuthors from "hooks/useAuthors";
import useLanguages from "hooks/useLanguage";
const SUPPORTED_FORMATS = [
    "image/jpeg", "image/jpg", "image/png"
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    //   width: 250,
    },
  },
};



const AddBook = ({ status, closeModal, book }) => {
    const [isFree, setIsFree] = useState(false);

    const handleIsFree = () => setIsFree(!isFree);
    const addValidation = Yup.object().shape({
        title: Yup.string().required("Book Title is required"),
        author: Yup.string().required("Book Author is required"),
        description: Yup.string().required("Book Description is required"),
        category: Yup.string().required("Category is required"),
        language: Yup.string().required("Language is required"),
        image: Yup.mixed()
            .test(
                "fileFormat",
                "Unsupported Format",
                value => !value || (value => value && SUPPORTED_FORMATS.includes(value.type))
            ),
        price: Yup.string()
            .when("isFree", (isFree, schema) =>
                !isFree ? Yup.string().required() : schema
            ),
        image: Yup.mixed().test("fileType", "Incorrect image type", (file) => {
            if (file) {
                return (
                    file &&
                    ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
                );
            } else {
                return true;
            }
        }
        ),
        epub: Yup.mixed().required("Epub file is required").test(
            "fileType",
            "Incorrect Epub type",
            (file) =>
                file && ["application/epub+zip"].includes(file.type)
        ),
    });

    const updateValidation = Yup.object().shape({
        title: Yup.string().required("Book Title is required"),
        author: Yup.string().required("Book Author is required"),
        description: Yup.string().required("Book Description is required"),
        category: Yup.string().required("Category is required"),
        language: Yup.string().required("Language is required"),
        price: Yup.string()
            .when("isFree", (isFree, schema) =>
                !isFree ? Yup.string().required() : schema
            ),
        image: Yup.mixed().test("fileType", "Incorrect image type", (file) => {
            if (file) {
                return (
                    file &&
                    ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
                );
            } else {
                return true;
            }
        }
        ),
        epub: Yup.mixed().test("fileType", "Incorrect epub file type", (file) => {
            if (file) {
                return (
                    file &&
                    ["application/epub+zip"].includes(file.type)
                );
            } else {
                return true;
            }
        }
        ),

    });
    const [error, setError] = useState("");
    const [categorySelect, setCategorySelect] = useState(0);
    const [authorSelect, setAuthorSelect] = useState(0)
    const [languageSelect, setLanguageSelect] = useState(0)

    const {
        status: categoryStatus,
        data: categoryData
    } = useCategories()

    const {
        status: languageStatus,
        data: languageData
    } = useLanguages()

    const {
        status: authorStatus,
        data: authorData
    } = useAuthors()

    useEffect(() => {
        // getCategories()


        if (Object.keys(book).length !== 0) {
            setIsFree(book.isFree)
            setCategorySelect(book.category._id)
            setAuthorSelect(book.author._id)
            setLanguageSelect(book.language._id)
        }


    }, [categoryStatus, categoryData, languageStatus, languageData, authorStatus, authorData])

    const addBookFun = (data) => {
        bookService
            .addBook(data)
            .then((response) => {
                console.log(response.status);
                // setSuccessMsg(response.data.message)
                // setErrorMsg();
                // setEmailConfirmed(true)
                if (response.status === 200) {
                    //setCategories(response.data);
                    closeModal(response.data?.message)
                }
            })
            .catch((error) => {
                // error is handled in catch block
                if (error.response) {
                    // status code out of the range of 2xx
                    console.log("Data :", error.response.data);
                    console.log("Status :" + error.response.status);
                    //  if (error.response.status === 403) {
                    // setLinkExpired(true)
                    setError(error.response?.data?.message);
                    // setSuccessMsg();
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

    const updateBookFun = (data) => {
        bookService
            .updateBook(data)
            .then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    closeModal(response.data?.message)
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log("Data :", error.response.data);
                    console.log("Status :" + error.response.status);
                    setError(error.response?.data?.message);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
            });
    }
    return (
        <Formik
            initialValues={status === "add"
                ? {
                    title: "",
                    author: "",
                    description: "",
                    category: "",
                    language: "",
                    isFree: isFree,
                    price: "",
                    publication_date: "",
                    image: "",
                    epub: "",
                } :
                {
                    title: book.title,
                    author: book.author._id,
                    description: book.description,
                    category: book.category._id,
                    language: book.language._id,
                    isFree: book.isFree,
                    price: book.price,
                    publication_date: book.publication_date,
                    image: "",
                    epub: "",
                }
            }
            validationSchema={status === "add" ? addValidation : updateValidation}
            onSubmit={(values, { setSubmitting }) => {
                console.log(values);

                let bookData;
                if (status === "add") {
                    bookData = values;
                } else {
                    bookData = {
                        id: book._id,
                        ...values
                    }
                }
                const data = new FormData();
                for (var key in bookData) {
                    data.append(key, bookData[key]);
                }
                { status === "add" ? addBookFun(data) : updateBookFun(data) }
                console.log(values);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                isSubmitting,
            }) => (
                <>
                    <SoftBox component="form" role="form" onSubmit={handleSubmit}>
                        <SoftTypography variant="h4" sx={{ mb: 5 }}>
                            {status === "add" ? 'Add Book' : 'Update Book'}
                        </SoftTypography>
                        {error && (
                            <SoftTypography variant="caption" color="error">
                                {error}
                            </SoftTypography>
                        )}

                        {/* {status !== "add" &&
                        <CardMedia
                        src={default}
                        component="img"
                        title={'title'}
                        sx={{
                            //width: "100%",
                            height: '150px',
                            margin: 0,
                            //boxShadow: ({ boxShadows: { md } }) => md,
                            objectFit: "contain",
                            objectPosition: "left",
                        }}
                    />
                       } */}
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={6} xl={6}>
                                <SoftBox>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Book Title
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput
                                        type="text"
                                        placeholder="Book Title"
                                        name="title"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title}
                                    />
                                    {errors.title && touched.title ? (
                                        <SoftTypography variant="caption" color="error">
                                            {errors.title}
                                        </SoftTypography>
                                    ) : null}
                                </SoftBox>
                            </Grid>
                            {/* <Grid item xs={12} md={6} xl={6}>
                                <SoftBox>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Book Author
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput
                                        type="text"
                                        placeholder="Book Author"
                                        name="author"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.author}
                                    />
                                    {errors.author && touched.author ? (
                                        <SoftTypography variant="caption" color="error">
                                            {errors.author}
                                        </SoftTypography>
                                    ) : null}
                                </SoftBox>
                            </Grid> */}
                            <Grid item xs={12} md={6} xl={6}>
                                <SoftBox>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Book Author
                                        </SoftTypography>
                                    </SoftBox>

                                    <FormControl fullWidth>
                                        <Select
                                            value={authorSelect}
                                            onChange={(event) => {
                                                setAuthorSelect(event.target.value);
                                                setFieldValue("author", event.target.value);
                                            }}
                                            autoWidth
                                            label="Author"
                                            name="author"
                                            MenuProps={MenuProps}
                                        >
                                            <MenuItem
                                                key={0}
                                                value={0}
                                            >
                                                Select Author
                                            </MenuItem>
                                            {authorData.map((author, index) => (
                                                <MenuItem
                                                    key={index + 1}
                                                    value={author._id}
                                                >
                                                    {author.name}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                    </FormControl>
                                    {errors.author && touched.author ? (
                                        <SoftTypography variant="caption" color="error">
                                            {errors.author}
                                        </SoftTypography>
                                    ) : null}
                                </SoftBox>
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <SoftBox>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Book Description
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput
                                        type="text"
                                        placeholder="Book Description"
                                        name="description"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                    />
                                    {errors.description && touched.description ? (
                                        <SoftTypography variant="caption" color="error">
                                            {errors.description}
                                        </SoftTypography>
                                    ) : null}
                                </SoftBox>
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <SoftBox>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Book Category
                                        </SoftTypography>
                                    </SoftBox>

                                    <FormControl fullWidth>
                                        <Select
                                            value={categorySelect}
                                            onChange={(event) => {
                                                setCategorySelect(event.target.value);
                                                setFieldValue("category", event.target.value);
                                            }}
                                            autoWidth
                                            label="Category"
                                            name="category"
                                            MenuProps={MenuProps}

                                        >
                                            <MenuItem
                                                key={0}
                                                value={0}
                                            >
                                                Select Category
                                            </MenuItem>
                                            {categoryData.map((category, index) => (
                                                <MenuItem
                                                    key={index + 1}
                                                    value={category._id}
                                                >
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                    </FormControl>
                                    {errors.category && touched.category ? (
                                        <SoftTypography variant="caption" color="error">
                                            {errors.category}
                                        </SoftTypography>
                                    ) : null}
                                </SoftBox>
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <SoftBox>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Book Language
                                        </SoftTypography>
                                    </SoftBox>

                                    <FormControl fullWidth>
                                        <Select
                                            value={languageSelect}
                                            onChange={(event) => {
                                                setLanguageSelect(event.target.value);
                                                setFieldValue("language", event.target.value);
                                            }}
                                            autoWidth
                                            label="Language"
                                            name="language"
                                            MenuProps={MenuProps}

                                        >
                                            <MenuItem
                                                key={0}
                                                value={0}
                                            >
                                                Select Language
                                            </MenuItem>
                                            {languageData.map((language, index) => (
                                                <MenuItem
                                                    key={index + 1}
                                                    value={language._id}
                                                >
                                                    {language.name}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                    </FormControl>
                                    {errors.language && touched.language ? (
                                        <SoftTypography variant="caption" color="error">
                                            {errors.language}
                                        </SoftTypography>
                                    ) : null}
                                </SoftBox>
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <SoftBox>
                                    {/* <SoftInput
                                    type="text"
                                    placeholder="Is Free"
                                    name="isFree"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.isFree}
                                />
                                {errors.isFree && touched.isFree ? (
                                    <SoftTypography variant="caption" color="error">
                                        {errors.isFree}
                                    </SoftTypography>
                                ) : null} */}

                                    <Grid container>
                                        <Grid item xs={6} md={4} xl={4}>
                                            <SoftBox mb={1} ml={0.5}>
                                                <SoftTypography component="label" variant="caption" fontWeight="bold">
                                                    Is Free
                                                </SoftTypography>
                                            </SoftBox>

                                            <Checkbox checked={isFree} onChange={(event) => {
                                                handleIsFree();
                                                setFieldValue("isFree", !isFree);
                                            }} />
                                        </Grid>
                                        {!isFree &&

                                            <Grid item xs={6} md={8} xl={8}>

                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                                                        Price
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    type="number"
                                                    placeholder="Price"
                                                    name="price"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.price}
                                                />
                                                {errors.price && touched.price ? (
                                                    <SoftTypography variant="caption" color="error">
                                                        {errors.price}
                                                    </SoftTypography>
                                                ) : null}
                                            </Grid>

                                        }

                                    </Grid>
                                </SoftBox>
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <SoftBox>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Published Date
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput
                                        type="date"
                                        placeholder="Publication date"
                                        name="publication_date"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.publication_date}
                                    />
                                    {errors.publication_date && touched.publication_date ? (
                                        <SoftTypography variant="caption" color="error">
                                            {errors.publication_date}
                                        </SoftTypography>
                                    ) : null}
                                </SoftBox>
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <SoftBox>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Image
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput
                                        type="file"
                                        name="image"
                                        onChange={(event) => {
                                            setFieldValue("image", event.currentTarget.files[0]);
                                        }}
                                    />
                                </SoftBox>
                                {errors.image && touched.image ? (
                                    <SoftTypography variant="caption" color="error">
                                        {errors.image}
                                    </SoftTypography>
                                ) : null}
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <SoftBox>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Epub File
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput
                                        type="file"
                                        name="epub"
                                        onChange={(event) => {
                                            setFieldValue("epub", event.currentTarget.files[0]);
                                        }}
                                    />
                                </SoftBox>
                                {errors.epub && touched.epub ? (
                                    <SoftTypography variant="caption" color="error">
                                        {errors.epub}
                                    </SoftTypography>
                                ) : null}
                            </Grid>
                        </Grid>

                        <SoftBox mt={4} mb={1}>
                            <SoftButton variant="gradient" color="info" type="submit">
                                {status === "add" ? 'Add Book' : 'Update Book'}
                            </SoftButton>
                        </SoftBox>

                    </SoftBox>
                </>

            )}
        </Formik>
    );
};
AddBook.propTypes = {
    closeModal: PropTypes.oneOfType([PropTypes.func]).isRequired,
    status: PropTypes.oneOf(["add", "update"]).isRequired,
    book: PropTypes.object,
};
export default AddBook;
