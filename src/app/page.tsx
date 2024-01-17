"use client";

// Import necessary modules and components
import axios from "axios";
import * as React from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import styles from "./page.module.css";

// Define interfaces
interface Pokemon {
  urlImage: string;
}

interface SinglePokemonResponse {
  data: string;
}

// Define the Home component
export default function Home() {
  // State to hold the Pokemon data
  const [pokemon, setPokemon] = React.useState<Pokemon | null>(null);

  // Function to fetch Pokemon data from the server
  const fetchPokemon = async () => {
    console.log("Fetching Pokemon");
    try {
      const res = await axios.get<SinglePokemonResponse>(
        `https://felis.panurut.dev/cat/image`
      );
      console.log("Response data:", res.data);

      return {
        urlImage: res.data.data,
      };
    } catch (e) {
      console.error("Error fetching Pokemon:", e);
      return null;
    }
  };

  // Function to handle the button click and change the image
  const handleChangeImage = () => {
    fetchPokemon().then((p) => setPokemon(p));
  };

  // Effect to fetch Pokemon data when the component mounts
  React.useEffect(() => {
    console.log("Effect triggered");
    fetchPokemon().then((p) => setPokemon(p));
  }, []);

  // JSX structure with Material-UI Button
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        {pokemon && (
          <div className={styles.imageContainer}>
            <Image
              src={pokemon.urlImage}
              alt="Pokemon Image"
              width={600}
              height={600}
              priority
            />
          </div>
        )}
      </div>
      <div className={styles.bottomButton}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleChangeImage}
          style={{ marginTop: "10px" }} // Adjust the marginTop as needed
        >
          Change Image
        </Button>
      </div>
    </main>
  );
}
