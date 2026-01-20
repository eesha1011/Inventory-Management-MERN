import API from "./api";

export const fetchProducts = () => API.get("/products");

export const fetchProductById = (id) => API.get(`/products${id}`);

export const addProduct = (data) => API.post("/products", data);

export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const updateProduct = (id, data) => API.put(`/products/${id}`, data);