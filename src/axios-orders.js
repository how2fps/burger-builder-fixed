import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-5c7f9-default-rtdb.firebaseio.com/",
});

export default instance;
