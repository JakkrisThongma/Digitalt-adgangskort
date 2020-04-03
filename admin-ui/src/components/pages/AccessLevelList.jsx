import React, { useState } from "react";
import AccessGroup from "@/components/accessGroups";
import { Grid } from "@material-ui/core";
import { MemoryRouter, Route } from "react-router";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

const AccessLevelList = () => {
  const accessGroups = [
    {
      title: "Group 1",
      totalMembers: 10,
      totalLocks: 2
    },
    {
      title: "Group 2",
      totalMembers: 30,
      totalLocks: 5
    },
    {
      title: "Group 3",
      totalMembers: 5,
      totalLocks: 1
    }
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [groupsPerPage] = useState(2);
  const totalGroups = accessGroups.length;
  const pageNumbers = Math.ceil(totalGroups / groupsPerPage);
  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentLocks = accessGroups.slice(indexOfFirstGroup, indexOfLastGroup);

  return (
    <Grid container spacing={3}>
      {currentLocks.map(group => (
        <Grid item md={4} xs={12}>
          <AccessGroup
            title={group.title}
            totalMembers={group.totalMembers}
            totalLocks={group.totalLocks}
          />
        </Grid>
      ))}

      <Grid item md={12} xs={12} justifyContent="center" alignSelf="flex-end">
        <MemoryRouter initialEntries={["/groups"]} initialIndex={0}>
          <Route>
            {({ location }) => {
              const query = new URLSearchParams(location.search);
              const page = parseInt(query.get("page"), 10) || 1;
              return (
                <Pagination
                  page={page}
                  count={pageNumbers}
                  renderItem={item => (
                    <PaginationItem
                      component={Link}
                      onClick={setCurrentPage(page)}
                      to={`/groups${
                        item.page === 1 ? "" : `?page=${item.page}`
                      }`}
                      {...item}
                    />
                  )}
                />
              );
            }}
          </Route>
        </MemoryRouter>
      </Grid>
    </Grid>
  );
};

export default AccessLevelList;
