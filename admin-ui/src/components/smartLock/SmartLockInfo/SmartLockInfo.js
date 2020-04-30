import { Box, Typography } from "@material-ui/core";
import React from "react";
import helpers from "@/helpers";

const { dateParser } = helpers;

const SmartLockInfo = ({ smartLock }) => {
  return (
    <>
      <Box mr={2} mb={2} display="inline-block">
        <Typography display="inline" color="textSecondary">
          ID:
        </Typography>
      </Box>
      <Box mb={2} display="inline-block">
        <Typography display="inline">
          {smartLock ? smartLock.id : ""}
        </Typography>
      </Box>
      <br />

      <Box mr={2} mb={2} display="inline-block">
        <Typography display="inline" color="textSecondary">
          Manufacture ID:
        </Typography>
      </Box>
      <Box mb={2} display="inline-block">
        <Typography display="inline">
          {smartLock ? smartLock.manufactureId : ""}
        </Typography>
      </Box>
      <br />

      <Box mr={2} mb={2} display="inline-block">
        <Typography display="inline" color="textSecondary">
          Title:
        </Typography>
      </Box>
      <Box mb={2} display="inline-block">
        <Typography display="inline">
          {smartLock ? smartLock.title : ""}
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
          {smartLock ? smartLock.description : ""}
        </Typography>
      </Box>
      <br />

      <Box mr={2} mb={2} display="inline-block">
        <Typography display="inline" color="textSecondary">
          Status:
        </Typography>
      </Box>
      <Box mb={2} display="inline-block">
        <Typography display="inline">
          {smartLock ? smartLock.status : ""}
        </Typography>
      </Box>
      <br />

      <Box mr={2} mb={2} display="inline-block">
        <Typography display="inline" color="textSecondary">
          Created:
        </Typography>
      </Box>
      <Box mb={5} display="inline">
        <Typography display="inline">
          {smartLock ? dateParser(smartLock.creationDate) : ""}
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
          {smartLock ? dateParser(smartLock.lastModificationDate) : ""}
        </Typography>
      </Box>
      <br />
    </>
  );
};

export default SmartLockInfo;
