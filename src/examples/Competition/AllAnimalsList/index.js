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

// react-router-dom components

import React from "react";
// prop-types is a library for typechecking of props

// @mui material components
import { Grid } from "@mui/material";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 React components

import AnimalBasicCard from "../AnimalBasicCard";

function AllAnimalsList({ animals }) {
  return (
    <Grid container spacing={6}>
      {animals.map((animal) => (
        <Grid item xs={6} md={4} xl={3} key={animal.number}>
          <AnimalBasicCard
            key={animal.number}
            number={animal.number}
            binomialName={animal.binomial_name}
            name={animal.name}
            action={{
              type: "internal",
              route: `/animalProfile/${animal.number}`,
              color: "info",
              label: "View more",
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}

AllAnimalsList.propTypes = {
  animals: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default AllAnimalsList;
