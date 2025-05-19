import { createStore, combineReducers } from "redux";
import { themeReducer } from "./themeSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
});

const store = createStore(rootReducer);

export default store;
