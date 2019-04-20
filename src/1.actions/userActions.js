import axios from 'axios';
import Cookies from 'universal-cookie';

const objCookie = new Cookies()

export const onLogin = (username, password) => {
    return (dispatch) => {
        dispatch({
            type: 'LOADING',
        })
        axios.get('http://localhost:2000/user/login', {
            params: {
                username,
                password,
            }
        })
            .then((res) => {
                console.log(res)
                if (res.data.length > 0) {
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: res.data
                        // {
                        //     username: res.data[0].username,
                        //     role: res.data[0].role,
                        //     id: res.data[0].id
                        // }
                    },
                    objCookie.set('userData', res.data[0].username ,{path:'/'})
                    )
                }
                else {
                    dispatch({
                        type: 'USER_NOT_FOUND',
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: "SYSTEM_ERROR",
                })
            })
    }
}


export const keepLogin = (cookie) => {
    return (dispatch) => {
        axios.get('http://localhost:2000/user/keeplogin?username='+cookie)
            .then((res) => {
                if (res.data.length > 0) {
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: res.data
                    })
                }
            })
            .catch((err) => console.log(err))
    }
}

export const resetUser = () => {
    return {
        type: 'RESET_USER',
    }
}

export const userReg = (username, email, mobile, password) => {
    return (dispatch) => {
        dispatch({
            type: 'LOADING'
        })
        var newData = { username, email, mobile, password }
        axios.post('http://localhost:2000/user/register', newData)
            .then((res) => {
                if (typeof (res.data) === "string") {
                    dispatch({
                        type: 'EMAIL_REGISTERED',
                        payload: res.data
                    })
                }
                else{
                    dispatch({
                        type: 'REGISTER_SUCCESS',
                        payload: res.data
                    })
                }
                console.log(res.data)                
            })
            .catch((err) => console.log(err))
        // axios.get('http://localhost:2000/user?username=' + username + '&email=' + email)
        // .then((res)=>{
        //     if(res.data.length>0){
        //         dispatch({
        //             type: 'EMAIL_REGISTERED'
        //         })
        //     }
        //     else{
        //         axios.post('http://localhost:2000/users',
        //         {
        //             username: username,
        //             email: email,
        //             mobile: mobile,
        //             password: password
        //         })
        //         axios.get('http://localhost:2000/users')
        //         .then((res)=>dispatch({
        //             type: 'REGISTER_SUCCESS',
        //             payload: username
        //         },
        //             objCookie.set('userData',username,{path:'/'})
        //         ))
        //         .catch((err)=>console.log(err))
        //     }

        //     })

        // .catch((err)=>dispatch({
        //     type: 'SYSTEM ERROR'
        // }))
    }
}

// export const addToCart = (idProduk,idUser,nama,harga,img) => {
//     return(dispatch)=>{
//     axios.get('http://localhost:2000/cart?idUser='+idUser+'&idProduk='+idProduk)
//     .then((res)=>{
//         if(res.data.length>0){
//             // var newQty = res.data[0].qty+1
//                 axios.put('http://localhost:2000/cart/'+res.data[0].id,{
//                     idProduk,idUser,nama,harga,img,qty:res.data[0].qty+1
//                 })
//                 .then((res)=>{
//                     console.log(res)
//                     return{
//                         type:"ADD_CART",
//                         payload: {
//                             cart: res.data[0].qty
//                         }}
//                     // return{
//                     //     type: "UPDATE_CART",
//                     //     payload: res.data[0].qty
//                     // }
//                 })
//                 .catch((err)=>console.log(err))
//         }
//         else{
//             axios.post('http://localhost:2000/cart/',{
//                 idProduk,idUser,nama,harga,img,qty:1
//             })
//             .then((res)=>{
//                 return{
//                     type:"ADD_CART",
//                     payload: {
//                         cart: res.data[0].qty
//                     }

//                 }

//             })
//             .catch((err)=>console.log(err))
//         }
//     })
//     .catch((err)=>console.log(err))

// }
// }

export const updateCart = (param) => {
    return {
        type: 'UPDATE_CART',
        payload: param
    }
}