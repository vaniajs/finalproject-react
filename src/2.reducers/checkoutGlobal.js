const INITIAL_STATE = {pendTrans:null}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'PEND_TRANS':
            return {pendTrans:action.payload}
        default:
            return state
    }
}