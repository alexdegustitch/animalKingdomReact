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
import React, { useState, useEffect } from "react";

// @mui material components

// @mui icons

// axios
import axios from "axios";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/profile/components/Header";
import AllCompetitionsList from "examples/Competition/AllCompetitionsList";

// Data

// Images
function AllCompetitions() {
  const [tours, setTours] = useState([]);
  useEffect(() => {
    const allCompetitions = async () => {
      const response = await axios.get(
        `https://animalsinthekingdom.herokuapp.com/tournaments/allTournaments`
      );
      console.log(response);
      setTours(response.data);
    };

    allCompetitions();
  }, []);
  return (
    <DashboardLayout>
      <MDBox mb={2} />
      <Header>
        <MDBox p={2}>
          <AllCompetitionsList tours={tours} />
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default AllCompetitions;
