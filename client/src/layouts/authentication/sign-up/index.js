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

import { useEffect, useState } from "react";
import { Formik } from "formik"
import * as Yup from 'yup';

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import { useSignUpMutation } from "redux/auth/authApiSlice";

function SignUp() {
  const [agreement, setAgremment] = useState(true);
  const [successMsg, setSuccessMsg] = useState();
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [signUp, { isLoading, isSuccess, isError, error }] =
    useSignUpMutation();


  const handleSetAgremment = () => setAgremment(!agreement);
  const Validation = Yup.object().shape({
    name: Yup.string().required('Name is Required'),
    email: Yup.string().required('Email is Required').email("Enter Valid Email Id"),
    password: Yup.string().required('Password is Required')
      .min(8, 'Password is too short - should be 8 chars minimum.')
  });

  useEffect(() => {
    if (isSuccess) {
      //console.log('yeah');
      //navigate("/authentication/sign-in");
    }
  }, [isSuccess, navigate]);

  const register = async (data) => {
    const { name, email, password } = data
    // console.log(`${name}-${email}-${password}`);
    // e.preventDefault();
    // if (canSave) {
    const res = await signUp({ name, email, password });
    console.log(res.data);
    setSuccessMsg(res.data.messgae)
    // }
    // registerService(data).then((res) => {

    //   if (res.status == 200) {
    //     console.log(res);
    //     setError(null);
    //     navigate("/virtual-reality");
    //     // navigate("/landing");
    //     // history.push('/travel')


    //   }

    // }).catch((err) => {
    //   console.log(err);
    //   setError(err.response.data)
    // })
  }
  return (
    <BasicLayout
      title="Welcome!"
      // description="description."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register
          </SoftTypography>

        </SoftBox>
        <SoftBox mb={1}>
          <Socials />
        </SoftBox>
        <Separator />
        <SoftBox textAlign="center">
          {
            error != null &&
            <SoftTypography variant="caption" color="error">{error}</SoftTypography>
          }
          {
            successMsg != null &&
            <SoftTypography variant="h6" color="success">{successMsg}</SoftTypography>
          }
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <Formik

            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={Validation}
            onSubmit={(values, { setSubmitting }) => {
              register(values);
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
              isSubmitting
            }) => (


              <SoftBox component="form" role="form" onSubmit={handleSubmit}>
                <SoftBox mb={2}>
                  <SoftInput
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />{errors.name && touched.name ? (
                    <SoftTypography variant="caption" color="error">{errors.name}</SoftTypography>) : null}
                </SoftBox>

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
                    <SoftTypography variant="caption" color="error">{errors.email}</SoftTypography>) : null}
                </SoftBox>

                <SoftBox mb={2}>
                  <SoftInput
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password ? (

                    <SoftTypography variant="caption" color="error">{errors.password}</SoftTypography>
                  ) : null}

                </SoftBox>
                <SoftBox display="flex" alignItems="center">
                  <Checkbox checked={agreement} onChange={handleSetAgremment} />
                  <SoftTypography
                    variant="button"
                    fontWeight="regular"
                    onClick={handleSetAgremment}
                    sx={{ cursor: "poiner", userSelect: "none" }}
                  >
                    &nbsp;&nbsp;I agree the&nbsp;
                  </SoftTypography>
                  <SoftTypography
                    component="a"
                    href="#"
                    variant="button"
                    fontWeight="bold"
                    textGradient
                  >
                    Terms and Conditions
                  </SoftTypography>
                </SoftBox>
                <SoftBox mt={4} mb={1}>
                  <SoftButton variant="gradient" color="dark" fullWidth type="submit" >
                    sign up
                  </SoftButton>
                </SoftBox>
                <SoftBox mt={3} textAlign="center">
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
                </SoftBox>
              </SoftBox>
            )}
          </Formik>

        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
