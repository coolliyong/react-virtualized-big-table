import request from "../utils/request";

export default {
  pageList: params => {
    return request(`/api/users/list/${params.num}/${params.size}`);
  },
  query: () => {
    return request("/api/users");
  }
};
