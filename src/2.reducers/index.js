import { combineReducers } from 'redux';
import UserState from './userGlobal';
import CartState from './cartGlobal';
import CheckoutState from './checkoutGlobal';

export default combineReducers({
    user: UserState,
    cart: CartState,
    trans: CheckoutState
})