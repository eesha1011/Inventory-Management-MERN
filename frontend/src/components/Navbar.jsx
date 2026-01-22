import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon, Menu, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = ({onMenuclick}) => {

    const {search, setSearch} = useContext(SearchContext);
    const {theme, toggleTheme} = useContext(ThemeContext);
    const {user, logout} = useAuth();

    const handleSearch = () => {
        console.log("Searching for: ", search);
    }

    return (
        <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
            
            {/* Left side */}
            <button onClick={onMenuclick} className="px-3 py-1 text-sm rounded cursor-pointer dark:bg-gray-700 text-gray-800 dark:text-gray-100 md:hidden mr-4"><Menu className="w-5 h-5" /></button>

            {/*Global Search (for users, products, etc.) */}
            <div className="flex items-center gap-2">
                <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded px-3 py-1 w-64 focus:outline-none focus:ring" />
                <button onClick={handleSearch} className="font-semibold text-gray-900 dark:text-gray-100 hover:text-gray-600 cursor-pointer dark:hover:text-gray-400"><Search className="w-5 h-5"/></button>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
        
                {/* Theme Toggle */}
                <button onClick={() => {toggleTheme();}} className="px-3 py-1 text-sm rounded cursor-pointer text-gray-800 dark:text-gray-100">
                    {theme === "dark" ? (
                        <Sun className="w-5 h-5 text-yellow-400" />
                    ) : (<Moon className="w-5 h-5 text-gray-800" />)}
                </button>

                {/* Profile */}
                <div className="flex items-center gap-2 cursor-pointer">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {user?.name}
                    </span>
                    {/* <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {user?.role === "Admin" ? "A" : "U"}
                    </span> */}
                    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 dark:text-gray-200 flex items-center justify-center">{user?.role?.charAt(0)}</div>
                    <button onClick={logout} className="text-sm text-white font-semibold rounded p-1.5 cursor-pointer bg-red-400 hover:bg-red-500">Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar;