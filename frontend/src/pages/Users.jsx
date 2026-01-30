import { useContext, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import UserEditModal from "../components/users/UserEditModal";
import UsersTable from "../components/users/UsersTable";
import DashboardLayout from "../layouts/DashboardLayout";
import ConfirmModal from "../components/ConfirmModal";
import { SearchContext } from "../context/SearchContext";
import { blockUser, deleteUser, getUsers, unblockUser, updateUser } from "../services/userApi";


// const initialUsers = [
//     {id: 1, name: "Eesha", email: "esha@gmail.com", role: "Admin", status: "Active"},
//     {id: 2, name: "Pratik", email: "pratik@gmail.com", role: "User", status: "Blocked"},
// ];

const Users = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // const [users, setUsers] = useState(() => {
    //         const saved = localStorage.getItem("users");
    //         return saved ? JSON.parse(saved) : initialUsers;
    // });
    
    const [editUser, setEditUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const {search} = useContext(SearchContext);

    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                // console.log(("BACKEND USERS 👉", data));
                const mappedUsers = data.map(user => ({...user, status: user.isActive ? "Active" : "Blocked"}));
                // console.log(mappedUsers[0]);
                setUsers(mappedUsers);
            } catch (error) {
                console.error("Users fetch error", error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    
    }, []);

    const handleSaveUser = async (user) => {
        try {
            const updatedUser = await updateUser(user._id, user);

            setUsers(prev => prev.map(u => u._id === updatedUser._id ? {...updatedUser, status: updatedUser.isActive? "Active" : "Blocked"} : u));
            setShowModal(false);
            setEditUser(null);
        } catch (error) {
            console.error("Update failed", error);   
        }
    }

    const handleToggleStatus = async (user) => {
        try {
            const updatedUser = user.isActive ? await blockUser(user._id) : await unblockUser(user._id);

            setUsers(prev => prev.map(u => u._id === updatedUser._id ? {...updatedUser, status: updatedUser.isActive? "Active" : "Blocked"} : u));
        } catch (error) {
            console.error("Status update failed", error);
            
        }
    }

    // const handleDelete = (id) => {
    //     setUsers(users.filter(u => u._id !== id));
    // }

    const handleDeleteClick = (id) => {
        setSelectedUserId(id);
        setShowConfirm(true);
    }

    const confirmDelete = async () => {
        try {
            await deleteUser(selectedUserId);

            setUsers(prev => prev.filter(u => u._id !== selectedUserId));
            setShowConfirm(false);
            setSelectedUserId(null);
        } catch (error) {
            console.error("Delete user error", error);
            
        }
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