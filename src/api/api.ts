// src/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://kevinlepiten.com/blog/wp-json/wc/v3/",
  auth: {
    username: "ck_a957e870d25fdbafa63f68bcbdf1b0ba1395abef",
    password: "cs_9b339f215cc841051bc7261ddfda8ce2d63277ca",
  },
});

export default api;
