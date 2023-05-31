import { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

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

function ForgotPassword() {
  const userRef = useRef();
  const [persist, setPersist] = usePersist();
  const [emailSent, setEmailSent] = useState(false);
  const [disableButton, setDisableButton] = useState(false)

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const Validation = Yup.object().shape({
    email: Yup.string().required("Email is Required").email("Enter Valid Email Id"),
  });

  return (
    <CoverLayout
      title={emailSent ? "Reset Password" : "Forgot Password"}
      description={emailSent ? "Email sent successfully" : "Enter your email to reset password"}
      image={curved9}
    >
      {emailSent ? (
        <>
          <SoftBox textAlign="center">
            <SoftTypography variant="h3" color="secondary">
              Check your Email for Reset Password Link.
            </SoftTypography>
            <EmailIcon fontSize="large" />
          </SoftBox>
        </>
      ) : (
        <>
          <SoftTypography variant="caption" color="primary">
            Forgotten your password? Enter your e-mail address below, and we will send you an e-mail
            allowing you to reset it.
          </SoftTypography>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={Validation}
            onSubmit={async (values, { setSubmitting }) => {
              setDisableButton(true)
              const { email } = values;
              authService
                .forgotPassword({ email })
                .then((response) => {
                  // setSuccessMsg(response.data.message)
                  // setErrorMsg();
                  // setEmailConfirmed(true)
                  if (response.status === 200) {
                    setEmailSent(true)
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
                    // setErrorMsg(error.response.data.message);
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
                      Email
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    ref={userRef}
                  />
                  {errors.email && touched.email ? (
                    <SoftTypography variant="caption" color="error">
                      {errors.email}
                    </SoftTypography>
                  ) : null}
                </SoftBox>

                <SoftBox mt={4} mb={1}>
                  <SoftButton variant="gradient" disabled={disableButton} color="info" fullWidth type="submit">
                    Reset My Password
                  </SoftButton>
                </SoftBox>
              </SoftBox>
            )}
          </Formik>
        </>
      )}
    </CoverLayout>
  );
}

export default ForgotPassword;
