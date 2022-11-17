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
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// @mui material components
import { Link } from "react-router-dom";

function AnimalRow({ image, num, name, binomialName, active, stageType, activeTour }) {
  return (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {(active === 0 || stageType === 5 || activeTour === 0) && (
        <MDAvatar src={image} name={name} size="lg" component={Link} to={`/animalProfile/${num}`} />
      )}
      {active === 1 && stageType < 5 && activeTour === 1 && (
        <MDAvatar src="/animals/paw.jpeg" name={name} size="lg" component={Link} to="" />
      )}

      <MDBox ml={2} lineHeight={1}>
        {(active === 0 || stageType === 5 || activeTour === 0) && (
          <>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {name}
            </MDTypography>
            <MDTypography variant="button">{binomialName}</MDTypography>
          </>
        )}
        {active === 1 && stageType < 5 && activeTour === 1 && (
          <MDTypography
            display="block"
            variant="button"
            fontWeight="bold"
            pl={13}
            pr={7}
            style={{ fontSize: 15 }}
          >
            ?
          </MDTypography>
        )}
      </MDBox>
    </MDBox>
  );
}

AnimalRow.propTypes = {
  image: PropTypes.string.isRequired,
  num: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  binomialName: PropTypes.string.isRequired,
  stageType: PropTypes.number.isRequired,
  activeTour: PropTypes.number.isRequired,
};

export default AnimalRow;
