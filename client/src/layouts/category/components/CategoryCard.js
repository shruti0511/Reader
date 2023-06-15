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
import { Grid, Stack } from "@mui/material";

import defaultBookImage from "assets/images/default-images/defaultBookImage.jpg";

function CategoryCard({ image, title, imagePath, updateIcon, deleteIcon, deleteCategory, authors, action, openModalList }) {
  var imageSrc = image ? process.env.REACT_APP_SERVER_API + imagePath + "/" + image : defaultBookImage;

  const renderAuthors = authors.map(({ image: media, title, imagePath }) => (

    <Tooltip key={title} title={title} placement="bottom">
      <SoftAvatar
        src={media ? process.env.REACT_APP_SERVER_API + imagePath + "/" + media : defaultBookImage}
        alt={title}
        size="sm"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  return (
    <Grid item xs={12} md={4} xl={3} xxl={3}>
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
              height: '200px',
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
            {authors.length !== 0
              ?
              <>
                <SoftBox display="flex">{renderAuthors}</SoftBox>
                <SoftButton
                  variant="outlined"
                  size="small"
                  color={action.color}
                  onClick={openModalList}
                >
                  {action.label}
                </SoftButton>
              </>
              : <SoftTypography variant="body2" color="text">No book for this category</SoftTypography>
            }

          </SoftBox>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" mt={2}>
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
  action: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  openModalList: PropTypes.func.isRequired,
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
  deleteIcon: PropTypes.element,
  deleteCategory: PropTypes.func.isRequired,

  authors: PropTypes.arrayOf(PropTypes.object),
};

export default CategoryCard;
