// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sticky-footer/StickyFooter.js

import React from "react";
import { Container, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(2),
    marginTop: "auto",
    backgroundColor: "white"
  }
}));

function Copyright() {
  return (
    <Typography align="center" variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="https://www.innovasjonnorge.no//">
        Innovation Norway
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Copyright />
      </Container>
    </footer>
  );
};

export default Footer;
