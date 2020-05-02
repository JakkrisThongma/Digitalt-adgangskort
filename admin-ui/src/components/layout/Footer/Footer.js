import React from "react";
import { Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 40,
    backgroundColor: theme.palette.background.paper
  },
  item: {
    height: "100%",
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body1" className={classes.item}>
        <Link
          className={classes.item}
          color="secondary"
          href="https://www.innovasjonnorge.no/"
          target="_blank">
          Innovasjon Norge
        </Link>
        &copy; {new Date().getFullYear()}
      </Typography>
    </div>
  );
};

export default Footer;
