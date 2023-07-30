import axios from "axios";

const fetchUsers = () => {
  return axios.get("https://reqres.in/api/users?page=1");
};

export { fetchUsers };
