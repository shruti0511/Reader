import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import categoryService from "services/categoryService";
import PropTypes from "prop-types";


const AddUpdateCategory = ({ close, status,category }) => {
    const Validation = Yup.object().shape({
        name: Yup.string().required("Category Name is Required"),
    });
    const [error, setError] = useState('');
    const addCategory = (data) => {
        categoryService
            .addCategory(data)
            .then((response) => {
                console.log(response.status);
                // setSuccessMsg(response.data.message)
                // setErrorMsg();
                // setEmailConfirmed(true)
                if (response.status === 200) {
                    //setCategories(response.data);
                    close()
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

    const updateCategory = (data) => {
        categoryService
            .updateCategory(data)
            .then((response) => {
                console.log(response.status);
                // setSuccessMsg(response.data.message)
                // setErrorMsg();
                // setEmailConfirmed(true)
                if (response.status === 200) {
                    //setCategories(response.data);
                    close()
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
        <Formik
            initialValues={status === "add"?{ name: "", image: "" }:{ name: category.name, image: "" }}
            validationSchema={Validation}
            onSubmit={async (values, { setSubmitting }) => {
                let categoryData
                if (status === "add") {
                    categoryData = values
                }
                else{
                    categoryData = {
                        id:category._id,
                        ...values    
                    }
                }
                
                const data = new FormData();
                for (var key in categoryData) {
                    data.append(key, categoryData[key]);
                }
                { status === "add" ? addCategory(data) :updateCategory(data)}
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
                        {status === "add" ? 'Add Category' : 'Update Category'}
                    </SoftTypography>
                    {error &&
                        <SoftTypography variant="caption" color="error">
                            {error}
                        </SoftTypography>}
                    <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                            <SoftTypography component="label" variant="caption" fontWeight="bold">
                                Category Name
                            </SoftTypography>
                        </SoftBox>
                        <SoftInput
                            type="text"
                            placeholder="Category Name"
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
                                Image
                            </SoftTypography>
                        </SoftBox>
                        <SoftInput
                            type="file"
                            name="file"
                            onChange={(event) => {
                                setFieldValue("file", event.currentTarget.files[0]);
                            }}
                        />
                    </SoftBox>
                    <SoftBox mt={4} mb={1}>
                        <SoftButton variant="gradient" color="info" fullWidth type="submit">
                            {status === "add" ? 'Add Category' : 'Update Category'}
                        </SoftButton>
                    </SoftBox>
                </SoftBox>
            )}
        </Formik>
    );
};
AddUpdateCategory.propTypes = {
    close: PropTypes.oneOfType([PropTypes.func]).isRequired,
    status: PropTypes.oneOf([
        "add",
        "update"
    ]).isRequired,
    category:PropTypes.object
};
export default AddUpdateCategory;
