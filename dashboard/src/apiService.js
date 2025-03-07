import axios from "axios";

const get_base_url = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
  return BASE_URL[-1] === "/" ? BASE_URL : BASE_URL + "/";
};

const api = axios.create({
  baseURL: get_base_url(),
  headers: {
    "Content-Type": "application/json",
  },
});

export const get_leads = async (
  start,
  pageSize,
  searchQuery,
  sortColumn,
  sortOrder
) => {
  const queryParams = new URLSearchParams({
    start: start,
    limit: pageSize,
  });
  if (searchQuery != null) {
    queryParams.append("searchQuery", searchQuery);
  }
  if (sortColumn != null) {
    queryParams.append("sortColumn", sortColumn);
    if (sortOrder != null) {
      queryParams.append("sortOrder", sortOrder);
    }
  }
  console.log("get_leads", queryParams, queryParams.toString());
  const repsonse = await api.get(`leads/?${queryParams.toString()}`);
  return repsonse.data;
};
