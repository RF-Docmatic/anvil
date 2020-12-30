import { rootReducer } from "../rootReducer";
import { InitialEpicActions } from "../../features/initial/types";

/** rootReducer */
export type RootState = ReturnType<typeof rootReducer>;

/** rootEpic */
export type EpicMiddleware = InitialEpicActions;
