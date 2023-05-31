import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftAvatar from "components/SoftAvatar";
import { Grid } from "@mui/material";

import defaultCategory from "assets/images/default-images/defaultCategory.jpg";

function CategoryCard({ image, title, imagePath,updateIcon,deleteIcon, deleteCategory }) {
  var imageSrc = image ? process.env.REACT_APP_SERVER_API + imagePath + "/" + image : defaultCategory;
  // const renderAuthors = authors.map(({ image: media, name }) => (
  //   <Tooltip key={name} title={name} placement="bottom">
  //     <SoftAvatar
  //       src={media}
  //       alt={name}
  //       size="xs"
  //       sx={({ borders: { borderWidth }, palette: { white } }) => ({
  //         border: `${borderWidth[2]} solid ${white.main}`,
  //         cursor: "pointer",
  //         position: "relative",
  //         ml: -1.25,

  //         "&:hover, &:focus": {
  //           zIndex: "10",
  //         },
  //       })}
  //     />
  //   </Tooltip>
  // ));

  return (
    <Grid item xs={12} md={4} xl={3} xxl={2}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "transparent",
          boxShadow: "none",
          overflow: "visible",
        }}
      >
        <SoftBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
          <CardMedia
            src={imageSrc}
            component="img"
            title={title}
            sx={{
              width: "100%",
              height: '250px',
              margin: 0,
              boxShadow: ({ boxShadows: { md } }) => md,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </SoftBox>
        <SoftBox pt={3} px={0.5}>
          <SoftBox mb={1}>
            {/* {action.type === "internal" ? (
              <SoftTypography
                // component={Link}
                // to={action.route}
                variant="h5"
                textTransform="capitalize"
              >
                {title}
              </SoftTypography>
            ) : ( */}
            <SoftTypography
              // component="a"
              // href={action.route}
              // target="_blank"
              // rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </SoftTypography>
            {/* )} */}
          </SoftBox>
          {/* <SoftButton
              component={Link}
              to={action.route}
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </SoftButton> */}
          {/* <SoftBox mb={3} lineHeight={0}>
          <SoftTypography variant="button" fontWeight="regular" color="text">
            {description}
          </SoftTypography>
        </SoftBox> */}
          <SoftBox display="flex" justifyContent="space-between" alignItems="center">

            {/* <SoftButton
              variant="outlined"
              size="small"
              color={updateAction.color}
            // onClick={deleteCategory}
            >
              {updateAction.icon}
            </SoftButton>
            <SoftButton
              variant="outlined"
              size="small"
              color={action.color}
              onClick={deleteCategory}
            >
              {action.icon}
            </SoftButton> */}

            {/* <SoftBox display="flex">{renderAuthors}</SoftBox> */}
            {updateIcon}
            {deleteIcon}
          </SoftBox>
        </SoftBox>
      </Card>
    </Grid>
  );
}

// Setting default values for the props of CategoryCard
CategoryCard.defaultProps = {
  authors: [],
};

// Typechecking props for the CategoryCard
CategoryCard.propTypes = {
  image: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  //description: PropTypes.string.isRequired,
  // action: PropTypes.shape({
  //   color: PropTypes.oneOf([
  //     "primary",
  //     "secondary",
  //     "info",
  //     "success",
  //     "warning",
  //     "error",
  //     "light",
  //     "dark",
  //     "white",
  //   ]).isRequired,
  //   label: PropTypes.string.isRequired,
  //   icon:PropTypes.element
  // }).isRequired,
  // updateAction: PropTypes.shape({
  //   color: PropTypes.oneOf([
  //     "primary",
  //     "secondary",
  //     "info",
  //     "success",
  //     "warning",
  //     "error",
  //     "light",
  //     "dark",
  //     "white",
  //   ]).isRequired,
  //   label: PropTypes.string.isRequired,
  //   icon:PropTypes.element
  // }).isRequired,
  updateIcon: PropTypes.element,
  deleteIcon:PropTypes.element,
  deleteCategory: PropTypes.func.isRequired,

  // authors: PropTypes.arrayOf(PropTypes.object),
};

export default CategoryCard;
