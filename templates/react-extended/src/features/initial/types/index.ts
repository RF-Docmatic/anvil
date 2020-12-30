import { initialActions } from "../slices";
import { ActionType } from "typesafe-actions";

/** InitialSlice */
export interface InitialScreen {
  isRandomFactFetching: boolean;
  randomFactText: string | null;
  randomFactSource: string | null;
  randomFactSourceUrl: string | null;
  error: string | null;
}

/** InitialEpic */
export type FetchRandomFactSourceActions =
  | typeof initialActions.fetchRandomFactStart
  | typeof initialActions.fetchRandomFactDone
  | typeof initialActions.fetchRandomFactFail;
export type FetchRandomFactAction = ActionType<FetchRandomFactSourceActions>;

export type InitialEpicActions = ActionType<FetchRandomFactSourceActions>;
