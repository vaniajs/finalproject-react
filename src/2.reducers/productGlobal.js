const INITIAL_STATE = {dataFilter:[]}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'DATA_FILTER':
            return {dataFilter:action.payload}
        default:
            return state
    }
}