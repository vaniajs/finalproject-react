const INITIAL_STATE = {pendTrans:0}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'PEND_TRANS':
            return {pendTrans:action.payload}
        default:
            return state
    }
}