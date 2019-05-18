import axios from 'axios';

export const SearchFilter = (keyword) => {
    return (dispatch) => {
        axios.get('http://localhost:2000/products/filter?product='+keyword)
            .then((res) => {
                if (res.data.length > 0) {
                    dispatch({
                        type: 'DATA_FILTER',
                        payload: res.data
                    })
                }
            })
            .catch((err) => console.log(err))
    }
}