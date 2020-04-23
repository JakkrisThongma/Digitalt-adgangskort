import React, { useEffect, useState } from "react";
import SmartLock from "@/components/smartLock";
import { Grid } from "@material-ui/core";
import { MemoryRouter, Route } from "react-router";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import useApiRequest from "../../reducers/useApiRequest";
import initialState from "../../store/initialState";
import { getSmartLocks } from "../../actions/smartLockActions";
import smartLockReducer from "../../reducers/smartLockReducer";

const SmartLockList = () => {
  const [state, dispatch] = useApiRequest(smartLockReducer, initialState);
  const { smartLocks, didInvalidate } = state;

  const [smartLockList, setSmartLockList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [locksPerPage] = useState(2);
  const totalLocks = smartLockList.length;
  const pageNumbers = Math.ceil(totalLocks / locksPerPage);
  const indexOfLastLock = currentPage * locksPerPage;
  const indexOfFirstLock = indexOfLastLock - locksPerPage;
  const currentLocks = smartLockList.slice(indexOfFirstLock, indexOfLastLock);

  useEffect(() => {
    dispatch(getSmartLocks);
  }, []);


  useEffect(() => {
    setSmartLockList(smartLocks);
    console.log(state);
  }, [smartLocks]);

  useEffect(() => {
    if (didInvalidate) {
      dispatch(getSmartLocks);
    }
  }, [didInvalidate]);

  return (
    <Grid container spacing={3}>
      {currentLocks.map(smartLock => (
        <Grid item md={4} xs={12} key={smartLock.id}>
          <SmartLock
            title={smartLock.title}
            description={smartLock.description}
            status={smartLock.status}
            manufactureId={smartLock.manufactureId}
            creationDate={smartLock.creationDate}
            lastModificationDate={smartLock.lastModificationDate}
          />
        </Grid>
      ))}

      <Grid item md={12} xs={12}>
        <MemoryRouter initialEntries={["/smart-locks"]} initialIndex={0}>
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
                      to={`/smart-locks${
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

export default SmartLockList;
