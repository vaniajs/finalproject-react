import axios from 'axios'

export const pendingTransLength = (id) => {
    return(dispatch)=>{
        axios.get('http://localhost:2000/checkout/pendingTrans?id=' + id)
        .then((res)=>{
            dispatch({
                type: "PEND_TRANS",
                payload: res.data.length
            })
        })
        .catch((err)=>console.log(err))
    }
}