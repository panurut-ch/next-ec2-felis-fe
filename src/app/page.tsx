"use client";

// Import necessary modules and components
import axios from "axios";
import * as React from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import styles from "./page.module.css";
import Type from "./header";

// Define interfaces
interface Cat {
  urlImage: string;
}

interface SingleCatResponse {
  data: string;
}

// Define the Home component
export default function Home() {
  // State to hold the Pokemon data
  const [cat, setCat] = React.useState<Cat | null>(null);

  // Function to fetch Pokemon data from the server
  const fetchCat = async () => {
    console.log("Fetching Cat");
    try {
      const res = await axios.get<SingleCatResponse>(
        `https://api.panurut.dev/cat/image`
      );
      console.log("Response data:", res.data);

      return {
        urlImage: res.data.data,
      };
    } catch (e) {
      console.error("Error fetching Cat:", e);
      return null;
    }
  };

  // Function to handle the button click and change the image
  const handleChangeImage = () => {
    fetchCat().then((p) => setCat(p));
  };

  // Effect to fetch Pokemon data when the component mounts
  React.useEffect(() => {
    console.log("Effect triggered");
    fetchCat().then((p) => setCat(p));
  }, []);

  // JSX structure with Material-UI Button
  return (
    <main className={styles.main}>
      <div>
        <Type />
      </div>
      <div className={styles.center}>
        {cat && (
          <div className={styles.imageContainer}>
            <Image
              src={cat.urlImage}
              alt="Cat Image"
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
