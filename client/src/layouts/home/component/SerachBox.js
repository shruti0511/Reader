import SoftBox from 'components/SoftBox'
import SoftInput from 'components/SoftInput'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const SerachBox = ({ onChangeSerchKey }) => {

    return (
        <SoftBox pr={1}>
            <SoftInput
                placeholder="Type here..."
                icon={{ component: "search", direction: "left" }}
                onChange={onChangeSerchKey}
            />
        </SoftBox>
    )
}

SerachBox.propTypes = {
    onChangeSerchKey: PropTypes.func.isRequired
}

export default SerachBox