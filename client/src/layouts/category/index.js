// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { Box, CardContent, Grid, Modal, Typography } from "@mui/material";
import CategoryCard from "./components/CategoryCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
import React, { useEffect, useState } from "react";
import categoryService from "services/categoryService";
import AddUpdateCategory from "./components/AddUpdateCategory";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function Category() {
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('add');
  const [category, setCategory] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    categoryService
      .getCategories()
      .then((response) => {
        // setSuccessMsg(response.data.message)
        // setErrorMsg();
        // setEmailConfirmed(true)
        if (response.status === 200) {
          setCategories(response.data);
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
  };

  const addCategorySuccess = () => {
    handleClose()
    getCategories()
  }

  const deleteCategory = (id) => {
    categoryService
      .deleteCategory({ id: id })
      .then((response) => {
        if (response.status === 200) {
          getCategories()
        }
      })
      .catch((error) => {
        // error is handled in catch block
        if (error.response) {
          console.log("Data :", error.response.data);
          console.log("Status :" + error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  }

  const openUpdateModal = (category) => {
    setCategory(category)
    setStatus('update')
    handleOpen()
  }

  const openAddModal = () => {
    debugger
    setStatus('add')
    handleOpen()
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mb={3}>
        <Card >
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <SoftTypography variant="h6" fontWeight="medium">
                Category
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Books Categories
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              {categories &&
                categories.map((category, index) => {
                  return (
                    <CategoryCard
                      key={index}
                      image={category.image}
                      title={category.name}
                      imagePath={category.imagePath}
                      deleteCategory={() => { deleteCategory(category._id) }}
                      updateIcon={<EditIcon color="info" onClick={()=>{openUpdateModal(category)}} />}
                      deleteIcon={<DeleteIcon color="error" onClick={() => { deleteCategory(category._id) }} />}
                    // image={homeDecor1}
                    //label="project #2"
                    // title="modern"
                    // description="As Uber works through a huge amount of internal management turmoil."
                    // action={{
                    //   color: "error",
                    //   label: "Delete",
                    //   icon: <EmailIcon fontSize="large"/>
                    // }}
                    // updateAction={{
                    //   color: "info",
                    //   label: "Update",
                    //   icon: <EmailIcon fontSize="large"/>
                    // }}

                    // authors={[
                    //   { image: team1, name: "Elena Morison" },
                    //   { image: team2, name: "Ryan Milly" },
                    //   { image: team3, name: "Nick Daniel" },
                    //   { image: team4, name: "Peterson" },
                    // ]}
                    />
                  );
                })}
              <Grid item xs={12} md={6} xl={3} xxl={2} onClick={openAddModal}>
                <PlaceholderCard
                  title={{ variant: "h5", text: "New Category" }}
                  sx={{ maxHeight: "250px" }}
                  outlined
                />
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              Modal Header
              <Button onClick={handleClose}>x</Button>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Modal content

          </Typography> */}
            <Card variant="outlined">
              <CardContent>
                <AddUpdateCategory close={addCategorySuccess} status={status} category={category}/>
              </CardContent>
            </Card>
          </Box>
        </Modal>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Category;
