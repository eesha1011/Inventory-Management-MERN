import { useEffect, useState } from "react"
import EmptyState from "../components/EmptyState"
import PageHeader from "../components/PageHeader"
import DashboardLayout from "../layouts/DashboardLayout"
import api from "../services/api"
import { userSearch } from "../context/SearchContext"

const Inventory = () => {

    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState([]);

    const { search } = userSearch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products", error);
                
            }
        }

        fetchProducts();
    }, []);

    const toggleCheckbox = (_id) => {
        setSelected((prev) => prev.includes(_id) ? prev.filter((item) => item !== _id) : [...prev, _id]);
    };

    const isAllSelected = products.length > 0 && selected.length === products.length;

    const handleSelectAll = () => {
        if(isAllSelected) {
            setSelected([]);
        } else {
            setSelected(products.map((p) => p._id));
        }
    }

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DashboardLayout>
            <PageHeader title={"Inventory"}/>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-2.5 flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                    <input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} className="w-4 h-4" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Select All</span>
                </div>

                {selected.length > 0 && (
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {selected.length} item{selected.length > 1 ? "s" : ""} selected
                    </div>
                )}
            </div>

            <div className="bg-white text-gray-800 dark:text-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow overflow-x-auto">
                {products.length === 0 ? (
                    <EmptyState title={"Inventory Module"} description={"No products found."}/>
                ) : (
                    <ul className="space-y-3">
                        {filteredProducts.map((product) => (
                            <li key={product._id} className="flex items-center gap-3 border p-3 rounded-lg border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300 transition hover:cursor-pointer">
                                <input type="checkbox" checked={selected.includes(product._id)} onChange={() => toggleCheckbox(product._id)} className="w-4 h-4" />

                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 dark:text-gray-100">{product.name}</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">{product.category}  • {product.stock}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </DashboardLayout>
    )
}

export default Inventory;