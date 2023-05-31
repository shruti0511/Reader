import SoftBox from 'components/SoftBox'
import SoftTypography from 'components/SoftTypography'
import React from 'react'
import PropTypes from "prop-types";

const Function = ({ job, org }) => {
  return (
    <SoftBox display="flex" flexDirection="column">
    <SoftTypography variant="caption" fontWeight="medium" color="text">
      {job}
    </SoftTypography>
    <SoftTypography variant="caption" color="secondary">
      {org}
    </SoftTypography>
  </SoftBox>
  )
}
Function.propTypes = {
    job: PropTypes.string.isRequired,
    org: PropTypes.string
};
export default Function