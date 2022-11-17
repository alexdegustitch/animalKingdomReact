/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import MDBadge from "components/MDBadge";

import AnimalRow from "../AnimalRow";
import VotesRow from "../VotesRow";

export default function data(groups, stage, activeTour) {
  console.log("stage", stage);
  const rowsData = groups.map((group) => ({
    animal: (
      <AnimalRow
        image={`/animals/animal${group.animal}.jpeg`}
        num={group.animal}
        name={group.name}
        binomialName={group.binomial_name}
        active={group.active}
        stageType={stage}
        activeTour={activeTour}
      />
    ),
    votes: (
      <VotesRow
        points={group.points}
        votes={group.votes}
        stageType={stage}
        activeTour={activeTour}
      />
    ),
    status: (
      <MDBox ml={-1}>
        {group.status === "pass" && (
          <MDBadge badgeContent={group.status} color="success" variant="gradient" size="sm" />
        )}
        {group.status === "no pass" && (
          <MDBadge badgeContent={group.status} color="error" variant="gradient" size="sm" />
        )}
        {group.status === "winner" && (
          <MDBadge badgeContent={group.status} color="success" variant="gradient" size="sm" />
        )}
        {group.status === "runner-up" && (
          <MDBadge badgeContent={group.status} color="warning" variant="gradient" size="sm" />
        )}
        {group.status === "play-off" && (
          <MDBadge badgeContent={group.status} color="warning" variant="gradient" size="sm" />
        )}
        {group.status === "finalist" && (
          <MDBadge badgeContent={group.status} color="dark" variant="gradient" size="sm" />
        )}
      </MDBox>
    ),
    info: {
      points: group.points,
      name: group.name,
      binomialName: group.binomial_name,
      animal: group.animal,
      votes: group.votes,
      active: group.active,
    },
  }));

  return {
    colsData: [
      { Header: "animal", accessor: "animal", width: "70%", align: "left" },
      { Header: "votes", accessor: "votes", align: "right" },
      { Header: "status", accessor: "status", align: "center" },
    ],

    rowsData,
  };
}
