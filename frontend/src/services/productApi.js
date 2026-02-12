import api from "./api";

export const getProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const getProductByIdApi = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

export const addProductApi = async (formData) => {
    const response = await api.post('/products', formData);
    return response.data;
};

export const deleteProductApi = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};

export const updateProductApi = async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
};