import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Types() {
  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <Typography variant="h3" gutterBottom style={{ textAlign: "center" }}>
        F E L I S
      </Typography>
      <Typography variant="body1" gutterBottom>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Felis</b> (Latin for <i>cat</i>) was a
          constellation created by French astronomer Jérôme Lalande in 1799. It
          was between the constellations of Antlia and Hydra.
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is now obsolete Its brightest star,
          &nbsp;<b>HD 85951</b>, was named Felis by the International Astronomical Union on 1
          June 2018 and it is now so included in the List of IAU-approved Star
          Names.
        </p>
      </Typography>
    </Box>
  );
}
