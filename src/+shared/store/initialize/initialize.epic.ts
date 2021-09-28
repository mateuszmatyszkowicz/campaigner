import { combineEpics } from 'redux-observable';
import { filter, mapTo, tap } from 'rxjs/operators';
import { initializeSlice } from './initialize.slice';
import { getAppVersion } from '../../logic/version/version';
import { RootEpic } from '../../../app/app.epics';
import { isProduction } from '../../logic/envs/envs';

const initializeEpic$: RootEpic = (action$, _state$) =>
  action$.pipe(
    filter(initializeSlice.actions.initialize.match),
    tap(() => {
      if (!isProduction()) {
        console.log(`current appVersion: ${getAppVersion()}`);
      }
    }),
    mapTo(initializeSlice.actions.initializeSuccessfully())
  );

export const initializeEpics$ = combineEpics(initializeEpic$);
