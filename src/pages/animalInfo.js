import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// urls
import axios from "axios";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import Footer from "examples/Footer";
import AnimalBasicInfo from "examples/Competition/AnimalInfo";
import AnimalInfoHeader from "examples/Competition/AnimalInfoHeader";
import AnimalInfoFirstPartCard from "examples/Competition/AnimalInfoFirst";
import AnimalInfoOrder from "examples/Competition/AnimalInfoOrder";
// Overview page components

// Data

function AnimalInfo() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [animalsSameOrder, setAnimalsSameOrder] = useState([]);

  useEffect(() => {
    const getAnimal = async () => {
      const response1 = await axios.get(
        `https://animalsinthekingdom.herokuapp.com/animals/findAnimal/${id}`
      );
      const currAnimal = response1.data;
      setAnimal(currAnimal);

      const dataJSON = JSON.stringify({
        order: currAnimal.order_name,
        number: currAnimal.number,
      });

      const config = {
        method: "post",
        url: "https://animalsinthekingdom.herokuapp.com/animals/animalsSameOrder",
        headers: {
          "Content-Type": "application/json",
        },
        data: dataJSON,
      };
      const response2 = await axios(config);
      const currAnimals = response2.data;
      for (let i = 0; i < currAnimals.length; i += 1) {
        const curr = {
          animal: currAnimals[i],
          action: {
            type: "external",
            route: `/animalProfile/${currAnimals[i].number}`,
            color: "success",
            label: "View",
          },
        };

        currAnimals[i] = curr;
      }
      console.log(currAnimals);
      setAnimalsSameOrder(currAnimals);
    };

    getAnimal();
  }, []);
  /*
  useEffect(() => {
    axios
      .get(`https://animalsinthekingdom.herokuapp.com/animals/findAnimal/${id}`)
      .then((response) => {
        console.log(response);
        setAnimal(response.data);
        console.log(animal);
      })
      .catch((error) => {
        console.log(error);
      });
    setAnimalsSameOrder(null);
  }, []);
*/
  return (
    <DashboardLayout>
      <MDBox mb={2} />

      {animal !== null && (
        <AnimalInfoHeader animal={animal}>
          <MDBox mt={5} mb={3}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} xl={4}>
                <AnimalBasicInfo animal={animal} />
              </Grid>
              <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
                <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                <AnimalInfoFirstPartCard
                  title="About"
                  description={animal.description}
                  category={{
                    Kingdom: animal.kingdom,
                    Phylum: animal.phylum,
                    Class: animal.class_name,
                    Order: animal.order_name,
                    Family: animal.family,
                    Genus: animal.genus,
                    Species: animal.binomial_name,
                  }}
                  animal={animal}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
                <Divider orientation="vertical" sx={{ mx: 0 }} />
              </Grid>
              <Grid item xs={12} xl={4}>
                <AnimalInfoOrder
                  title="Animals in the same order"
                  animals={animalsSameOrder}
                  shadow={false}
                />
              </Grid>
            </Grid>
          </MDBox>
        </AnimalInfoHeader>
      )}

      <Footer />
    </DashboardLayout>
  );
}

export default AnimalInfo;
