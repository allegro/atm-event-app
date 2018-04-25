import { fork } from "redux-saga/effects";
import someSaga from "./some";

export default function* rootSaga() {
    yield fork(someSaga);
}