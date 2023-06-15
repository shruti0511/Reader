import React, { useEffect, useState } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Author from './components/Author'
import { Grid } from '@mui/material'
import Language from './components/Language'
import authorService from 'services/authorService'
import languageService from 'services/languageService'
const Other = () => {


  return (
    <DashboardLayout>
      <DashboardNavbar navTitle="Other Data" />

      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={8}>
          <Author />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Language />
        </Grid>
      </Grid>

    </DashboardLayout>
  )
}

export default Other