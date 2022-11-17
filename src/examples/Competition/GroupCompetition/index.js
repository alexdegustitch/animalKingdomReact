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
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DataTable from "examples/Tables/DataTable";

// Data

import AnimalRow from "../AnimalRow";
import VotesRow from "../VotesRow";
import GroupInfo from "../GroupInfo";

function CompetitionGroup({ tour, group, stageType, stageId }) {
  const [names, setNames] = useState([]);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [members, setMembers] = useState([]);
  const [activeTour, setActiveTour] = useState(1);

  useEffect(() => {
    const getNames = async () => {
      const responseTour = await axios.get(
        `https://animalsinthekingdom.herokuapp.com/tournaments/getTourById/${tour}`
      );
      setActiveTour(responseTour.data.active);
      const response = await axios.get(
        `https://animalsinthekingdom.herokuapp.com/groups/getGroupsForStageAndGroupNumber/stage=${stageId}&number=${group}`
      );
      const groups = response.data;
      let sumVotes = 0;
      const promises = [];
      for (let i = 0; i < groups.length; i += 1) {
        sumVotes += groups[i].points;
        promises.push(
          axios.get(`
          https://animalsinthekingdom.herokuapp.com/animals/findAnimal/${groups[i].animal}
          `)
        );
      }
      const animalNames = {};
      const results = await Promise.all(promises);

      for (let i = 0; i < results.length; i += 1) {
        animalNames[results[i].data.number] = {
          name: results[i].data.name,
          binomial_name: results[i].data.binomial_name,
        };
      }

      setNames(animalNames);

      /* const response2 = await axios.get(
        `https://animalsinthekingdom.herokuapp.com/groups/getGroupsForStageAndGroupNumber/stage=${stageId}&number=${group}`
      );
      const groups = response2.data; */
      const response3 = await axios.get(
        `https://animalsinthekingdom.herokuapp.com/groups/getGroupsForStageAndGroupNumberOrderByName/stage=${stageId}&number=${group}`
      );
      const membersData = response3.data;
      for (let i = 0; i < membersData.length; i += 1) {
        membersData[i].animal_name = animalNames[membersData[i].animal].name;
      }
      for (let i = 0; i < groups.length; i += 1) {
        groups[i].votes =
          groups[i].points === 0 ? 0 : Math.round((groups[i].points * 10000) / sumVotes) / 100;
        groups[i].name = animalNames[groups[i].animal].name;
        // membersData[i].animal_name = animalNames[membersData[i].animal].name;
        groups[i].binomial_name = animalNames[groups[i].animal].binomial_name;
        groups[i].status = "no pass";
        switch (parseInt(stageType, 10)) {
          case 1:
            if (i <= 3) groups[i].status = "pass";
            break;
          case 2:
            if (i <= 2) groups[i].status = "pass";
            else if (i <= 4) groups[i].status = "play-off";
            break;
          case 3:
            if (i <= 3) groups[i].status = "pass";
            break;
          case 4:
            if (i <= 3) groups[i].status = "pass";
            break;
          default:
            if (i === 0) groups[i].status = "winner";
            else if (i === 1) groups[i].status = "runner-up";
            else groups[i].status = "finalist";
        }
      }
      console.log(groups);
      setMembers(membersData);
      const { colsData, rowsData } = GroupInfo(
        groups,
        parseInt(stageType, 10),
        responseTour.data.active
      );
      // console.log("Najnovviji ispis", rowsData);
      // console.log(dataGroups);
      setRows(rowsData);
      setColumns(colsData);
    };
    getNames();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const getGroup = async () => {
        if (activeTour === 0) {
          clearInterval(intervalId);
          return;
        }
        const responseTour = await axios.get(
          `https://animalsinthekingdom.herokuapp.com/tournaments/getTourById/${tour}`
        );
        setActiveTour(responseTour.data.active);
        const response = await axios.get(
          `https://animalsinthekingdom.herokuapp.com/groups/getGroupsForStageAndGroupNumber/stage=${stageId}&number=${group}`
        );
        const groups = response.data;
        let sumVotes = 0;
        for (let i = 0; i < groups.length; i += 1) {
          sumVotes += groups[i].points;
        }
        // console.log(groups);
        let change = false;
        let changeMem = false;
        for (let i = 0; i < groups.length; i += 1) {
          if (groups[i].animal !== rows[i].info.animal) {
            console.log("Tu sam");
            change = true;
            rows[i].info = {
              points: groups[i].points,
              votes:
                groups[i].points === 0
                  ? 0
                  : Math.round((groups[i].points * 10000) / sumVotes) / 100,
              name: names[groups[i].animal].name,
              binomialName: names[groups[i].animal].name,
              animal: groups[i].animal,
              active: groups[i].active,
            };
            rows[i].animal = (
              <AnimalRow
                image={`/animals/animal${groups[i].animal}.jpeg`}
                num={groups[i].animal}
                name={names[groups[i].animal].name}
                binomialName={names[groups[i].animal].binomial_name}
                active={groups[i].active}
                stageType={parseInt(stageType, 10)}
                activeTour={responseTour.data.active}
              />
            );
            rows[i].votes = (
              <VotesRow
                points={groups[i].points}
                votes={rows[i].info.votes}
                stageType={parseInt(stageType, 10)}
                activeTour={responseTour.data.active}
              />
            );
          } else {
            if (groups[i].points !== rows[i].info.points || responseTour.data.active === 0) {
              console.log("Tu sam points");
              change = true;
              rows[i].info.points = groups[i].points;
              rows[i].info.votes =
                groups[i].points === 0
                  ? 0
                  : Math.round((groups[i].points * 10000) / sumVotes) / 100;
              rows[i].votes = (
                <VotesRow
                  points={groups[i].points}
                  votes={rows[i].info.votes}
                  stageType={parseInt(stageType, 10)}
                  activeTour={responseTour.data.active}
                />
              );
            }
            if (groups[i].active !== rows[i].info.active || responseTour.data.active === 0) {
              change = true;
              changeMem = true;
              rows[i].info.active = groups[i].active;
              rows[i].animal = (
                <AnimalRow
                  image={`/animals/animal${groups[i].animal}.jpeg`}
                  num={groups[i].animal}
                  name={names[groups[i].animal].name}
                  binomialName={names[groups[i].animal].binomial_name}
                  active={groups[i].active}
                  stageType={parseInt(stageType, 10)}
                  activeTour={responseTour.data.active}
                />
              );
            }
            rows[i].info.votes =
              groups[i].points === 0 ? 0 : Math.round((groups[i].points * 10000) / sumVotes) / 100;
            rows[i].votes = (
              <VotesRow
                points={groups[i].points}
                votes={rows[i].info.votes}
                stageType={parseInt(stageType, 10)}
                activeTour={responseTour.data.active}
              />
            );
          }
        }

        if (change) {
          const rowsChange = [...rows];
          console.log("Updated group ", group);
          // const { colsData, rowsData } = GroupInfo(groups);
          // console.log("dd", rowsChange, colsData, rowsData);
          // console.log("rows", rows, rowsChange);
          setRows(rowsChange);
        }
        if (changeMem) {
          const responseMem = await axios.get(
            `https://animalsinthekingdom.herokuapp.com/groups/getGroupsForStageAndGroupNumberOrderByName/stage=${stageId}&number=${group}`
          );
          const membersData = responseMem.data;
          for (let i = 0; i < membersData.length; i += 1) {
            membersData[i].animal_name = names[membersData[i].animal].name;
          }
          setMembers(membersData);
        }
      };
      getGroup();
    }, 1000);

    return () => clearInterval(intervalId);
    // This is important
  }, [rows, members]);

  return (
    <Grid item xs={6}>
      <Card>
        <MDBox
          mx={2}
          mt={-3}
          py={3}
          px={2}
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
        >
          <MDTypography variant="h6" color="white">
            Group {group}
            {members.length > 0 && stageType < 5 && (
              <MDBox display="flex" pt={3}>
                {members.map((member) => (
                  <Tooltip key={member.animal} title={member.animal_name} placeholder="bottom">
                    <MDAvatar
                      src={`/animals/animal${member.animal}.jpeg`}
                      alt="name"
                      size="lg"
                      style={{ background: "#010101" }}
                      sx={{
                        border: ({ borders: { borderWidth }, palette: { white } }) =>
                          `${borderWidth[2]} solid ${white.main}`,
                        cursor: "pointer",
                        position: "relative",

                        "&:not(:first-of-type)": {
                          ml: -1.25,
                        },

                        "&:hover, &:focus": {
                          zIndex: "10",
                        },
                      }}
                      component={Link}
                      to={`/animalProfile/${member.animal}`}
                    />
                  </Tooltip>
                ))}
              </MDBox>
            )}
          </MDTypography>
        </MDBox>

        <MDBox pt={3}>
          <DataTable
            table={{ columns, rows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
          />
        </MDBox>
      </Card>
    </Grid>
  );
}

CompetitionGroup.propTypes = {
  tour: PropTypes.number.isRequired,
  group: PropTypes.node.isRequired,
  stageType: PropTypes.number.isRequired,
  stageId: PropTypes.number.isRequired,
};

export default CompetitionGroup;
