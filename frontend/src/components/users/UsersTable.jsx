import { useContext } from "react";
import EmptyState from "../EmptyState";
import UserRow from "./UserRow";
import { SearchContext } from "../../context/SearchContext";
import Table from "../common/Table";


const UsersTable = ({users, onEdit, onToggleStatus, onDelete}) => {

    const {search} = useContext(SearchContext);
    
    const safeSearch = search?.trim().toLowerCase() || "";
    
    const filteredUsers = safeSearch === "" ? users : users.filter(
        user => user.name.toLowerCase().includes(safeSearch) ||
        user.email.toLowerCase().includes(safeSearch)
    );

    if(!filteredUsers || filteredUsers.length === 0) {
        return <EmptyState title={"No users found"}/>
    }
    const columns = [
        {key: "name", label: "Name"},
        {key: "email", label: "Email"},
        {key: "role", label: "Role"},
        {key: "status", label: "Status"},
    ]

    // console.log("UsersTable users:", users);

    // const [selectedUser, setSelectedUser] = useState(null);

    // const [search, setSearch] = useState("");


    // console.log("SEARCH VALUE 👉", JSON.stringify(search));
    // console.log("SEARCH LENGTH 👉", search?.length);

    return (
        <Table 
            columns={columns}
            data={filteredUsers}
            renderActions={(user) => (
                <>
                    <button onClick={() => onEdit(user)} className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">Edit</button>
                    <button onClick={() => onToggleStatus(user)} className="text-sm text-yellow-600 dark:text-yellow-400 cursor-pointer hover:underline">{user.isActive ? "Block" : "Unblock"}</button>
                    <button onClick={() => onDelete(user._id)} className="text-red-600 dark:text-red-400 cursor-pointer hover:underline">Delete</button>
                </>
            )}
        />
    )

    // const addUser = (user) => {
    //     setUsers([...users, user]);
    //     setShowModal(false);
    // }

    // const updateUser = (user) => {
    //     setUsers(users.map(u => u.id === user.id ? user : u));
    //     setShowModal(false);
    //     setEditUser(null);
    // }

    // const toggleStatus = (id) => {
    //     setUsers(users.map(user => user.id === id ? {...user, status: user.status === "Active" ? "Blocked" : "Active"} : user))
    // }
    // const deleteUser = (id) => {
    //     setUsers(users.filter(user => user.id !== id))
    // }
    // const saveUser = (updatedUser) => {
    //     setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    //     setSelectedUser(null);
    // }

    // console.log("RENDER CHECK USERS 👉", users);

    // return ( 
    //     <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
    //         {filteredUsers.length === 0 ? (
    //             <EmptyState title={"No users found"}/>
    //         ) : (
    //             <table className="min-w-full text-sm">
    //                 <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
    //                     <tr>
    //                         <th className="px-4 py-3 text-left">Name</th>
    //                         <th className="px-4 py-3 text-left">Email</th>
    //                         <th className="px-4 py-3 text-left">Role</th>
    //                         <th className="px-4 py-3 text-left">Status</th>
    //                         <th className="px-4 py-3 text-left">Actions</th>
    //                     </tr>
    //                 </thead>

    //                 <tbody>
    //                     {(filteredUsers ?? users).map(user => (
    //                         <UserRow key={user.id} user={user} onToggleStatus={onToggleStatus} onDelete={onDelete} onEdit={() => onEdit(user)}/>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         )}
    //     </div>

    // )
}

export default UsersTable;
















{/* {showModal && (
            <UserEditModal initialData={editUser} onAdd={addUser} onUpdate={updateUser} onClose={() => setShowModal(false)} />
        )} 
        <UserEditModal user={selectedUser} onClose={() => setSelectedUser(null)} onSave={(updatedUser) => {
            setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
            setSelectedUser(null);
        }}/>
        <table className="min-w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                </tr>
            </thead>

            <tbody>
                {users.map(user => (
                    <tr key={user.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300 transition">
                        <td className="px-4 py-3">{user.name}</td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3">{user.role}</td>
                        <td className="px-4 py-3">
                            <span className={`px-2 rounded text-sm ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{user.status}</span>
                        </td>
                        <td className="px-4 py-3 space-x-2">
                            <button className="text-blue-600 dark:text-blue-400 cursor-pointer">Edit</button>
                            <button className="text-red-600 dark:text-red-400 cursor-pointer">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table> */}