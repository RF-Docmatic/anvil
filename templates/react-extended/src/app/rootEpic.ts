import { combineEpics } from "redux-observable";
import { RootState } from "./types";
import { createEpicMiddleware } from "redux-observable";
import { initialEpic } from "../features/initial/epics";
import { InitialEpicActions } from "../features/initial/types";

export const rootEpic = combineEpics(initialEpic);

type EpicMiddleware = InitialEpicActions;

export const epicMiddleware = createEpicMiddleware<EpicMiddleware, EpicMiddleware, RootState>();
