const INITIAL_STATE = {username:'',password:'',id:0,loading:false, role:'',error:'', cookie:false}

export default (state=INITIAL_STATE,action) => {
    switch(action.type){
    case 'LOADING':
        return{...INITIAL_STATE,loading:true, cookie:true}
    case 'LOGIN_SUCCESS':
        return{...INITIAL_STATE, username:action.payload[0].username, role:action.payload[0].role, id:action.payload[0].id, cookie:true}
    case 'REGISTER_SUCCESS':
        return{...INITIAL_STATE, username:'isi', cookie:true}
        // return{...INITIAL_STATE, username:action.payload.username, role:action.payload.role, id:action.payload.id}
    case 'NOT_VERIFIED':
        return{...INITIAL_STATE, error: action.payload, cookie:true}
    case 'USER_NOT_FOUND':
        return{...INITIAL_STATE,error:"Wrong Username / Password", cookie:true}
    case 'SYSTEM_ERROR':
        return{...INITIAL_STATE,error:"System Error. Try again later", cookie:true}
    case 'RESET_USER':
        return {...INITIAL_STATE, cookie:true}
    case 'EMAIL_REGISTERED':
        return {...INITIAL_STATE,error:"Email / username has been taken", cookie:true}
    case 'COOKIE_CHECKED':
        return {...INITIAL_STATE, cookie:true}
    default:
        return state
    }
}