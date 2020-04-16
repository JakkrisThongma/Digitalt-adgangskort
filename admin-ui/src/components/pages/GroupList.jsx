import React, { useEffect, useState } from "react";
import Group from "@/components/group";
import { Grid } from "@material-ui/core";
import { MemoryRouter, Route } from "react-router";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import useApiRequest from "../../reducers/useApiRequest";
import initialState from "../../data/initialState";
import groupReducer from "../../reducers/groupReducer";
import { getGroups } from "../../actions/groupActions";

const GroupList = () => {
  const [accessGroups, setaAcessGroups] = useState([]);

  const [state, dispatch] = useApiRequest(groupReducer, initialState);
  const { groups, didInvalidate } = state;

  const [currentPage, setCurrentPage] = useState(1);
  const [groupsPerPage] = useState(2);
  const totalGroups = accessGroups.length;
  const pageNumbers = Math.ceil(totalGroups / groupsPerPage);
  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentLocks = accessGroups.slice(indexOfFirstGroup, indexOfLastGroup);

  useEffect(() => {
    dispatch(getGroups);
  }, []);

  useEffect(() => {
    setaAcessGroups(groups);
    console.log(state);
  }, [groups]);

  useEffect(() => {
    if (didInvalidate) {
      dispatch(getGroups);
    }
  }, [didInvalidate]);
  return (
    <Grid container spacing={3}>
      {currentLocks.map(group => (
        <Grid item md={4} xs={12} key={group.id}>
          <Group
            title={group.displayName}
            description={group.description}
            status={group.status}
            creationDate={group.creationDate}
            lastModificationDate={group.lastModificationDate}
          />
        </Grid>
      ))}

      <Grid item md={12} xs={12}>
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

export default GroupList;
