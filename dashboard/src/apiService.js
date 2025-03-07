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
  engagedFilter,
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
  if (engagedFilter != null) {
    queryParams.append("engaged", engagedFilter);
  }
  if (sortColumn != null) {
    queryParams.append("sortBy", sortColumn);
    if (sortOrder != null) {
      queryParams.append("sortOrder", sortOrder);
    }
  }
  console.log("get_leads", queryParams, queryParams.toString());
  const repsonse = await api.get(`leads?${queryParams.toString()}`);
  return repsonse.data;
};

export const export_all_leads = async () => {
  const response = await api.get("export_leads/", { responseType: "blob" });
  return response.data;
};

export const add_lead = async (name, email, company, stage) => {
  const response = await api.post("lead", {
    name: name,
    email: email,
    company: company,
    stage: stage,
  });
  return response.data;
};

export const delete_lead = async (lead_id) => {
  const response = await api.delete(`delete_lead/${lead_id}`);
  return response.data;
};

export const update_lead = async (lead_id, params) => {
  console.log("update params", params);
  const response = await api.patch(`update_lead/${lead_id}`, { ...params });
  return response.data;
};
