import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  card: {
    color: theme.palette.secondary
  }
}));

const TotalCount = props => {
  const { title, total, iconTitle } = props;
  const [IconComponent, setIconComponent] = useState(null);

  switch (iconTitle) {
    case "People":
      import("@material-ui/icons/People").then(peopleIcon => {
        setIconComponent(peopleIcon.default);
      });
      break;
    case "Lock":
      import("@material-ui/icons/Lock").then(lockIcon => {
        setIconComponent(lockIcon.default);
      });
      break;
    case "AccountTree":
      import("@material-ui/icons/AccountTree").then(accountTreeIcon => {
        setIconComponent(accountTreeIcon.default);
      });
      break;
    default:
      break;
  }
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
          <Grid item>
            {IconComponent && <IconComponent fontSize="large" />}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalCount.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  iconTitle: PropTypes.string
};

TotalCount.defaultProps = {
  iconTitle: ""
};

export default TotalCount;
