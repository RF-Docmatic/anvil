import { useHistory, useLocation } from "react-router-dom";

type UrlQueryParams = { [key: string]: string };

/**
 *
 * @param {[string, ...UrQueryParams]} args first element is always a string which stands for a base URL name
 * and the rest is objects containing key-value pairs of url search params
 * @returns
 */
export function useUrlQueryParams<T extends UrlQueryParams[]>(baseUrl: string, ...args: T) {
  const location = useLocation();
  const history = useHistory();
  const currentParams = new URLSearchParams(location.search);

  const getLocationPathname = () => {
    if (location.pathname === baseUrl) return location.pathname;
    else return baseUrl;
  };

  const updateCurrentParams = (urlQueryParams: UrlQueryParams[]) => {
    const currentParamsKeyIterator = currentParams.keys();
    Array.from(currentParamsKeyIterator).forEach((key) => currentParams.delete(key));

    urlQueryParams.forEach((obj) => {
      for (const [key, value] of Object.entries(obj)) {
        currentParams.set(key, value);
      }
    });
  };

  const changeCurrentRoute = (values: T) => {
    updateCurrentParams(values);
    history.replace({ pathname: getLocationPathname() ?? "", search: currentParams.toString() });
  };

  function pushWithUrlQueryParams(...newValues: T) {
    changeCurrentRoute(newValues);
  }

  return pushWithUrlQueryParams;
}
