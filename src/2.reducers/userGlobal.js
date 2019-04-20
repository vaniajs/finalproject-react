const INITIAL_STATE = {username:'',password:'',id:0,loading:false, role:'',error:''}

export default (state=INITIAL_STATE,action) => {
    switch(action.type){
    case 'LOADING':
        return{...INITIAL_STATE,loading:true}
    case 'LOGIN_SUCCESS':
        return{...INITIAL_STATE, username:action.payload[0].username, role:action.payload[0].role, id:action.payload[0].id}
    case 'REGISTER_SUCCESS':
        return{...INITIAL_STATE,error:action.payload}
        // return{...INITIAL_STATE, username:action.payload.username, role:action.payload.role, id:action.payload.id}

    case 'USER_NOT_FOUND':
        return{...INITIAL_STATE,error:"Wrong Username / Password"}
    case 'SYSTEM_ERROR':
        return{...INITIAL_STATE,error:"System Error. Try again later"}
    case 'RESET_USER':
        return INITIAL_STATE
    case 'EMAIL_REGISTERED':
        return {...INITIAL_STATE,error:action.payload}
    default:
        return state
    }
}