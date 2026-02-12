import Table from "../common/Table";
import EmptyState from "../EmptyState";


const ProductList = ({products, onDelete, onEdit}) => {

    // const products = [];

    if (!products || products.length === 0) {
        return (
            <EmptyState title={"No products found"} description={"Start by adding your first product."} />
        )
    }

    const columns = [
        {key: "image", label: "Image"},
        {key: "name", label: "Name"},
        {key: "category", label: "Category"},
        {key: "price", label: "Price (₹)"},
        {key: "stock", label: "Stock"},
    ]

    return (
        <Table
            columns={columns}
            data={products}
            renderActions={(product) => (
                <>
                    <button onClick={() => onEdit(product._id)} className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">Edit</button>
                    <button onClick={() => onDelete(product._id)} className="text-red-600 dark:text-red-400 cursor-pointer hover:underline">Delete</button>
                </>
            )}
        />
    )

}

export default ProductList;










































// return (
    //     <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
    //         <table className="min-w-full text-sm">
    //             <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
    //                 <tr>
    //                     <th className="px-4 py-3 text-left">Name</th>
    //                     <th className="px-4 py-3 text-left">Category</th>
    //                     <th className="px-4 py-3 text-left">Price</th>
    //                     <th className="px-4 py-3 text-left">Stock</th>
    //                     <th className="px-4 py-3 text-left">Actions</th>
    //                 </tr>
    //             </thead>

    //             <tbody>
    //                 {products.map((product, index) => (
    //                     <tr key={index} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300 transition">
    //                         <td className="px-4 py-3">{product.name}</td>
    //                         <td className="px-4 py-3">{product.category}</td>
    //                         <td className="px-4 py-3">{product.price}</td>
    //                         <td className="px-4 py-3">{product.stock}</td>
    //                         <td className="px-4 py-3 space-x-2">
    //                             <button className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline" onClick={() => onEdit(index)}>Edit</button>
    //                             <button className="text-red-600 dark:text-red-400 cursor-pointer hover:underline" onClick={() => onDelete(index)}>Delete</button>
    //                         </td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     </div>
    // )