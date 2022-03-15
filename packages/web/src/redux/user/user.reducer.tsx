import IUser from "../../models/interfaces/IUserRegister";
import {
  UserActionCreatorTypes,
  UserActionTypes,
} from "./user.actions";

export enum ErrorKeyEnum {
  Global = "Global",
  UserEmail = "UserEmail",
  ConfirmUserEmail = "ConfirmUserEmail",
  UserFullName = "UserFullName",
  UserPhoneNumber = "UserPhoneNumber",
}

export type ErrorMap = {
  [key in ErrorKeyEnum]?: string;
};

type UserReducerState = {
  loading: boolean;
  errors: ErrorMap;
  userData: IUser | {};
};

export default function reducer(
  state: UserReducerState = {
    loading: true,
    errors: {},
    userData: {},
  },
  action: UserActionCreatorTypes
) {
  const { type, payload } = action;

  switch (type) {
    case UserActionTypes.SET_LOADING:
      return { ...state, loading: payload };

    case UserActionTypes.SET_USER:
      return { ...state, userData: payload };

    default:
      return state;
  }
}

/********************************************************************************
 *  Set Error
 *******************************************************************************/

function setError(
  state: UserReducerState,
  { key, errorMsg }: { key: ErrorKeyEnum; errorMsg: string }
): UserReducerState {
  return {
    ...state,
    errors: {
      ...state.errors,
      [key]: errorMsg,
    },
  };
}

/********************************************************************************
 *  Set Loading
 *******************************************************************************/

function setLoading(
  state: UserReducerState,
  { loading }: { loading: boolean }
): UserReducerState {
  return {
    ...state,
    loading,
  };
}
