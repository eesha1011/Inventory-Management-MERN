import { data } from "react-router-dom";
import api from "./api";

export const getUsers = async () => {
    const token = localStorage.getItem("accessToken");
    const res = await api.get('/users', {
        headers: {Authorization: `Bearer ${token}`,},
    });

    return res.data;
}

export const updateUser = async (id, data) => {
    const token = localStorage.getItem("accessToken");
    const res = await api.patch(`/users/${id}`, data, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return res.data;
}

export const blockUser = async (id) => {
    const token = localStorage.getItem("accessToken");
    const res = await api.patch(`/users/block/${id}`, {}, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return res.data;
}

export const unblockUser = async (id) => {
    const token = localStorage.getItem("accessToken");
    const res = await api.patch(`/users/unblock/${id}`, {}, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return res.data;
}

export const deleteUser = async (id) => {
    const token = localStorage.getItem("accessToken");
    const res = await api.delete(`/users/${id}`, {
        headers: {Authorization: `Bearer ${token}`,},
    });

    return res.data;
}