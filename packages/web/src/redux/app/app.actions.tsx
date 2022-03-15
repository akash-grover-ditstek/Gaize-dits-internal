import IConfirmAction from "../../models/interfaces/ISaveChanges";
import ISaveChanges from "../../models/interfaces/ISaveChanges";
export const AppActionTypes = {

  PUSH_MODAL: "PUSH_MODAL",
  POP_MODAL: "POP_MODAL",
  PUSH_MODAL_CONFIRM_ACTION: "PUSH_MODAL_CONFIRM_ACTION",
  SET_SAVE_CHANGES: "SET_SAVE_CHANGES",
  SET_APP_LODING: "SET_APP_LODING",
};

/********************************************************************************
 *  App Action Creators
 *******************************************************************************/

export type AppActionCreatorTypes =
  | SetSaveChangesAction
  | SetAppLoadingAction


// /************************************************************
//  *  Set Save Changes
//  ***********************************************************/

export interface SetSaveChangesAction {
  type: typeof AppActionTypes.SET_SAVE_CHANGES;
  payload: Partial<ISaveChanges>;
}

export function setSaveChanges(
  saveChanges: Partial<ISaveChanges>
): SetSaveChangesAction {
  return {
    type: AppActionTypes.SET_SAVE_CHANGES,
    payload: saveChanges,
  };
}



export interface SetAppLoadingAction {
  type: typeof AppActionTypes.SET_APP_LODING;
  payload: {
    loading: boolean;
  };
}

export function setAppLoading(loading: boolean): SetAppLoadingAction {
  return {
    type: AppActionTypes.SET_APP_LODING,
    payload: {
      loading,
    },
  };
}




