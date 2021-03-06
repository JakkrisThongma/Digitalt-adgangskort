import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

const DialogActions = props => {
  const { actions } = props;
  return (
    <>
      {actions.map(action => (
        <Button
          key={action.title}
          onClick={action.onClick}
          type={action.type}
          color="primary">
          {action.title}
        </Button>
      ))}
    </>
  );
};

DialogActions.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      type: PropTypes.string,
      onClick: PropTypes.func
    }).isRequired
  )
};

DialogActions.defaultProps = {
  actions: []
};

export default DialogActions;
