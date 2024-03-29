import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import axios from "axios";
import styles from "@/app/page.module.css";
import Button from "@mui/material/Button";
import Image from "next/image";
import { styled, useTheme } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";

const BoldLabel = styled("span")({
  fontWeight: "bold",
});

interface Cat {
  name: string;
  urlImage: string;
  temperament: string;
  origin: string;
  description: string;
  width: number; // New property for adjusted width
  height: number; // New property for adjusted height
}

interface SingleCatResponse {
  data: {
    catWidth: number;
    catHeight: number;
    catImageUrl: string;
    catName: string;
    catTemperament: string;
    catOrigin: string;
    catDescription: string;
  }[];
}

const style = {
  p: 0,
  width: "100%",
  maxWidth: 620,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "grey",
  color: "white",
  backgroundColor: "black",
  "& li": {
    color: "inherit",
    borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
  },
  // Responsive styles based on screen size
  "@media (max-width: 430px)": {
    maxWidth: "90vw !important", // Adjusted for viewport width
    "& li": {
      // Increase specificity for list items in the media query
      color: "inherit !important",
      borderBottom: "1px solid rgba(255, 255, 255, 0.12) !important",
    },
  },
};

export default function Detail() {
  const [cat, setCat] = React.useState<Cat | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const FELIS_API = process.env.NEXT_PUBLIC_FELIS_API;
  console.log("FELIS_API", FELIS_API);

  const fetchCat = async () => {
    console.log("Fetching Cat");
    setLoading(true);
    try {
      const res = await axios.get<SingleCatResponse>(`${FELIS_API}/cat/detail`);

      console.log("Response data Detail:", res.data);

      const catData = res.data?.data;
      console.log("catData", catData);

      if (catData) {
        const originalWidth = (catData as any).catWidth;
        const originalHeight = (catData as any).catHeight;
        const catImageUrl = (catData as any).catImageUrl;
        const catName = (catData as any).catName;
        const catTemperament = (catData as any).catTemperament;
        const catOrigin = (catData as any).catOrigin;
        const catDescription = (catData as any).catDescription;

        const maxWidth = 600;

        // Calculate adjusted dimensions
        const newWidth = Math.min(originalWidth, maxWidth);
        const newHeight = (newWidth / originalWidth) * originalHeight;

        return {
          urlImage: catImageUrl,
          name: catName || "Unknown Name",
          temperament: catTemperament || "Unknown Temperament",
          origin: catOrigin || "Unknown Origin",
          description: catDescription || "No description available",
          width: newWidth,
          height: newHeight,
        };
      } else {
        console.error("Error fetching Cat: Breed data not found");
        return null;
      }
    } catch (e) {
      console.error("Error fetching Cat:", e);
      return null;
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const handleChangeImage = () => {
    fetchCat().then((p) => setCat(p));
  };

  React.useEffect(() => {
    console.log("Effect triggered");
    fetchCat().then((p) => setCat(p));
  }, []);

  return (
    <>
      <div className={styles.center}>
        {loading && (
          <div className={styles.loader}>
            <CircularProgress />
          </div>
        )}
        {!loading && cat && (
          <div className={styles.imageContainer}>
            <Image
              src={cat.urlImage}
              alt="Cat Image"
              width={cat.width}
              height={cat.height}
              priority
            />
          </div>
        )}
      </div>
      {cat && (
        <div className={styles.center}>
          <List sx={style} aria-label="mailbox folders">
            {cat && (
              <>
                <ListItem>
                  <ListItemText primary={`${cat.name}`} />
                </ListItem>
                <Divider component="li" light />
                <ListItem>
                  <ListItemText primary={`${cat.origin}`} />
                </ListItem>
                <Divider component="li" light />
                <ListItem>
                  <ListItemText primary={`${cat.temperament}`} />
                </ListItem>
                <Divider component="li" light />
                <ListItem>
                  <ListItemText primary={`${cat.description}`} />
                </ListItem>
                <Divider component="li" light />
              </>
            )}
          </List>
        </div>
      )}
      <div className={styles.center}>
        <div className={styles.bottomButton}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangeImage}
            style={{ marginTop: "2px" }}
          >
            Random Meow ~
          </Button>
        </div>
      </div>
    </>
  );
}
