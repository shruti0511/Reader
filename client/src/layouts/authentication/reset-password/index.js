/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
// react-router-dom components
import { Link, useNavigate, useParams } from "react-router-dom";

// @mui material components

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { useLoginMutation } from "redux/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "redux/authSlice";
import usePersist from "hooks/usePersist";
import { Grid, Switch } from "@mui/material";
import authService from "services/authService";
import EmailIcon from "@mui/icons-material/Email";

function ResetPassword() {
    const userRef = useRef();
    const [persist, setPersist] = usePersist();
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [error, setError] = useState();

    const params = useParams();
    useEffect(() => {
        userRef.current.focus();
    }, []);

    const Validation = Yup.object().shape({
        password: Yup.string()
            .required("Password is Required")
            .min(8, "Password is too short - should be 8 chars minimum."),
        confirmPassword: Yup.string()
            .required("Password is Required")
            .oneOf([Yup.ref("password")], "Your passwords do not match."),
    });

    const onsubmitForm = (values) => {
        setDisableButton(true);
        const { password, confirmPassword } = values;
        authService
            .resetPassword({ password, confirmPassword, token: params.token })
            .then((response) => {
                if (response.status === 200) {
                    setPasswordChanged(true);
                    setError();
                }
            })
            .catch((error) => {
                // error is handled in catch block
                if (error.response) {
                    // status code out of the range of 2xx
                    console.log("Data :", error.response.data);
                    console.log("Status :" + error.response.status);
                    setError(error.response.data.error);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Error on setting up the request
                    console.log("Error", error.message);
                }
            });
    };

    return (
        <CoverLayout
            title={"Reset Password"}
            description={"Enter new password to change password"}
            image={curved9}
        >
            {passwordChanged ? (
                <>
                    <SoftBox textAlign="center">
                        <SoftTypography variant="h3" color="secondary">
                            Password Changed Successfully
                        </SoftTypography>
                        <Link to={"/authentication/sign-in"}>
                            <SoftButton color="success" type="button">
                                LogIn
                            </SoftButton>
                        </Link>
                    </SoftBox>
                </>
            ) : (
                <>
                    {error ? (
                        <>
                            <SoftTypography variant="h4" color="error" mb={3}>
                                {error}
                            </SoftTypography>
                            <Link to={"/authentication/sign-in"}>
                                <SoftButton color="dark" type="button">
                                    Back to LogIn
                                </SoftButton>
                            </Link>
                        </>
                    ) : (
                        <Formik
                            initialValues={{ password: "", confirmPassword: "" }}
                            validationSchema={Validation}
                            onSubmit={async (values, { setSubmitting }) => {
                                onsubmitForm(values);
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
                                    <SoftBox mb={2}>
                                        <SoftBox mb={1} ml={0.5}>
                                            <SoftTypography component="label" variant="caption" fontWeight="bold">
                                                New Password
                                            </SoftTypography>
                                        </SoftBox>
                                        <SoftInput
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            ref={userRef}
                                        />
                                        {errors.password && touched.password ? (
                                            <SoftTypography variant="caption" color="error">
                                                {errors.password}
                                            </SoftTypography>
                                        ) : null}
                                    </SoftBox>
                                    <SoftBox mb={2}>
                                        <SoftBox mb={1} ml={0.5}>
                                            <SoftTypography component="label" variant="caption" fontWeight="bold">
                                                Confirm Password
                                            </SoftTypography>
                                        </SoftBox>
                                        <SoftInput
                                            type="password"
                                            placeholder="confirm Password"
                                            name="confirmPassword"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.confirmPassword}
                                        />
                                        {errors.confirmPassword && touched.confirmPassword ? (
                                            <SoftTypography variant="caption" color="error">
                                                {errors.confirmPassword}
                                            </SoftTypography>
                                        ) : null}
                                    </SoftBox>

                                    <SoftBox mt={4} mb={1}>
                                        <SoftButton
                                            variant="gradient"
                                            disabled={disableButton}
                                            color="info"
                                            fullWidth
                                            type="submit"
                                        >
                                            Change Password
                                        </SoftButton>
                                    </SoftBox>
                                </SoftBox>
                            )}
                        </Formik>
                    )}
                </>
            )}
        </CoverLayout>
    );
}

export default ResetPassword;
