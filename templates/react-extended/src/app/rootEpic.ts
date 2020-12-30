import { combineEpics } from "redux-observable";
import { RootState } from "./types";
import { createEpicMiddleware } from "redux-observable";
import { initialEpic } from "../features/initial/epics";
import { EpicMiddleware } from "./types";

export const rootEpic = combineEpics(initialEpic);

export const epicMiddleware = createEpicMiddleware<EpicMiddleware, EpicMiddleware, RootState>();
