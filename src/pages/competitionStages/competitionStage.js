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
import Grid from "@mui/material/Grid";

import { useEffect, useState } from "react";
import axios from "axios";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import moment from "moment";
import "moment-duration-format";
import Icon from "@mui/material/Icon";
// Data
import CompetitionGroup from "examples/Competition/GroupCompetition";
import { useParams, useNavigate } from "react-router-dom";
/*
import Chip from "@mui/material/Chip";
import styled from "@mui/styles/styled";

const StyledChip = styled(Chip)({
  background: "linear-gradient(45deg, #444444 30%, #333333 90%)",
  color: "white",
  padding: "0",
  fontSize: 20,
  fontWeight: "bold",
  height: 40,
  border: "none",
  justifyContent: "right",
  paddingRight: 10,
  paddingLeft: 10,
  marginLeft: 10,
  marginRight: 10,
}); */

function Tables() {
  const { id, stage } = useParams();
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [stageId, setStageId] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");
  const [stageStartTime, setStageStartTime] = useState();
  const [stageEndTime, setStageEndTime] = useState();
  const [color, setColor] = useState("dark");
  const [stageActive, setStageActive] = useState(0);

  useEffect(() => {
    const allGroups = async () => {
      const jsonData = {
        id_tour: id,
        stage_type: stage,
      };
      console.log(jsonData);
      const config = {
        method: "post",
        url: "https://animalsinthekingdom.herokuapp.com/stages/getStageForTour",
        headers: {
          "Content-Type": "application/json",
        },
        data: jsonData,
      };
      const response = await axios(config);
      // console.log(response);
      const idStage = response.data.id_stage;
      setStageId(idStage);

      const startTime = moment(response.data.start_date);
      const currTime = moment.now();
      const endTime = moment(response.data.end_date);
      setStageStartTime(startTime);
      setStageEndTime(endTime);
      if (startTime.isAfter(currTime)) {
        setStageActive(0);
        const diff = startTime.diff(currTime);

        const duration = moment.duration(diff);
        setTimeLeft(`Starts in: ${duration.format("HH:mm:ss", { trim: false })}`);
        setColor("dark");
      } else if (endTime.isAfter(currTime)) {
        setStageActive(1);

        const diff = endTime.diff(currTime);

        const duration = moment.duration(diff);
        setTimeLeft(`Ends in: ${duration.format("HH:mm:ss", { trim: false })}`);
        if (duration.asMinutes() <= 1) {
          if (duration.asSeconds() < 0) {
            setColor("info");
            setTimeLeft("STAGE ENDED");
            setStageActive(2);
          } else if (duration.asSeconds() <= 10) {
            setColor("error");
          } else {
            setColor("warning");
          }
        }
      } else {
        setStageActive(2);
        setTimeLeft(`STAGE ENDED`);
        setColor("info");
      }

      const response2 = await axios.get(
        `https://animalsinthekingdom.herokuapp.com/groups/getGroupNumbers/${idStage}`
      );
      setGroups(response2.data);
    };
    allGroups();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // console.log(stageEndTime);
      if (stageActive === 2) {
        console.log(intervalId, stageActive);
        clearInterval(intervalId);
      }
      const currTime = moment.now();
      if (stageStartTime.isAfter(currTime)) {
        setStageActive(0);
        const diff = stageStartTime.diff(currTime);

        const duration = moment.duration(diff);
        setTimeLeft(`Starts in: ${duration.format("HH:mm:ss", { trim: false })}`);
        setColor("dark");
      } else if (stageEndTime.isAfter(currTime)) {
        setStageActive(1);

        const diff = stageEndTime.diff(currTime);

        const duration = moment.duration(diff);
        setTimeLeft(`Ends in: ${duration.format("HH:mm:ss", { trim: false })}`);
        if (duration.asMinutes() <= 1) {
          if (duration.asSeconds() < 0) {
            setColor("info");
            setTimeLeft("STAGE ENDED");
            setStageActive(2);
          } else if (duration.asSeconds() <= 10) {
            setColor("error");
          } else {
            setColor("warning");
          }
        }
      } else {
        setStageActive(2);
        setTimeLeft(`STAGE ENDED`);
        setColor("info");
      }
    }, 800);

    return () => clearInterval(intervalId); // This is important
  }, [stageStartTime, stageEndTime]);
  return (
    <DashboardLayout>
      <MDBox display="flex" justifyContent="center" alignItems="right">
        <MDButton
          variant="gradient"
          color="dark"
          onClick={() => {
            navigate(`/competitionStages/${id}/${parseInt(stage, 10) - 1}`, { replace: true });
            window.location.reload();
          }}
          disabled={parseInt(stage, 10) <= 1}
        >
          <Icon sx={{ fontWeight: "bold" }}>west</Icon>&nbsp;previous stage
        </MDButton>
        <MDButton variant="gradient" color={color} style={{ marginLeft: 5, marginRight: 5 }}>
          {timeLeft}
        </MDButton>
        {/*
        <StyledChip
          variant="outlined"
          color="success"
          label={timeLeft}
          style={{ background: `linear-gradient(45deg, ${color} 30%, ${color} 90%)` }}
          background="red"
        />
        */}

        <MDButton
          variant="gradient"
          color="dark"
          onClick={() => {
            navigate(`/competitionStages/${id}/${parseInt(stage, 10) + 1}`, { replace: true });
            window.location.reload();
          }}
          disabled={parseInt(stage, 10) >= 5}
        >
          next stage &nbsp;<Icon sx={{ fontWeight: "bold" }}>east</Icon>
        </MDButton>
      </MDBox>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6} justifyContent="center">
          {groups.map((group) => (
            <CompetitionGroup tour={id} group={group} stageType={stage} stageId={stageId} />
          ))}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
