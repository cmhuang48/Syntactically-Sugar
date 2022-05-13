import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container"
import Link from "@material-ui/core/Link";

export default function Copyright() {
  return (
    <Container style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://syntactically-sugar.herokuapp.com/home">
          Syntactically Sugar
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
};
