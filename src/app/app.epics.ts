import { Action, Dispatch } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { catchError, startWith } from 'rxjs/operators';
import { initializeEpics$ } from '../+shared/store/initialize/initialize.epic';
import { initializeSlice } from '../+shared/store/initialize/initialize.slice';
import { StoreState } from './app.reducers';

export type EpicDependencies = {
    dispatch: Dispatch;
};

export type RootEpic = Epic<Action, Action, StoreState, EpicDependencies>;

const epics = [
    initializeEpics$
]


export const rootEpic: RootEpic = (action$, state$, dependencies) =>
    combineEpics(...epics)(action$, state$, dependencies).pipe(
        catchError((error, source) => {
            console.error(error);
            return source;
        }),
        startWith(initializeSlice.actions.initialize())
    );
