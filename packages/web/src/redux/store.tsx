
import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import userReducer from "./user/user.reducer";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({

  user: userReducer,
});

export type GiazeState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    // (window as any).devToolsExtension && (window as any).devToolsExtension()
  )
);
sagaMiddleware.run(rootSaga);
export default store;
