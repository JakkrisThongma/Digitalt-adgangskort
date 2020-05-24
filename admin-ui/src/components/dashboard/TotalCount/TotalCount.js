import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  card: {
    color: theme.palette.secondary
  }
}));

const TotalCount = props => {
  const { title, total, icon } = props;
  const Icon = icon;

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2">
              {title}
            </Typography>
            <Typography variant="h3">{total}</Typography>
          </Grid>
          <Grid item>{icon && <Icon fontSize="large" />}</Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalCount.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  icon: PropTypes.object
};

TotalCount.defaultProps = {
  icon: {}
};

export default TotalCount;
