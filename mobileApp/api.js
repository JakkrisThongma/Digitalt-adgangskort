import http from "./http";

export function getCurrentUserApi(headers) {
  return http({
    method: "GET",
    url: "users/current",
    headers: headers
  }).then(res => Promise.resolve(res.data));
}

export function accessRequestApi(data, headers) {
  return http({
    method: "POST",
    url: "accesses",
    headers: headers,
    data
  }).then(res => Promise.resolve(res.data));
}
