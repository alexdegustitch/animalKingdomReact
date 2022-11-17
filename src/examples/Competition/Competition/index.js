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

import axios from "axios";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { useState, useEffect } from "react";
// Material Dashboard 2 React example components
import CompetitionInfo from "../CompetitionInfo";

function OneCompetition({ tour }) {
  const [stages, setStages] = useState([]);

  useEffect(() => {
    const allStages = async () => {
      const response = await axios.get(
        `https://animalsinthekingdom.herokuapp.com/stages/getStages/${tour.id_competition}`
      );
      setStages(response.data);
    };
    allStages();
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          {tour.name}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        {stages.map((stage, index) => {
          let prevStageEndtime = null;
          if (index > 0) {
            prevStageEndtime = stages[index - 1].end_date;
          }
          return (
            <CompetitionInfo
              key={stage.id_stage}
              idTour={tour.id_competition}
              stage={stage}
              prevStageEndDate={prevStageEndtime}
            />
          );
        })}
      </MDBox>
    </Card>
  );
}

OneCompetition.propTypes = {
  tour: PropTypes.node.isRequired,
};
export default OneCompetition;
