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

import { useEffect, useState } from "react";

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";

// dates
import moment from "moment";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// axios
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
// import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function AddTournament() {
  const navigate = useNavigate();
  const days = 1;
  const minutes = 5;
  let stageDuration = 10;
  let betweenStageDuration = 2;

  // const [checked, setChecked] = useState(true);
  const [dur, setDur] = useState(1);
  const [name, setName] = useState("");
  const [groupSd, setGroupSd] = useState(moment().add(minutes, "minutes"));
  const [groupEd, setGroupEd] = useState(moment().add(minutes, "minutes").add(days, "days"));
  const [quarterSd, setQuarterSd] = useState(
    moment()
      .add(2 * minutes, "minutes")
      .add(days, "days")
  );
  const [quarterEd, setQuarterEd] = useState(
    moment()
      .add(2 * minutes, "minutes")
      .add(2 * days, "days")
  );
  const [qualificationSd, setQualificationSd] = useState(
    moment()
      .add(3 * minutes, "minutes")
      .add(2 * days, "days")
  );
  const [qualificationEd, setQualificationEd] = useState(
    moment()
      .add(3 * minutes, "minutes")
      .add(3 * days, "days")
  );
  const [semifinalSd, setSemifinalSd] = useState(
    moment()
      .add(4 * minutes, "minutes")
      .add(3 * days, "days")
  );
  const [semifinalEd, setSemifinalEd] = useState(
    moment()
      .add(4 * minutes, "minutes")
      .add(4 * days, "days")
  );
  const [finalSd, setFinalSd] = useState(
    moment()
      .add(5 * minutes, "minutes")
      .add(4 * days, "days")
  );
  const [finalEd, setFinalEd] = useState(
    moment()
      .add(5 * minutes, "minutes")
      .add(5 * days, "days")
  );

  const updateDates = (d) => {
    betweenStageDuration = 2;
    if (d === 1) {
      stageDuration = 2;
    } else if (d === 2) {
      stageDuration = 60;
    } else {
      stageDuration = 1440;
    }
    const untilFirstStage = 2;
    setGroupSd(moment().add(untilFirstStage, "minutes"));
    setGroupEd(
      moment()
        .add(untilFirstStage, "minutes")
        .add(stageDuration, "minutes")
        .add(0 * betweenStageDuration, "minutes")
    );
    setQuarterSd(
      moment()
        .add(untilFirstStage, "minutes")
        .add(stageDuration, "minutes")
        .add(1 * betweenStageDuration, "minutes")
    );
    setQuarterEd(
      moment()
        .add(untilFirstStage, "minutes")
        .add(2 * stageDuration, "minutes")
        .add(1 * betweenStageDuration, "minutes")
    );
    setQualificationSd(
      moment()
        .add(untilFirstStage, "minutes")
        .add(2 * stageDuration, "minutes")
        .add(2 * betweenStageDuration, "minutes")
    );
    setQualificationEd(
      moment()
        .add(untilFirstStage, "minutes")
        .add(3 * stageDuration, "minutes")
        .add(2 * betweenStageDuration, "minutes")
    );
    setSemifinalSd(
      moment()
        .add(untilFirstStage, "minutes")
        .add(3 * stageDuration, "minutes")
        .add(3 * betweenStageDuration, "minutes")
    );
    setSemifinalEd(
      moment()
        .add(untilFirstStage, "minutes")
        .add(4 * stageDuration, "minutes")
        .add(3 * betweenStageDuration, "minutes")
    );
    setFinalSd(
      moment()
        .add(untilFirstStage, "minutes")
        .add(4 * stageDuration, "minutes")
        .add(4 * betweenStageDuration, "minutes")
    );
    setFinalEd(
      moment()
        .add(untilFirstStage, "minutes")
        .add(5 * stageDuration, "minutes")
        .add(4 * betweenStageDuration, "minutes")
    );
  };

  const handleChangeDuration = (event) => {
    setDur(event.target.value);
    updateDates(event.target.value);
  };
  const checkDates = () => {
    if (!moment().isBefore(groupSd)) {
      return false;
    }
    if (!groupSd.isBefore(groupEd)) {
      return false;
    }
    if (!groupEd.isBefore(quarterSd)) {
      return false;
    }
    if (!quarterSd.isBefore(quarterEd)) {
      return false;
    }
    if (!quarterEd.isBefore(qualificationSd)) {
      return false;
    }
    if (!qualificationSd.isBefore(qualificationEd)) {
      return false;
    }
    if (!qualificationEd.isBefore(semifinalSd)) {
      return false;
    }
    if (!semifinalEd.isBefore(finalSd)) {
      return false;
    }
    if (!finalSd.isBefore(finalEd)) {
      return false;
    }
    return true;
  };

  const addStage = (idCompetition, startDate, endDate, active, stageType) => {
    const jsonData = {
      competition: idCompetition,
      start_date: startDate,
      end_date: endDate,
      active,
      stage_type: stageType,
    };
    const config = {
      method: "post",
      url: "https://animalsinthekingdom.herokuapp.com/stages/addStage",
      headers: {
        "Content-Type": "application/json",
      },
      data: jsonData,
    };
    console.log(startDate, endDate);
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddTournament = async (e) => {
    e.preventDefault();
    if (!checkDates()) {
      console.log("EH");
      return;
    }
    const jsonData = {
      name,
      start_date: groupSd,
      end_date: finalEd,
      active: 1,
      active_stage: 0,
    };
    const config = {
      method: "post",
      url: "https://animalsinthekingdom.herokuapp.com/tournaments/addTournament",
      headers: {
        "Content-Type": "application/json",
      },
      data: jsonData,
    };

    const response = await axios(config);
    const idCompetition = response.data.id_competition;

    addStage(idCompetition, groupSd.add(1, "hours"), groupEd.add(1, "hours"), 0, 1);
    addStage(idCompetition, quarterSd.add(1, "hours"), quarterEd.add(1, "hours"), 0, 2);
    addStage(idCompetition, qualificationSd.add(1, "hours"), qualificationEd.add(1, "hours"), 0, 3);
    addStage(idCompetition, semifinalSd.add(1, "hours"), semifinalEd.add(1, "hours"), 0, 4);
    addStage(idCompetition, finalSd.add(1, "hours"), finalEd.add(1, "hours"), 0, 5);
    navigate("/competitions");
  };

  useEffect(() => {
    updateDates(1);
  }, []);
  return (
    <BasicLayout image={bgImage} mt={10}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            New Tournament
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3} justifyContent="top">
          <MDBox component="form" role="form" onSubmit={handleAddTournament}>
            <MDBox mb={2} mr={2} display="inline">
              <MDInput
                value={name}
                type="text"
                label="Tournament name"
                style={{ width: "60%" }}
                required
                onInput={(e) => setName(e.target.value)}
              />

              <FormControl sx={{ m: 1, ml: 4, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Stage Duration</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={dur}
                  onChange={handleChangeDuration}
                  autoWidth
                  label="Stage duration"
                  style={{ fontSize: 16, fontWeight: 300, paddingTop: 5, paddingBottom: 5 }}
                >
                  <MenuItem value={1}>Short</MenuItem>
                  <MenuItem value={2}>Medium</MenuItem>
                  <MenuItem value={3}>Long</MenuItem>
                </Select>
              </FormControl>
            </MDBox>
            {/* <Checkbox
              checked={checked}
              label="Basic form?"
              onChange={() => {
                setChecked(!checked);
                console.log(seconds);
              }}
              inputProps={{ "aria-label": "controlled" }}
            /> */}

            <MDBox mt={2} mb={2}>
              <MDTypography
                variant="caption"
                fontWeight="bold"
                color="text"
                textTransform="uppercase"
              >
                Group Stage
              </MDTypography>
            </MDBox>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MDBox display="flex" justifyContent="space-between">
                <DateTimePicker
                  label="Start date&time"
                  value={groupSd}
                  onChange={(newValue) => setGroupSd(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                  label="End date&time"
                  pl={1}
                  value={groupEd}
                  onChange={(newValue) => setGroupEd(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </MDBox>
            </LocalizationProvider>
            <MDBox mt={2} mb={2}>
              <MDTypography
                variant="caption"
                fontWeight="bold"
                color="text"
                textTransform="uppercase"
              >
                Quarter-finals stage
              </MDTypography>
            </MDBox>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MDBox display="flex" justifyContent="space-between">
                <DateTimePicker
                  label="Start date&time"
                  value={quarterSd}
                  onChange={(newValue) => setQuarterSd(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                  label="End date&time"
                  pl={1}
                  value={quarterEd}
                  onChange={(newValue) => setQuarterEd(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </MDBox>
            </LocalizationProvider>
            <MDBox mt={2} mb={2}>
              <MDTypography
                variant="caption"
                fontWeight="bold"
                color="text"
                textTransform="uppercase"
              >
                Semifinals Qualification
              </MDTypography>
            </MDBox>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MDBox display="flex" justifyContent="space-between">
                <DateTimePicker
                  label="Start date&time"
                  value={qualificationSd}
                  onChange={(newValue) => setQualificationSd(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                  label="End date&time"
                  pl={1}
                  value={qualificationEd}
                  onChange={(newValue) => setQualificationEd(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </MDBox>
            </LocalizationProvider>
            <MDBox mt={2} mb={2}>
              <MDTypography
                variant="caption"
                fontWeight="bold"
                color="text"
                textTransform="uppercase"
              >
                Semifinals
              </MDTypography>
            </MDBox>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MDBox display="flex" justifyContent="space-between">
                <DateTimePicker
                  label="Start date&time"
                  value={semifinalSd}
                  onChange={(newValue) => setSemifinalSd(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                  label="End date&time"
                  pl={1}
                  value={semifinalEd}
                  onChange={(newValue) => setSemifinalEd(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </MDBox>
            </LocalizationProvider>
            <MDBox mt={2} mb={2}>
              <MDTypography
                variant="caption"
                fontWeight="bold"
                color="text"
                textTransform="uppercase"
              >
                Final stage
              </MDTypography>
            </MDBox>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MDBox display="flex" justifyContent="space-between">
                <DateTimePicker
                  label="Start date&time"
                  value={finalSd}
                  onChange={(newValue) => setFinalSd(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                  label="End date&time"
                  pl={1}
                  value={finalEd}
                  onChange={(newValue) => setFinalEd(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </MDBox>
            </LocalizationProvider>

            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                Add
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default AddTournament;
