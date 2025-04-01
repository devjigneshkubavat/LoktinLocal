import { fork, all } from "redux-saga/effects";
import auth from "./authSaga";
import user from "./userSaga";
import cart from "./cartSaga";
import chat from "./chatSaga";

export default function* rootSaga() {
  yield all([fork(auth), fork(user), fork(cart), fork(chat)]);
}
