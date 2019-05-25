import axios from 'axios';

export const cartLength = (username) => {
    return(dispatch)=>{
        axios.get('http://localhost:2000/cart/getCart?username=' + username)
        .then((res)=>{
            dispatch({
                type: "ISI_CART",
                payload: res.data.length
            })
        })
        .catch((err)=>console.log(err))
    }
}

