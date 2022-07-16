import { combineReducers } from "redux";

import notipin from "./notipin";
import videoni from "./videoni";
import auth from "./auth";
import streamer from "./streamer";

export default combineReducers({ notipin, auth, videoni, streamer });
