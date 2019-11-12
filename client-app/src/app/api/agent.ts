import { history } from "./../../index";
import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/activity";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(undefined, error => {
  if (error.messaeg === "Network Error" && !error.response) {
    // in case of network error, i.e. could not reach the server
    toast.error("Network error - make aure API is running!");
  }
  const { status, data, config } = error.response; // destruct error.response
  if (status === 404) {
    history.push("/notfound");
  } else if (
    // this is for when we navigate to get: activities/<invalid-id>
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  } else if (status === 500) {
    toast.error("Server Error - check terminal for more info!");
  }
});

// curry opration.
const sleep = (ms: number) => (response: AxiosResponse) => {
  return new Promise<AxiosResponse>(resolve =>
    setTimeout(() => resolve(response), ms)
  );
};

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(sleep(1000))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(sleep(1000))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(sleep(1000))
      .then(responseBody),
  del: (url: string) =>
    axios
      .delete(url)
      .then(sleep(1000))
      .then(responseBody)
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get("/activities"),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post("/activities", activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`)
};

export default {
  Activities
};
