const INITIAL_STATE = {cart:0}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'ISI_CART':
            return {cart:action.payload}
        default:
            return state
    }
}