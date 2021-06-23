import { AjaxResponse } from "rxjs/ajax";
import { api } from "../../app/api";
import { RootState } from "../../app/types";
import { useSelector } from "react-redux";

type ajaxCallType = "get" | "post" | "put" | "delete";

type BodyType = Record<string, unknown>;

interface ApiCall {
  endpoint: string;
  body: BodyType;
  onNextCallback: (value: AjaxResponse) => void;
  onErrorCallback: (error: AjaxResponse) => void;
  onEndCallback: () => void;
}

type SubscriptionCallbacks = [ApiCall["onNextCallback"]?, ApiCall["onErrorCallback"]?, ApiCall["onEndCallback"]?];

type BodylessApiCall = [ApiCall["endpoint"], ...SubscriptionCallbacks];

type RegularApiCall = [ApiCall["endpoint"], ApiCall["body"], ...SubscriptionCallbacks];

/** Type predicate to check whether the second parameter passed to the api call is of appropriate body type */
const isRegularApiCall = (apiCall: BodylessApiCall | RegularApiCall): apiCall is RegularApiCall => {
  return typeof apiCall?.[1] === "object";
};

function useApiAjax(callType: ajaxCallType) {
  const state = useSelector((state: RootState) => state);

  const executeApiCall$ = (endpoint: string, body?: BodyType) => {
    const apiFunction = api(state)[callType];
    return apiFunction(endpoint, body ?? {});
  };

  const operateApiCall =
    (endpoint: string, body?: BodyType) =>
    <T extends SubscriptionCallbacks>(...callbacks: T) => {
      const [onNextCallback, onErrorCallback, onEndCallback] = callbacks;

      executeApiCall$(endpoint, body).subscribe(
        (value: AjaxResponse) => {
          onNextCallback?.(value);
        },
        (error: AjaxResponse) => {
          onErrorCallback?.(error);
        },
        () => {
          onEndCallback?.();
        },
      );
    };

  const handleApiCall = <T extends BodylessApiCall | RegularApiCall>(...args: T) => {
    if (isRegularApiCall(args)) {
      const [endpoint, body, ...callbacks] = args;
      operateApiCall(endpoint, body)(...callbacks);
    } else {
      const [endpoint, ...callbacks] = args;
      operateApiCall(endpoint)(...callbacks);
    }
  };

  return handleApiCall;
}

export default useApiAjax;
