import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik';
import * as Yup from "yup";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import languageService from 'services/languageService';
import { Grid } from '@mui/material';

const AddUpdateLanguage = ({ status, onClose, language, handleClose }) => {
    const Validation = Yup.object().shape({
        name: Yup.string().required("Language Name is Required"),
        country: Yup.string().required("Country Name is Required"),
    });
    const [error, setError] = useState('');
    const addLanguage = (data) => {
        languageService
            .addLanguage(data)
            .then((response) => {
                console.log(response.status);
                if (response.status === 200) {
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

    const updateLanguage = (data) => {
        languageService
            .updateLanguage(data)
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
                        ? { name: "", country: "" }
                        : { name: language.name, country: language.country }
                }
                validationSchema={Validation}
                onSubmit={async (values, { setSubmitting }) => {
                    let languageData;
                    if (status === "add") {
                        languageData = values;
                        addLanguage(languageData)
                    } else {
                        languageData = {
                            id: language._id,
                            ...values
                        }
                        updateLanguage(languageData)
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
                            {status === "add" ? 'Add Language' : 'Update Language'}
                        </SoftTypography>
                        {error &&
                            <SoftTypography variant="caption" color="error">
                                {error}
                            </SoftTypography>}

                        <Grid container>
                            <Grid item lg={6} xs={12} sm={12} md={6} xl={6} px={2} py={1}>
                                <SoftBox >
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Language Name
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput
                                        type="text"
                                        placeholder="Language Name"
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
                            </Grid>
                            <Grid item lg={6} xs={12} sm={12} md={6} xl={6} px={2} py={1}>
                                <SoftBox >
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Country Name
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput
                                        type="text"
                                        placeholder="Country Name"
                                        name="country"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.country}
                                    />
                                    {errors.country && touched.country ? (
                                        <SoftTypography variant="caption" color="error">
                                            {errors.country}
                                        </SoftTypography>
                                    ) : null}
                                </SoftBox>
                            </Grid>
                        </Grid>





                        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={1}>
                            <SoftButton variant="gradient" color="info" type="submit">
                                {status === "add" ? 'Add Language' : 'Update Language'}
                            </SoftButton>
                            <SoftButton variant="gradient" color="secondary" onClick={handleClose} >
                                Cancel
                            </SoftButton>
                        </SoftBox>
                    </SoftBox>
                )}
            </Formik>
        </SoftBox>
    );
}

AddUpdateLanguage.propTypes = {
    status: PropTypes.oneOf([
        "add",
        "update"
    ]).isRequired,
    language: PropTypes.object,
    onClose: PropTypes.func,
    handleClose: PropTypes.func
}

export default AddUpdateLanguage