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

import { Grid } from "@mui/material";
// prop-types is library for typechecking of props
import PropTypes from "prop-types";
// Material Dashboard 2 React components

import OneCompetition from "../Competition";

function AllCompetitionsList({ tours }) {
  return (
    <Grid container spacing={6}>
      {tours.map((tour) => (
        <Grid item xs={12} md={6} xl={6} key={tour.id_competition}>
          <OneCompetition tour={tour} key={tour.id_competition} />
        </Grid>
      ))}
    </Grid>
  );
}

AllCompetitionsList.propTypes = {
  tours: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default AllCompetitionsList;
