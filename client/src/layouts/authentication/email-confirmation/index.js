import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

// react-router-dom components
import { Link, useNavigate, useParams } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import authService from "services/authService";
import { Button } from "@mui/material";

function EmailConfirmation() {
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [emailResend, setEmailResend] = useState(false);
  const [successMsg, setSuccessMsg] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [linkExpired, setLinkExpired] = useState(false)

  const params = useParams();
  const Validation = Yup.object().shape({
    email: Yup.string().required("Email is Required").email("Enter Valid Email Id"),
  });


  const confirmEmail = async (data) => {
    const { email } = data;
    authService
      .verifyUser({ confirmationCode: params.confirmationCode, email })
      .then((response) => {
        setSuccessMsg(response.data.message)
        setErrorMsg();
        setEmailConfirmed(true)
      })
      .catch((error) => {
        // error is handled in catch block
        if (error.response) {
          // status code out of the range of 2xx
          console.log("Data :", error.response.data);
          console.log("Status :" + error.response.status);
          if (error.response.status === 403) {
            setLinkExpired(true)
            setErrorMsg(error.response.data.message);
            setSuccessMsg();
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Error on setting up the request
          console.log("Error", error.message);
        }
      });
  };

  const reSendEmail = async (data) => {
    const { email } = data
    authService
      .reSendEmail({ email })
      .then((response) => {
        setSuccessMsg(response.data.message);
        setErrorMsg();
        setEmailResend(true)
      })
      .catch((error) => {
        if (error.response) {

          console.log("Data :", error.response.data);
          console.log("Status :" + error.response.status);
          setErrorMsg(error.response.data.message)
          setSuccessMsg();

        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  }

  return (
    <BasicLayout title="Confirm your email!" description="" image={curved6}>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Confirm Email
          </SoftTypography>
        </SoftBox>
        {/* <SoftBox  mb={1}>
        <Socials />
        </SoftBox> */}
        {emailConfirmed || emailResend ? (
          <SoftBox textAlign="center">
            <SoftTypography variant="caption" color="success">
              {successMsg}, Click to{" "}
              <SoftTypography
                component={Link}
                to="/authentication/sign-in"
                variant="button"
                color="dark"
                fontWeight="bold"
                textGradient
              >
                Sign in
              </SoftTypography>
            </SoftTypography>
          </SoftBox>
        ) : (
          <>
            <SoftBox textAlign="center">
              {
                errorMsg && (
                  // <SoftTypography variant="caption" color="error">
                  <SoftTypography
                    //component={Link}
                    //to="/authentication/sign-in"
                    variant="button"
                    color="error"
                    fontWeight="bold"
                    textGradient
                  >
                    {errorMsg}, submit to re-send email

                  </SoftTypography>
                )
                // </SoftTypography>
              }
              {successMsg && (
                <SoftTypography
                  variant="button"
                  color="success"
                  fontWeight="bold"
                  textGradient
                >
                  {successMsg}
                </SoftTypography>
              )}

            </SoftBox>
            <SoftBox pt={2} pb={3} px={3}>
              <Formik
                initialValues={{ name: "", email: "", password: "" }}
                validationSchema={Validation}
                onSubmit={(values, { setSubmitting }) => {
                  linkExpired ? reSendEmail(values) : confirmEmail(values);

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
                      <SoftInput
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      {errors.email && touched.email ? (
                        <SoftTypography variant="caption" color="error">
                          {errors.email}
                        </SoftTypography>
                      ) : null}
                    </SoftBox>

                    <SoftBox mt={4} mb={1}>
                      <SoftButton variant="gradient" color="dark" fullWidth type="submit">
                        {linkExpired ? "Re-send confirmation Mail" : "Confirm email"}
                      </SoftButton>
                    </SoftBox>
                    {/* <SoftBox mt={3} textAlign="center">
                  <SoftTypography variant="button" color="text" fontWeight="regular">
                    Already have an account?&nbsp;
                    <SoftTypography
                      component={Link}
                      to="/authentication/sign-in"
                      variant="button"
                      color="dark"
                      fontWeight="bold"
                      textGradient
                    >
                      Sign in
                    </SoftTypography>
                  </SoftTypography>
                </SoftBox> */}
                  </SoftBox>
                )}
              </Formik>
            </SoftBox>
          </>
        )}
      </Card>
    </BasicLayout>
  );
}

export default EmailConfirmation;
