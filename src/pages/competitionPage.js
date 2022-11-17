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
import React, { Component } from "react";

// @mui material components
import { Grid } from "@mui/material";

// @mui icons

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import CompetitionGroup from "examples/Competition/GroupCompetition";

// Overview page components
import Header from "layouts/profile/components/Header";

// Data

// Images
class CompetitionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [1],
    };
  }

  render() {
    const { groups } = this.state;
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mb={2} />
        <Header>
          {groups.map((group) => (
            <Grid key={group}>
              {" "}
              <MDBox pt={2} px={2} lineHeight={1.25}>
                <MDTypography variant="h6" fontWeight="medium">
                  Grupa {group}
                </MDTypography>
              </MDBox>
              <MDBox p={2}>
                <CompetitionGroup />
              </MDBox>
            </Grid>
          ))}
        </Header>
        <Footer />
      </DashboardLayout>
    );
  }
}

export default CompetitionPage;
