import { combineReducers } from "redux";

import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import commandBarReducer from "./commandBarReducer";
import themeReducer from "./themeReducer";

export const rootReducer = combineReducers({
  themeReducer,
  authReducer,
  commandBarReducer,
  alertReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
