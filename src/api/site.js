import axiosSite from "./axiosSite.js";

// const END_POINT = {
//     HOME: "home"
// }

const END_POINT = {
    USER_INFO: "get-user-info",
    HOT_DEALS: "get-hot-deals",
    PRODUCTS_ALL: "get-products-all"
}
export const getUserInfoAPI = () => {
    // return axiosSite.get(`${END_POINT.HOME}`)
    return axiosSite.get(`${END_POINT.USER_INFO}`);
}

export const getProductsHotDealsAPI = () => {
    return axiosSite.get(`${END_POINT.HOT_DEALS}`);
}