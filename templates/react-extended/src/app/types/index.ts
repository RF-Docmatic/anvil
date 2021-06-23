import { Observable } from "rxjs/index";
import { AjaxResponse } from "rxjs/ajax";
import { rootReducer } from "../rootReducer";
import { InitialEpicActions } from "../../features/initial/types";

/** rootReducer */
export type RootState = ReturnType<typeof rootReducer>;

/** rootEpic */
export type EpicMiddleware = InitialEpicActions;

/** api */
export type ResponseType = XMLHttpRequest["responseType"];

export type ApiBodyCall = (
  endpoint: string,
  body?: Record<string, unknown>,
  headers?: Record<string, unknown>,
) => Observable<AjaxResponse>;

export type ApiBodylessCall = (
  endpoint: string,
  headers?: Record<string, unknown>,
  responseType?: ResponseType,
) => Observable<AjaxResponse>;

export interface ApiAjaxCreationMethod {
  (
    endpoint: string,
    method: string,
    body?: Record<string, unknown>,
    headers?: Record<string, unknown>,
    responseType?: ResponseType,
  ): Observable<AjaxResponse>;
  get: ApiBodylessCall;
  post: ApiBodyCall;
  put: ApiBodyCall;
  patch: ApiBodyCall;
  delete: ApiBodylessCall;
}
