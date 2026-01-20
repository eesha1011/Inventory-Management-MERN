import { useContext, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import UserEditModal from "../components/users/UserEditModal";
import UsersTable from "../components/users/UsersTable";
import DashboardLayout from "../layouts/DashboardLayout";
import ConfirmModal from "../components/ConfirmModal";
import { SearchContext } from "../context/SearchContext";


const initialUsers = [
    {id: 1, name: "Eesha", email: "esha@gmail.com", role: "Admin", status: "Active"},
    {id: 2, name: "Pratik", email: "pratik@gmail.com", role: "User", status: "Blocked"},
];

const Users = () => {

    const [users, setUsers] = useState(() => {
            const saved = localStorage.getItem("users");
            return saved ? JSON.parse(saved) : initialUsers;
    });
    
    const [editUser, setEditUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const {search} = useContext(SearchContext);

    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
        // console.log("USERS STATE:", users);  
    }, [users]);

    const handleSaveUser = (user) => {
        if (editUser) {
            setUsers(users.map(u => u.id === user.id ? user : u));
        } else {
            setUsers([...users, { ...user, id: Date.now(), status: "Active" }]);
        }
        setShowModal(false);
        setEditUser(null);
    }

    const handleToggleStatus = (id) => {
        setUsers(users.map(u => u.id === id ? {...u, status: u.status === "Active" ? "Blocked" : "Active"} : u));
    }

    // const handleDelete = (id) => {
    //     setUsers(users.filter(u => u.id !== id));
    // }

    const handleDeleteClick = (id) => {
        setSelectedUserId(id);
        setShowConfirm(true);
    }

    const confirmDelete = () => {
        setUsers(users.filter(u => u.id !== selectedUserId));
        setShowConfirm(false);
        setSelectedUserId(null);
    }

    const filteredUSers = search ? users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase())
    ) : users;

    return (
        <DashboardLayout>
            <PageHeader title={"Users"} action={
                <button onClick={() => {setEditUser(null); setShowModal(true);}} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 cursor-pointer" >+ Add User</button>
            }/>

            {filteredUSers.length === 0 && search && (
                <p>No users found for "{search}"</p>
            )}
            <UsersTable users={filteredUSers} onEdit={user => {setEditUser(user); setShowModal(true);}} onToggleStatus={handleToggleStatus} onDelete={handleDeleteClick} />
            
            {showModal && (
                <UserEditModal 
                initialData={editUser}
                onSave={handleSaveUser} onClose={() => setShowModal(false)} />
            )}

            {showConfirm && (
                <ConfirmModal title={"Delete User"} message={"Are you sure you want to delete this user?"} onConfirm={confirmDelete} onCancel={() => setShowConfirm(false)} />
            )}
        </DashboardLayout>
    )
}

export default Users;