import axios from "axios";

const API = axios.create({
    // baseURL: "https://stream-gift-production.up.railway.app/",
    baseURL: process.env.SERVER_URL,
});
// const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchNotipin = () => API.get("/notipin");
export const createNotipin = (newNotipin) => API.post("/notipin", newNotipin);

export const fetchVideoni = () => API.get("/videoni");
export const createVideoni = (newVideoni) => API.post("/videoni", newVideoni);

export const fetchStreamer = () => API.get("/streamer");
export const createStreamer = (newStreamer) =>
    API.post("/streamer", newStreamer);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
