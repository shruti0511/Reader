import SoftAvatar from 'components/SoftAvatar'
import SoftBox from 'components/SoftBox'
import SoftTypography from 'components/SoftTypography'
import React from 'react'
import PropTypes from "prop-types";

const Author = ({ image, name, email }) => {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column" maxWidth="400px">
        <SoftTypography variant="button" fontWeight="medium" >
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  )
}
Author.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  email: PropTypes.string
};
export default Author