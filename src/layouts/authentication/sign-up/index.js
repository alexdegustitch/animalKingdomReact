/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================
-gde zive
-period inkubacije malih
-populacija
-ugrozenost

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";
import { RadioGroup, FormControlLabel, Radio, FormLabel, Typography } from "@mui/material";
import { useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// axious
import axios from "axios";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// icons
import UploadFileIcon from "@mui/icons-material/UploadFile";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {
  const [name, setName] = useState("");
  const [binomialName, setBinomialName] = useState("");
  const [description, setDescription] = useState("");
  const [lifespan, setLifespan] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [calvesNumber, setCalvesNumber] = useState("");
  const [population, setPopulation] = useState("");
  const [speed, setSpeed] = useState("");
  const [kingdom, setKingdom] = useState("");
  const [phylum, setPhylum] = useState("");
  const [className, setClassName] = useState("");
  const [orderName, setOrderName] = useState("");
  const [family, setFamily] = useState("");
  const [genus, setGenus] = useState("");
  const [habitat, setHabitat] = useState("");
  const [conservationStatus, setConservationStatus] = useState("");
  const [territory, setTerritory] = useState("");
  const [babyName, setBabyName] = useState("");
  const [number, setNumber] = useState(1);
  const [gestationPeriod, setGestationPeriod] = useState("");
  const [trophicLevel, setTrophicLevel] = useState(1);
  const [fileName, setFileName] = useState("");
  const [color, setColor] = useState("");
  const [temperament, setTemperament] = useState("");
  const [activity, setActivity] = useState("");

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    setFileName(file);
    console.log(fileName);
  };

  const handleAddAnimal = () => {
    console.log("tu sam");

    if (
      name === "" ||
      binomialName === "" ||
      description === "" ||
      weight === "" ||
      lifespan === "" ||
      size === "" ||
      speed === "" ||
      calvesNumber === "" ||
      trophicLevel === "" ||
      gestationPeriod === "" ||
      temperament === "" ||
      activity === "" ||
      color === "" ||
      kingdom === "" ||
      phylum === "" ||
      className === "" ||
      orderName === "" ||
      family === "" ||
      genus === "" ||
      habitat === "" ||
      population === "" ||
      conservationStatus === "" ||
      territory === "" ||
      number === "" ||
      babyName === ""
    ) {
      console.log("Problem");
      return;
    }
    console.log("HEJ");
    const jsonData = JSON.stringify({
      name,
      binomial_name: binomialName,
      description,
      weight,
      lifespan,
      size,
      color,
      temperament,
      activity,
      speed,
      calves_number: calvesNumber,
      trophic_level: trophicLevel,
      gestation_period: gestationPeriod,
      kingdom,
      phylum,
      class_name: className,
      order_name: orderName,
      family,
      genus,
      habitat,
      population,
      conservation_status: conservationStatus,
      territory,
      number,
      baby_name: babyName,
    });
    console.log(jsonData);
    const config = {
      method: "post",
      url: "https://animalsinthekingdom.herokuapp.com/animals/addAnimal",
      headers: {
        "Content-Type": "application/json",
      },
      data: jsonData,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        window.open(`https://animalsinthekingdom.herokuapp.com:3000/animalProfile/${number}`, "_self");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Add new animal
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            All inputs are required
          </MDTypography>
        </MDBox>

        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={name}
                label="Name"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setName(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={binomialName}
                label="Binomial name"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setBinomialName(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={description}
                label="Description"
                variant="standard"
                multiline
                rows={5}
                fullWidth
                required
                onInput={(e) => setDescription(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={lifespan}
                label="Lifespan"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setLifespan(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={weight}
                label="Weight"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setWeight(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={size}
                label="Lenght/height"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setSize(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={color}
                label="Color"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setColor(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={temperament}
                label="Temperament"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setTemperament(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={activity}
                label="Activity"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setActivity(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={speed}
                label="Speed"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setSpeed(e.target.value)}
              />
            </MDBox>
            <FormLabel id="demo-row-radio-buttons-group-label">
              <Typography variant="body2" color="textSecondary">
                Trophic level
              </Typography>
            </FormLabel>

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              mb={2}
              value={trophicLevel}
              required
              onChange={(e) => setTrophicLevel(e.target.value)}
            >
              <FormControlLabel
                value={1}
                control={<Radio />}
                label={
                  <Typography display="inline" fontSize={14} color="textSecondary">
                    Herbivore
                  </Typography>
                }
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label={
                  <Typography display="inline" fontSize={14} color="textSecondary">
                    Carnivore
                  </Typography>
                }
              />
              <FormControlLabel
                value={3}
                control={<Radio />}
                label={
                  <Typography display="inline" fontSize={14} color="textSecondary">
                    Omnivore
                  </Typography>
                }
              />
            </RadioGroup>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={kingdom}
                label="Kingdom"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setKingdom(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={phylum}
                label="Phylum"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setPhylum(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={className}
                label="Class"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setClassName(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={orderName}
                label="Order"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setOrderName(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={family}
                label="Family"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setFamily(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={genus}
                label="Genus"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setGenus(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={calvesNumber}
                label="Number of calves"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setCalvesNumber(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={population}
                label="Population"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setPopulation(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={habitat}
                label="Habitat"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setHabitat(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={territory}
                label="Territory"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setTerritory(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={conservationStatus}
                label="Conservation status"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setConservationStatus(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={gestationPeriod}
                label="Gestation period"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setGestationPeriod(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={babyName}
                label="Baby name"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setBabyName(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={number}
                label="Number"
                variant="standard"
                fullWidth
                required
                onInput={(e) => setNumber(e.target.value)}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton component="label" variant="gradient" startIcon={<UploadFileIcon />}>
                Upload image
                <input type="file" accept=".jpeg" hidden onChange={handleFileUpload} />
              </MDButton>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                type="submit"
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleAddAnimal}
              >
                Add
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
