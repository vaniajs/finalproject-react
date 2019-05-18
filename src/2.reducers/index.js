import { combineReducers } from 'redux';
import UserState from './userGlobal';
import CartState from './cartGlobal';
import ProductState from './productGlobal';

export default combineReducers({
    user: UserState,
    cart: CartState,
    product: ProductState
})