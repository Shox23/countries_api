import { combineReducers } from "redux";
import { themeReducer } from "./theme/reducer";
import { countriesReducer } from "./countries/reducer";
import { controlsReducer } from "./controls/reducer";
import { detailsReducer } from "./details/reducer";

export const rootReducer = combineReducers({
  theme: themeReducer,
  controls: controlsReducer,
  countries: countriesReducer,
  details: detailsReducer
})