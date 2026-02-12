import { useEffect, useState } from "react";
import EmptyState from "../EmptyState";
import { getPopularProductsApi } from "../../services/dashboardService";


// const products = [
//     {
//         id: 1,
//         name: "Laptop Pro",
//         category: "Electronics",
//         price: 1200,
//         sold: 75,
//         image: "https://cdn.mos.cms.futurecdn.net/BRb4ZRdgyRQFUQuGhJo2YC.jpg",
//     },
//     {
//         id: 2,
//         name: "Running Shoes",
//         category: "Fashion",
//         price: 80,
//         sold: 60,
//         image: "https://www.tennisnuts.com/images/product/full/g_599395-011-PHSRH000-2000.jpg",
//     },
//     {
//         id: 3,
//         name: "Smart Phone",
//         category: "Electronics",
//         price: 900,
//         sold: 85,
//         image: "https://www.letemsvetemapplem.eu/wp-content/uploads/2025/06/iPhone-17-Pro-logo-1.jpeg",
//     },
//     {
//         id: 4,
//         name: "Headphones",
//         category: "Electronics",
//         price: 100,
//         sold: 55,
//         image: "https://www.nfm.com/on/demandware.static/-/Sites-nfm-master-catalog/default/dw442a3c8a/images/066/57/66578568-1.jpg",
//     },
//     {
//         id: 5,
//         name: "Jeans",
//         category: "Fashion",
//         price: 60,
//         sold: 75,
//         image: "https://i.pinimg.com/originals/24/23/d7/2423d7adb3456b95d3b08752b668dbbf.jpg",
//     },
// ]


const PropularProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopularProducts = async () => {
            try {
                const data = await getPopularProductsApi();
                setProducts(data);
            } catch (error) {
                console.error("Popular products error", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPopularProducts();

    }, []);

    console.log("Products from API:", products);

    if(loading) {
        return <p className="text-gray-900 dark:text-gray-100">Loading popular products...</p>
    }

    if(products.length === 0) {
        return (
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Popular Products</h3>
                <EmptyState title={"No products found"} description={"Add products to see popular products"}/>
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition h-full flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Popular Products</h3>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {products.map((product) => {
                    const soldPercentage = product.stock < 100 ? 100 - product.stock : 50;

                    return (
                        <div key={product._id} className="flex items-start gap-3 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition" >
                            <img src={product.image ? `http://localhost:5000${product.image}` : "/placeholder.png"} alt={product.name} className="w-10 h-10 rounded object-cover" />

                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{product.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>

                                <div className="w-full bg-gray-200 dark:bg-gray-600 h-1.5 rounded">
                                    <div className="bg-green-500 h-1.5 rounded" style={{width: `${soldPercentage}%`}} ></div>
                                </div>
                            </div>


                            <div className="text-right min-w-[70px]">
                                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">₹{product.price}</p>
                                <p className="text-xs text-gray-500">{soldPercentage}% sold</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PropularProducts;