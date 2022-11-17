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

// @mui material components
import Card from "@mui/material/Card";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// examples components
import BasicInfoItem from "../BasicInfo";

function AnimalBasicInfo({ animal }) {
  return (
    <Card sx={{ boxShadow: "none" }}>
      <MDBox p={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          info
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
            appearance
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <BasicInfoItem color="success" icon="height" text={animal.size} />
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <BasicInfoItem color="success" icon="scale" text={animal.weight} />
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <BasicInfoItem color="success" icon="palette" text={animal.color} />
        </MDBox>
        <MDBox mt={2} mb={2}>
          <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
            habitat
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <BasicInfoItem color="success" icon="grass" text={animal.habitat} />
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <BasicInfoItem color="success" icon="language" text={animal.territory} />
        </MDBox>
        <MDBox mt={2} mb={2}>
          <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
            Pregnancy
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0} ml={-1.5}>
          <BasicInfoItem color="success" icon="pregnant_woman" text={animal.gestation_period} />
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0} ml={-1.5}>
          <BasicInfoItem color="success" icon="bedroom_baby" text={animal.calves_number} />
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0} ml={-1.5}>
          <BasicInfoItem color="success" icon="diversity_1" text={animal.baby_name} />
        </MDBox>
      </MDBox>
    </Card>
  );
}
AnimalBasicInfo.propTypes = {
  animal: PropTypes.node.isRequired,
};

export default AnimalBasicInfo;
