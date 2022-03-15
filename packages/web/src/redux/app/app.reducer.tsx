import {
   AppActionTypes,
   AppActionCreatorTypes,
   SetSaveChangesAction,
   SetAppLoadingAction,
} from "./app.actions";
import ISaveChanges from "../../models/interfaces/ISaveChanges";
import saveChangesState from "../../models/states/saveChanges.state";
type ErrorState = {
   errorMsg: string | null;
   show: boolean;
};

const errorState = (): ErrorState => {
   return {
      errorMsg: null,
      show: false,
   };
};

export type AppReducerState = {
   error: ErrorState;
   saveChanges: ISaveChanges;
   loading: boolean;
};

function appReducerState(): AppReducerState {
   return {
      error: errorState(),
      saveChanges: saveChangesState(),
      loading: false,
   };
}

export default function reducer(
   state = appReducerState(),
   action: AppActionCreatorTypes
) {
   const { type, payload } = action;

   switch (type) {
      case AppActionTypes.SET_SAVE_CHANGES:
         return setSaveChanges(
            state,
            payload as SetSaveChangesAction["payload"]
         );

      case AppActionTypes.SET_APP_LODING:
         return setLoading(state, payload as SetAppLoadingAction["payload"]);

      default:
         return state;
   }
}

/********************************************************************************
 *  Save Changes
 *******************************************************************************/

function setSaveChanges(
   state: AppReducerState,
   saveChanges: Partial<ISaveChanges>
): AppReducerState {
   return {
      ...state,
      saveChanges: {
         ...state.saveChanges,
         ...saveChanges,
      },
   };
}

/********************************************************************************
 *  Set Loading
 *******************************************************************************/

function setLoading(
   state: AppReducerState,
   { loading }: { loading: boolean }
): AppReducerState {
   return {
      ...state,
      loading,
   };
}
