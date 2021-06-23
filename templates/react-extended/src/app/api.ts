import { ajax } from "rxjs/ajax";
import { StateObservable } from "redux-observable";
import { RootState, ApiAjaxCreationMethod, ResponseType } from "./types";

export const apiUrl = process.env.REACT_APP_API_URL || "/api";

export const api = <T extends StateObservable<RootState> | RootState = StateObservable<RootState>>(
  state$: T,
  accessToken?: string,
): ApiAjaxCreationMethod => {
  const commonHeaders = {
    Accept: "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const ajaxCall = function (
    endpoint: string,
    method = "GET",
    body?: Record<string, unknown>,
    headers?: Record<string, unknown>,
    responseType: ResponseType = "json",
  ) {
    const actualUrl = apiUrl + endpoint;
    const bodyHeaders = body ? { "Content-Type": "application/json" } : {};
    const actualHeaders = { ...commonHeaders, ...bodyHeaders, ...(headers || {}) };
    return ajax({ url: actualUrl, method, body, headers: actualHeaders, responseType });
  };

  ajaxCall.get = (endpoint: string, headers?: Record<string, unknown>, responseType?: ResponseType) =>
    ajaxCall(endpoint, "GET", undefined, headers, responseType);
  ajaxCall.post = (
    endpoint: string,
    body?: Record<string, unknown>,
    headers?: Record<string, unknown>,
    responseType?: ResponseType,
  ) => ajaxCall(endpoint, "POST", body, headers, responseType);
  ajaxCall.put = (
    endpoint: string,
    body?: Record<string, unknown>,
    headers?: Record<string, unknown>,
    responseType?: ResponseType,
  ) => ajaxCall(endpoint, "PUT", body, headers, responseType);
  ajaxCall.patch = (
    endpoint: string,
    body?: Record<string, unknown>,
    headers?: Record<string, unknown>,
    responseType?: ResponseType,
  ) => ajaxCall(endpoint, "PATCH", body, headers, responseType);
  ajaxCall.delete = (endpoint: string, headers?: Record<string, unknown>, responseType?: ResponseType) =>
    ajaxCall(endpoint, "DELETE", undefined, headers, responseType);

  return ajaxCall;
};
