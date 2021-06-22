import { map, mergeMap, catchError, filter } from "rxjs/operators";
import { combineEpics, Epic } from "redux-observable";
import { Observable, of } from "rxjs";
import { initialActions } from "../../slices";
import { ajax } from "rxjs/ajax";
import { RootState } from "../../../../app/types";
import { isOfType } from "typesafe-actions";
import { FetchRandomFactAction } from "../../types";

const fetchRandomFactEpic: Epic<FetchRandomFactAction, FetchRandomFactAction, RootState> = (action$) =>
  action$.pipe(
    filter(isOfType(initialActions.fetchRandomFactStart.type)),
    mergeMap<FetchRandomFactAction, Observable<FetchRandomFactAction>>(() =>
      ajax.get("https://uselessfacts.jsph.pl/random.json?language=en").pipe(
        map((ajaxResponse) => initialActions.fetchRandomFactDone(JSON.stringify(ajaxResponse))),
        catchError((error) => of(initialActions.fetchRandomFactFail(error))),
      ),
    ),
  );

export const initialEpic = combineEpics(fetchRandomFactEpic);
