import { all } from "redux-saga/effects";
import userSaga from './user/user.saga'

export default function* rootSaga() {
  try {
    yield all([
      userSaga()
    ]);
  } catch (e) {
    console.error(e);
  }
}

/*================================================================================
Sagas
================================================================================*/

/*================================================================================
GraphQL Requests
================================================================================*/
