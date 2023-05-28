import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import SoftTypography from 'components/SoftTypography'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Formik } from 'formik';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';

const AddRating = () => {
  return (
    <>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            General settings
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Formik
            initialValues={ {rating: 0, review: ""} }
            // validationSchema={Validation}
            onSubmit={async (values, { setSubmitting }) => {
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
                <SoftBox component="form" role="form" onSubmit={handleSubmit}>
                    {/* {error &&
                        <SoftTypography variant="caption" color="error">
                            {error}
                        </SoftTypography>} */}
                    <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                            <SoftTypography component="label" variant="caption" fontWeight="bold">
                                Review
                            </SoftTypography>
                        </SoftBox>
                        <SoftInput
                            type="text"
                            placeholder="Add Comment..."
                            name="review"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.review}
                        />
                        {/* {errors.review && touched.review ? (
                            <SoftTypography variant="caption" color="error">
                                {errors.review}
                            </SoftTypography>
                        ) : null} */}
                    </SoftBox>
                   
                    <SoftBox mt={4} mb={1}>
                        <SoftButton variant="gradient" color="info" fullWidth type="submit">
                            Add Rating
                        </SoftButton>
                    </SoftBox>
                </SoftBox>
            )}
        </Formik>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default AddRating