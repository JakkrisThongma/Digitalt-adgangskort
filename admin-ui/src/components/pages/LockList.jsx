import React, { useState } from "react";
import Lock from "@/components/lockList";
import { Grid } from "@material-ui/core";
import { MemoryRouter, Route } from "react-router";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

const LockList = () => {
  const locksList = [
    {
      title: "Lock1",
      active: true,
      date: "20.1.2020"
    },
    {
      title: "Lock2",
      active: false,
      date: "20.1.2020"
    },
    {
      title: "Lock3",
      active: true,
      date: "20.1.2020"
    }
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [locksPerPage] = useState(2);
  const totalLocks = locksList.length;
  const pageNumbers = Math.ceil(totalLocks / locksPerPage);
  // Get current posts
  const indexOfLastLock = currentPage * locksPerPage;
  const indexOfFirstLock = indexOfLastLock - locksPerPage;
  const currentLocks = locksList.slice(indexOfFirstLock, indexOfLastLock);

  return (
    <Grid container spacing={3}>
      {currentLocks.map(lock => (
        <Grid item md={4} xs={12}>
          <Lock title={lock.title} active={lock.active} date={lock.date} />
        </Grid>
      ))}

      <MemoryRouter initialEntries={["/locks"]} initialIndex={0}>
        <Route>
          {({ location }) => {
            const query = new URLSearchParams(location.search);
            const page = parseInt(query.get("page"), 10) || 1;
            console.log(location);
            return (
              <Pagination
                page={page}
                count={pageNumbers}
                renderItem={item => (
                  <PaginationItem
                    component={Link}
                    onClick={setCurrentPage(page)}
                    to={`/locks${item.page === 1 ? "" : `?page=${item.page}`}`}
                    {...item}
                  />
                )}
              />
            );
          }}
        </Route>
      </MemoryRouter>
    </Grid>
  );
};

export default LockList;
