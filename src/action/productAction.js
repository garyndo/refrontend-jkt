export const getProduct = (data) => {
    return {
        type: 'GET_PRODUCT', //harus sama dengan yg ada d history reducer
        payload: data
    }
}