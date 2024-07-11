import axiosSite from "./axiosSite.js";

// const END_POINT = {
//     PRODUCTS_ALL: "get-products-all",
//     PRODUCTS_DETAIL: "get-product-detail"
// }
// export const getProductsAllAPI = () => {
//     // return axiosSite.get(`${END_POINT.HOME}`)
//     return axiosSite.get(`${END_POINT.PRODUCTS_ALL}`);
// }
// export const getProductDetailAPI = () => {
//     // return axiosSite.get(`${END_POINT.HOME}`)
//     return axiosSite.get(`${END_POINT.PRODUCTS_DETAIL}`);
// }

const API_VERSION = "v1"

const END_POINT = {
    CATEGORY_ALL: `${API_VERSION}/Category`,
    CATEGORY_BY_BRAND: `${API_VERSION}/Category/by-brand`,
    
    PRODUCTS_ALL: `${API_VERSION}/Product`,
    RELATED_PRODUCTS: `${API_VERSION}/Product/category`,
    HIGHEST_DISCOUNT: `${API_VERSION}/Product/highest-discount`,
    PRODUCT_BY_BRAND: `${API_VERSION}/Product/brand`,
    PRODUCT_BY_PURPOSE: `${API_VERSION}/Product/purpose`,

    BLOGS_ALL: `${API_VERSION}/Blog`
}

export const getProductsAllAPI = () => {
    // return axiosSite.get(`${END_POINT.HOME}`)
    return axiosSite.get(`${END_POINT.PRODUCTS_ALL}`);
    // { headers: {"Authorization" : `Bearer ${tokenStr}`} }
}

export const getProductDetailAPI = (productID) => {
    // return axiosSite.get(`${END_POINT.HOME}`)
    return axiosSite.get(`${END_POINT.PRODUCTS_ALL}/${productID}`);
}

export const getProductsByBrandAPI = (brand) => {
    // return axiosSite.get(`${END_POINT.HOME}`)
    return axiosSite.get(`${END_POINT.PRODUCT_BY_BRAND}/${brand}`);
}

export const getProductsByPurposeAPI = (purpose) => {
    // return axiosSite.get(`${END_POINT.HOME}`)
    return axiosSite.get(`${END_POINT.PRODUCT_BY_PURPOSE}/${purpose}`);
}

export const getRelatedProductsAPI = (categoryID) => {
    // return axiosSite.get(`${END_POINT.HOME}`)
    return axiosSite.get(`${END_POINT.RELATED_PRODUCTS}/${categoryID}`);
}

export const getCategoryAllAPI = () => {
    // return axiosSite.get(`${END_POINT.HOME}`)
    return axiosSite.get(`${END_POINT.CATEGORY_ALL}`);
}

export const getCategoryByBrandAPI = (brand) => {
    // return axiosSite.get(`${END_POINT.HOME}`)
    return axiosSite.get(`${END_POINT.CATEGORY_BY_BRAND}/${brand}`);
}

export const getHighestDiscountAPI = () => {
    // return axiosSite.get(`${END_POINT.HOME}`)
    return axiosSite.get(`${END_POINT.HIGHEST_DISCOUNT}`);
}

export const getBlogsAllAPI = () => {
    // return axiosSite.get(`${END_POINT.HOME}`)
    return axiosSite.get(`${END_POINT.BLOGS_ALL}`);
}