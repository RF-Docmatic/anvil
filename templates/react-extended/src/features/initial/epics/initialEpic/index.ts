import { map, mergeMap, catchError, filter, tap } from "rxjs/operators";
import { combineEpics, Epic } from "redux-observable";
import { Observable, of } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { initialActions } from "../../slices";
import { ajax } from "rxjs/ajax";
import { RootState } from "../../../../app/types";
import { ActionType, isOfType } from "typesafe-actions";
import { FetchRandomFactAction } from "../../types";

const fetchRandomFactEpic: Epic<FetchRandomFactAction, FetchRandomFactAction, RootState> = (action$) =>
  action$.pipe(
    filter(isOfType(initialActions.fetchRandomFactStart.type)),
    mergeMap<FetchRandomFactAction, Observable<FetchRandomFactAction>>(() =>
      ajax.get("https://uselessfacts.jsph.pl/random.json?language=en").pipe(
        tap((val) => console.log("val", val)),
        map((ajaxResponse: AjaxResponse) => initialActions.fetchRandomFactDone(JSON.stringify(ajaxResponse))),
        catchError((error) => of(initialActions.fetchRandomFactFail(error))),
      ),
    ),
  );

export const initialEpic = combineEpics(fetchRandomFactEpic);
