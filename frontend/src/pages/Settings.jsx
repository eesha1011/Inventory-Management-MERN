import EmptyState from "../components/EmptyState"
import PageHeader from "../components/PageHeader"
import { useAuth } from "../context/AuthContext"
import DashboardLayout from "../layouts/DashboardLayout"

const Settings = () => {

    const { user, logout } = useAuth();

    return (
        <DashboardLayout>
            <PageHeader title={"Settings"}/>

            <div className="space-y-6 text-gray-800 dark:text-gray-300">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-4">Profile</h3>

                    <div>
                        <p><span className="font-medium">Name: </span>{user?.name}</p>
                        <p><span className="font-medium">Email: </span>{user?.email}</p>
                        <p><span className="font-medium">Role: </span>{user?.role}</p>
                    </div>

                    {/* <div className="w-34 h-34 rounded-full bg-gray-300 dark:text-gray-200 flex items-center justify-center">
                        <img src="https://i.pinimg.com/736x/51/7c/83/517c8349117db2db5cc9e8a215e079d0.jpg" alt="Profile" className="w-34 h-34 rounded-full"/>
                    </div> */}
                </div>

                <div className="max-w-28 bg-white flex justify-center items-center dark:bg-gray-800 p-3 rounded-xl shadow">
                    <button onClick={logout} className="text-red-600 dark:text-red-500 hover:underline text-md font-semibold cursor-pointer">Logout</button>
                </div>
            </div>

            {/* <EmptyState title={"Settings"} description={"User preferences and app settings will be configured here."}/> */}
        </DashboardLayout>
    )
}

export default Settings;