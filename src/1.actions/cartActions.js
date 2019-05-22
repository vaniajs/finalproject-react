import axios from 'axios';

export const cartLength = (username) => {
    return(dispatch)=>{
        axios.get('http://localhost:2000/cart/getCart?username=' + username)
        .then((res)=>{
            dispatch({
                type: "PEND_TRANS",
                payload: res.data.length
            })
        })
        .catch((err)=>console.log(err))
    }
}

