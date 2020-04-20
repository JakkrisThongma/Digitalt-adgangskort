import http from "./http";

export function getCurrentUser(headers) {
  return http({
    method: "GET",
    url: "users/current",
    headers: headers
  }).then(res => Promise.resolve(res.data));
  
}

/*



*/