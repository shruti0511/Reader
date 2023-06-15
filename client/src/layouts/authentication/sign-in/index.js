import { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

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
import Socials from "../components/Socials";

function SignIn() {
  const userRef = useRef();
  const errRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [persist, setPersist] = usePersist();
  const [error, setError] = useState(null);
  const handleSetPersist = () => setPersist(!persist);

  const [login] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const Validation = Yup.object().shape({
    email: Yup.string().required("Email is Required").email("Enter Valid Email Id"),
    password: Yup.string()
      .required("Password is Required")
      .min(8, "Password is too short - should be 8 chars minimum."),
  });

  return (
    <CoverLayout
      title="Welcome"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      {error != null && (
        <SoftTypography variant="caption" color="error" ref={errRef}>
          {error}
        </SoftTypography>
      )}
      <Socials />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Validation}
        onSubmit={async (values, { setSubmitting }) => {
          setPersist(true);
          const { email, password } = values;
          //e.preventDefault();
          try {
            const { accessToken } = await login({ email, password }).unwrap();
            dispatch(setCredentials({ accessToken }));
            navigate("/");
          } catch (error) {
            debugger;
            if (!error.status) {
              setError("No Server Response");
            } else if (error.status === 400) {
              setError("Missing Username or Password");
            } else if (error.status === 401) {
              setError("Unauthorized");
            } else {
              setError(error?.data?.message);
            }
            errRef.current.focus();
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
            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Password
                </SoftTypography>
              </SoftBox>
              <SoftInput
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password ? (
                <SoftTypography variant="caption" color="error">
                  {errors.password}
                </SoftTypography>
              ) : null}
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Switch checked={persist} onChange={handleSetPersist} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetPersist}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Remember me
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="info" fullWidth type="submit">
                Sign in
              </SoftButton>
            </SoftBox>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={6}>
                <SoftBox textAlign="left">
                  <SoftTypography
                    component={Link}
                    to="/authentication/forgotPassword"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Forgot Password
                  </SoftTypography>
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <SoftBox textAlign="right">
                  <SoftTypography
                    component={Link}
                    to="/authentication/sign-up"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign Up
                  </SoftTypography>
                </SoftBox>
              </Grid>
            </Grid>
          </SoftBox>
        )}
      </Formik>
    </CoverLayout>
  );
}

export default SignIn;
