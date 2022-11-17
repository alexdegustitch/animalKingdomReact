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
import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import { Link } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import moment from "moment";
// Timeline context
import { useTimeline } from "examples/Timeline/context";

// Custom styles for the TimelineItem
import timelineItem from "examples/Timeline/TimelineItem/styles";

function CompetitionInfo({ idTour, stage, prevStageEndDate }) {
  const isDark = useTimeline();
  const [lastItem, setLastItem] = useState(false);
  const [color, setColor] = useState("success");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [duration, setDuration] = useState("");
  const [action, setAction] = useState("");

  useEffect(() => {
    const now = moment();
    setDescription("");
    setDuration(
      `${moment(stage.start_date).format("LLL")} - ${moment(stage.end_date).format("LLL")}`
    );

    if (stage.stage_type === 5) {
      setLastItem(true);
    }
    if (now.isAfter(moment(stage.end_date))) {
      setColor("success");
      setStatus("COMPLETED");
      setAction(`/competitionStages/${idTour}/${stage.stage_type}`);
    } else if (now.isBefore(moment(stage.start_date))) {
      setColor("dark");
      setStatus("SCHEDULED");
      if (stage.stage_type === 1 || now.isAfter(moment(prevStageEndDate))) {
        setAction(`/competitionStages/${idTour}/${stage.stage_type}`);
      } else {
        setAction("");
      }
    } else {
      setColor("error");
      setStatus("IN PROGRESS");
      setAction(`/competitionStages/${idTour}/${stage.stage_type}`);
    }
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      // console.log("ovde sam");
      if (status === "COMPLETED") {
        clearInterval(intervalId);
        return;
      }
      const now = moment();
      if (now.isAfter(moment(stage.end_date))) {
        setColor("success");
        setStatus("COMPLETED");
        setAction(`/competitionStages/${idTour}/${stage.stage_type}`);
      } else if (now.isBefore(moment(stage.start_date))) {
        setColor("dark");
        setStatus("SCHEDULED");
        if (stage.stage_type === 1 || now.isAfter(moment(prevStageEndDate))) {
          setAction(`/competitionStages/${idTour}/${stage.stage_type}`);
        } else {
          setAction("");
        }
      } else {
        setColor("error");
        setStatus("IN PROGRESS");
        setAction(`/competitionStages/${idTour}/${stage.stage_type}`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [color, status, action]);
  return (
    <MDBox position="relative" mb={3} sx={(theme) => timelineItem(theme, { lastItem, isDark })}>
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor={color}
        color="white"
        width="2rem"
        height="2rem"
        borderRadius="50%"
        position="absolute"
        top="8%"
        left="2px"
        zIndex={2}
        component={Link}
        to={action}
        sx={{ fontSize: ({ typography: { size } }) => size.sm }}
      >
        <MDTypography />
      </MDBox>
      <MDBox ml={5.75} pt={description ? 0.7 : 0.5} lineHeight={0} maxWidth="30rem">
        <MDTypography variant="button" fontWeight="medium" color={isDark ? "white" : "dark"}>
          {duration}
        </MDTypography>
        <MDBox mt={0.5}>
          <MDTypography variant="caption" color={isDark ? "secondary" : "text"}>
            {status}
          </MDTypography>
        </MDBox>
        <MDBox mt={2} mb={1.5}>
          {description ? (
            <MDTypography variant="button" color={isDark ? "white" : "dark"}>
              {description}
            </MDTypography>
          ) : null}
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Typechecking props for the TimelineItem
CompetitionInfo.propTypes = {
  idTour: PropTypes.number.isRequired,
  stage: PropTypes.node.isRequired,
  prevStageEndDate: PropTypes.string.isRequired,
};

export default CompetitionInfo;
