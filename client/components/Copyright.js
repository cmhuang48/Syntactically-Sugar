import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container"
import Link from "@material-ui/core/Link";

export default function Copyright() {
  return (
    <Container style={{position:'fixed', bottom:'0', width: '100%'}}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Syntactically Sugar
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
}
