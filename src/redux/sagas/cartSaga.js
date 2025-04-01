import {take, all, put, fork, takeLatest} from 'redux-saga/effects';
import {
  addToCart,
  cartAddChange,
  cartRemoveChange,
  removeCart,
} from '../slices/cartSlice';

// function callGetRequest(url, data) {
//   return getData(url, data, true);
// }

function* addRequest() {
  while (true) {
    const {payload} = yield take(cartAddChange);
    console.log('payload');
    
    yield put(addToCart(payload));
  }
}
function* removeRequest() {
  while (true) {
    const {payload} = yield take(cartRemoveChange);
    yield put(removeCart(payload));
  }
}

export default function* cart() {
  yield fork(addRequest);
  yield fork(removeRequest);
  //   yield all([
  //     fork(addRequest),
  //     takeLatest(cartRemoveChange.type, removeRequest),
  //   ]);
  //   yield takeLatest(cartRemoveChange.type, removeRequest);
}
