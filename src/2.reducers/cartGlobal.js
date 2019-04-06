const INITIAL_STATE = {cart:0}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'UPDATE_CART':
            return{cart:action.payload}
        case 'ADD_CART':
            return{cart:action.payload}
        default:
            return state
    }
}