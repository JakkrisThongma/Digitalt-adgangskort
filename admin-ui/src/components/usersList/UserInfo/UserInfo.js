import { Box, Typography } from "@material-ui/core";
import React from "react";
import helpers from "@/helpers";

const { dateParser } = helpers;

const UserInfo = ({user}) => {
  return (
    <>
      <Box mr={2} mb={2} display="inline-block">
        <Typography display="inline" color="textSecondary">
          ID:
        </Typography>
      </Box>
      <Box mb={2} display="inline-block">
        <Typography display="inline">{user ? user.id : ""}</Typography>
      </Box>
      <br />

      <Box mr={2} mb={2} display="inline-block">
        <Typography display="inline" color="textSecondary">
          Display name:
        </Typography>
      </Box>
      <Box mb={2} display="inline-block">
        <Typography display="inline">
          {user ? user.displayName : ""}
        </Typography>
      </Box>
      <br />

      <Box mr={2} mb={2} display="inline-block">
        <Typography display="inline" color="textSecondary">
          Status:
        </Typography>
      </Box>
      <Box mb={2} display="inline-block">
        <Typography display="inline">{user ? user.status : ""}</Typography>
      </Box>
      <br />

      <Box mr={2} mb={2} display="inline-block">
        <Typography display="inline" color="textSecondary">
          Created:
        </Typography>
      </Box>
      <Box mb={5} display="inline">
        <Typography display="inline">
          {user ? dateParser(user.creationDate) : ""}
        </Typography>
      </Box>
      <br />
      <Box mr={2} mb={5} display="inline">
        <Typography display="inline" color="textSecondary">
          Last modified:
        </Typography>
      </Box>
      <Box mb={5} display="inline">
        <Typography display="inline">
          {user ? dateParser(user.lastModificationDate) : ""}
        </Typography>
      </Box>
      <br />
    </>
  );
};


export default UserInfo;