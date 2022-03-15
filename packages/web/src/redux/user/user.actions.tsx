import IUser from "../../models/interfaces/IUserRegister";
export const UserActionTypes = {
   GET_USER_REQUEST: "GET_USER_REQUEST",
   GET_USER: "GET_USER",
   SET_USER: "SET_USER",
   // Errors
   SET_ERROR: "SET_ERROR",

   // Loading
   SET_LOADING: "SET_LOADING",
};

export enum ErrorKeyEnum {
   Global = "Global",
   UserEmail = "UserEmail",
   ConfirmUserEmail = "ConfirmUserEmail",
   UserFullName = "UserFullName",
   UserPhoneNumber = "UserPhoneNumber",
}

export type UserActionCreatorTypes =
   | SetUserAction
   | SetErrorAction
   | SetLoadingAction;

/********************************************************************************
 * User
 *******************************************************************************/

export interface GetUserAction {
   type: typeof UserActionTypes.GET_USER_REQUEST;
}

export const getUser = (): GetUserAction => {
   return {
      type: UserActionTypes.GET_USER_REQUEST,
   };
};

export interface SetUserAction {
   type: typeof UserActionTypes.SET_USER;
   payload: IUser | undefined;
}

export const setUser = (payload: IUser | undefined): SetUserAction => {
   return {
      type: UserActionTypes.SET_USER,
      payload,
   };
};

/********************************************************************************
 *  Set Error
 *******************************************************************************/

export interface SetErrorAction {
   type: typeof UserActionTypes.SET_ERROR;
   payload: {
      key: ErrorKeyEnum;
      errorMsg: string;
   };
}

export function setError(key: ErrorKeyEnum, errorMsg: string): SetErrorAction {
   return {
      type: UserActionTypes.SET_ERROR,
      payload: {
         key,
         errorMsg,
      },
   };
}


export interface SetLoadingAction {
   type: typeof UserActionTypes.SET_LOADING;
   payload: boolean;
}

export function setLoading(payload: boolean): SetLoadingAction {
   return {
      type: UserActionTypes.SET_LOADING,
      payload,
   };
}
