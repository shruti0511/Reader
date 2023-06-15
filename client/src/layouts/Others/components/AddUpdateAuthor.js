import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik';
import * as Yup from "yup";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import authorService from 'services/authorService';

const AddUpdateAuthor = ({ status, onClose, author,handleClose }) => {
    const Validation = Yup.object().shape({
        name: Yup.string().required("Author Name is Required"),
        description: Yup.string().required("Author description is Required"),
    });
    const [error, setError] = useState('');
    const addAuthor = (data) => {
        authorService
            .addAuthor(data)
            .then((response) => {
                console.log(response.status);
                // setSuccessMsg(response.data.message)
                // setErrorMsg();
                // setEmailConfirmed(true)
                if (response.status === 200) {
                    //setCategories(response.data);
                    onClose(response?.data?.message)
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

    const updateAuthor = (data) => {
        authorService
            .updateAuthor(data)
            .then((response) => {
                console.log(response.status);
                // setSuccessMsg(response.data.message)
                // setErrorMsg();
                // setEmailConfirmed(true)
                if (response.status === 200) {
                    //setCategories(response.data);
                    onClose(response?.data?.message)
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
    return (
        <SoftBox m={3}>
            <Formik
                initialValues={
                    status === "add"
                        ? { name: "", description: "" }
                        : { name: author.name, description: author.description }
                }
                validationSchema={Validation}
                onSubmit={async (values, { setSubmitting }) => {
                    let authorData;
                    if (status === "add") {
                        authorData = values;
                        addAuthor(authorData)
                    } else {
                        authorData = {
                            id: author._id,
                            ...values
                        }
                        updateAuthor(authorData)
                    }

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
                    <SoftBox component="form" role="form" onSubmit={handleSubmit}>
                        <SoftTypography variant="h4">
                            {status === "add" ? 'Add Author' : 'Update Author'}
                        </SoftTypography>
                        {error &&
                            <SoftTypography variant="caption" color="error">
                                {error}
                            </SoftTypography>}

                        <SoftBox >
                            <SoftBox mb={1} ml={0.5}>
                                <SoftTypography component="label" variant="caption" fontWeight="bold">
                                    Author Name
                                </SoftTypography>
                            </SoftBox>
                            <SoftInput
                                type="text"
                                placeholder="Author Name"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            {errors.name && touched.name ? (
                                <SoftTypography variant="caption" color="error">
                                    {errors.name}
                                </SoftTypography>
                            ) : null}
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftBox mb={1} ml={0.5}>
                                <SoftTypography component="label" variant="caption" fontWeight="bold">
                                    Author Description
                                </SoftTypography>
                            </SoftBox>
                            <SoftInput
                                placeholder="Author description"
                                multiline
                                rows={3}
                                fullWidth
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

                        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={1}>
                            <SoftButton variant="gradient" color="info"  type="submit">
                                {status === "add" ? 'Add Author' : 'Update Author'}
                            </SoftButton>
                            <SoftButton variant="gradient" color="secondary"  onClick={handleClose} >
                                Cancel
                            </SoftButton>
                        </SoftBox>
                    </SoftBox>
                )}
            </Formik>
        </SoftBox>
    );
}

AddUpdateAuthor.propTypes = {
    status: PropTypes.oneOf([
        "add",
        "update"
    ]).isRequired,
    author: PropTypes.object,
    onClose: PropTypes.func,
    handleClose:PropTypes.func
}

export default AddUpdateAuthor