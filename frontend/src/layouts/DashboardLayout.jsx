import { useState } from "react";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
import { BanknoteArrowDown, CirclePile, LayoutDashboard, PackageSearch, Settings, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const linkClass = "flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-800 transition dark:hover:bg-gray-700";

const DashboardLayout = ({children}) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const {user} = useAuth();

    const adminMenu = [
        {name: "Dashboard", path: "/", icon: LayoutDashboard},
        {name: "Inventory", path: "/inventory", icon: CirclePile},
        {name: "Products", path: "/products", icon: PackageSearch},
        {name: "Users", path: "/users", icon: Users},
        {name: "Expenses", path: "/expenses", icon: BanknoteArrowDown},
        {name: "Settings", path: "/settings", icon: Settings},
    ];

    const userMenu = [
        {name: "Dashboard", path: "/", icon: LayoutDashboard},
        {name: "Inventory", path: "/inventory", icon: CirclePile},
        {name: "Settings", path: "/settings", icon: Settings},
    ];

    const menuItems = user?.role === "Admin" ? adminMenu : userMenu;
 
    return(
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">

            {sidebarOpen && (
                <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 md:hidden"/>
            )}

            <aside className={`fixed md:static z-50 w-52 h-full bg-gray-900 dark:bg-gray-900 text-white p-4 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
                <div className="flex justify-center items-center p-1.5 space-x-2.5">
                    <img src="https://w7.pngwing.com/pngs/824/73/png-transparent-inventory-management-software-business-inventory-control-purchasing-track-angle-people-warehouse-thumbnail.png" alt="logo" className="w-10 h-10 rounded-full" />
                    <h1 className="text-xl font-bold mb-1">Inventory</h1>
                </div>

                <nav>
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink key={item.path} to={item.path} onClick={() => setSidebarOpen(false)} end className={({isActive}) => `${linkClass} ${isActive ? "bg-gray-800 dark:bg-gray-700 text-green-400" : ""}`}>
                                <Icon className=" w-5 h-5"/>
                                <span>{item.name}</span>
                            </NavLink>
                        )
                    })}
                </nav>

                {/* <nav className="space-y-2 ">
                    <NavLink to={"/"} onClick={() => setSidebarOpen(false)} end className={({isActive}) => `${linkClass} ${isActive ? "bg-gray-800 dark:bg-gray-700 text-green-400" : ""}`}>
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink to={"/inventory"} onClick={() => setSidebarOpen(false)} end className={({isActive}) => `${linkClass} ${isActive ? "bg-gray-800 dark:bg-gray-700 text-green-400" : ""}`}>
                        <CirclePile className="w-5 h-5" />
                        <span>Inventory</span>
                    </NavLink>

                    <NavLink to={"/products"} onClick={() => setSidebarOpen(false)} end className={({isActive}) => `${linkClass} ${isActive ? "bg-gray-800 dark:bg-gray-700 text-green-400" : ""}`}>
                        <PackageSearch className="w-5 h-5" />
                        <span>Products</span>
                    </NavLink>

                    <NavLink to={"/users"} onClick={() => setSidebarOpen(false)} end className={({isActive}) => `${linkClass} ${isActive ? "bg-gray-800 dark:bg-gray-700 text-green-400" : ""}`}>
                        <Users className="w-5 h-5"/>
                        <span>Users</span>
                    </NavLink>

                    <NavLink to={"/expenses"} onClick={() => setSidebarOpen(false)} end className={({isActive}) => `${linkClass} ${isActive ? "bg-gray-800 dark:bg-gray-700 text-green-400" : ""}`}>
                        <BanknoteArrowDown className="w-5 h-5" />
                        <span>Expenses</span>
                    </NavLink>

                    <NavLink to={"/settings"} onClick={() => setSidebarOpen(false)} end className={({isActive}) => `${linkClass} ${isActive ? "bg-gray-800 dark:bg-gray-700 text-green-400" : ""}`}>
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </NavLink>
                </nav> */}
            </aside>

            <div className="flex-1 flex flex-col">
                <Navbar onMenuclick={() => setSidebarOpen(true)}/>
                <main className="flex-1 p-6 overflow-y-auto bg-gray-100 dark:bg-gray-900 ">
                    {children}
                </main>
            </div>

        </div>
    );
};

export default DashboardLayout;