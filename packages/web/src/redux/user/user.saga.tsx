import { all, takeLatest, put, call, select } from "redux-saga/effects";
import * as UserActions from "./user.actions";
import { UserActionTypes } from "./user.actions";
import IUser from "../../models/interfaces/IUserRegister";

export default function* userSaga() {
   try {
      yield all([getUserWatch()]);
   } catch (e) {}
}

function* getUserWatch() {
   yield takeLatest(UserActionTypes.GET_USER_REQUEST, getUserSaga);
}

/*================================================================================
Sagas
================================================================================*/

interface UserSuccesType {
   data: {
      user: IUser;
   };
}

function* getUserSaga(action: UserActions.GetUserAction) {
   yield put(UserActions.setLoading(true));

   // // // const queryResponse: UserSuccesType = yield call(async () => {
   // // //    return await client.query({
   // // //       query: GET_USER,
   // // //       fetchPolicy: "network-only",
   // // //    });
   // // // });

   // // const user: any | undefined = queryResponse.data;

   // yield put(UserActions.setUser(user));
   yield put(UserActions.setLoading(false));
}
