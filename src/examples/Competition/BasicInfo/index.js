/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Custom styles for the TimelineItem

function BasicInfoItem({ icon, color, text, lastItem }) {
  return (
    <MDBox position="relative" mb={1}>
      {lastItem}
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor={color}
        color="white"
        width="1.5rem"
        height="1.5rem"
        borderRadius="50%"
        position="absolute"
        top="8%"
        left="2px"
        zIndex={2}
        sx={{ fontSize: ({ typography: { size } }) => size.sm }}
      >
        <Icon fontSize="inherit">{icon}</Icon>
      </MDBox>
      <MDBox ml={5.75} pt={0.5} lineHeight={0} maxWidth="30rem">
        <MDTypography variant="button" color="text" fontWeight="light">
          {text}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of TimelineItem
BasicInfoItem.defaultProps = {
  color: "info",
  lastItem: false,
};

// Typechecking props for the TimelineItem
BasicInfoItem.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  text: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  lastItem: PropTypes.bool,
};

export default BasicInfoItem;
