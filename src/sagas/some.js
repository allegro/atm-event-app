import { call, put, takeLatest } from "redux-saga/effects";

import { someAction, SOME_ASYNC_ACTION } from "../modules/some";

const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

function* someAsyncActionSaga({ payload }) {

    try {
        yield call(delay, 1000);
        yield put(someAction(payload.text));
    } catch (error) {}
}

export default function* Saga() {
    yield takeLatest(SOME_ASYNC_ACTION, someAsyncActionSaga);
}
