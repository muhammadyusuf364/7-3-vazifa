import { createStore } from "redux";
import appReduser from "./appReduser";

const store = createStore(appReduser);

export default store;
