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
import MDBox from "components/MDBox";

// @mui material components
import Chip from "@mui/material/Chip";
import styled from "@mui/styles/styled";

const StyledChip = styled(Chip)({
  background: "linear-gradient(45deg, #656565 30%, #555555 90%)",
  color: "white",
  padding: "0",
  fontSize: 15,
  fontWeight: "bold",
  width: "100%",
  border: "none",
});

function VotesRow({ points, votes, stageType, activeTour }) {
  return (
    <MDBox display="flex" justifyContent="center" alignItems="center" width="100%">
      {stageType < 5 && activeTour === 1 && (
        <StyledChip variant="outlined" color="success" label={`${votes} %`} />
      )}
      {(stageType === 5 || activeTour === 0) && (
        <StyledChip variant="outlined" color="success" label={points} />
      )}
    </MDBox>
  );
}

VotesRow.propTypes = {
  points: PropTypes.number.isRequired,
  votes: PropTypes.number.isRequired,
  stageType: PropTypes.number.isRequired,
  activeTour: PropTypes.number.isRequired,
};

export default VotesRow;
