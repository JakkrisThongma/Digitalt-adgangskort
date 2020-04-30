import { Box, Typography } from "@material-ui/core";
import React from "react";
import helpers from "@/helpers";

const { dateParser } = helpers;
const GroupInfo = ({ group }) => {
  return (
    <>
      <Box mr={2} mb={2} display="inline-block">
        <Typography display="inline" color="textSecondary">
          ID:
        </Typography>
      </Box>
      <Box mb={2} display="inline-block">
        <Typography display="inline">{group ? group.id : ""}</Typography>
      </Box>
      <br />

      <Box mr={2} mb={2} display="inline-block">
        <Typography display="inline" color="textSecondary">
          Display name:
        </Typography>
      </Box>
      <Box mb={2} display="inline-block">
        <Typography display="inline">
          {group ? group.displayName : ""}
        </Typography>
      </Box>
      <br />

      <Box mr={2} mb={2} display="inline-block">
        <Typography display="inline" color="textSecondary">
          Description:
        </Typography>
      </Box>
      <Box mb={2} display="inline-block">
        <Typography display="inline">
          {group ? group.description : ""}
        </Typography>
      </Box>
      <br />

      <Box mr={2} mb={2} display="inline-block">
        <Typography display="inline" color="textSecondary">
          Status:
        </Typography>
      </Box>
      <Box mb={2} display="inline-block">
        <Typography display="inline">{group ? group.status : ""}</Typography>
      </Box>
      <br />

      <Box mr={2} mb={2} display="inline-block">
        <Typography display="inline" color="textSecondary">
          Created:
        </Typography>
      </Box>
      <Box mb={5} display="inline">
        <Typography display="inline">
          {group ? dateParser(group.creationDate) : ""}
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
          {group ? dateParser(group.lastModificationDate) : ""}
        </Typography>
      </Box>
      <br />
    </>
  );
};

export default GroupInfo;
