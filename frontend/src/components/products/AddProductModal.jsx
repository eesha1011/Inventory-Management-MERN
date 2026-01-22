import { useEffect, useState } from "react";

const AddProductModal = ({onclose, onAdd, onUpdate, initialData}) => {

    const [form, setForm] = useState({
        name: "",
        category: "",
        price: "",
        stock: "",
    });

    useEffect(() => {
        if(initialData){
            setForm({
                name: initialData.name || "",
                category: initialData.category || "",
                price: initialData.price || "",
                stock: initialData.stock || "", 
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {...form, price: Number(form.price), stock: Number(form.stock)};
        
        if(initialData){
            onUpdate(payload);
        } else {
            onAdd(payload);
            
            // setForm({
            //     name: "",
            //     category: "",
            //     price: "",
            //     stock: ""
            // });
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{initialData ? "Edit Product" : "Add Product"}</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Product Name" className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded" />
                    <input name="category" value={form.category} onChange={handleChange} type="text" placeholder="Category" className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded" />
                    <input name="price" value={form.price} onChange={handleChange} type="text" placeholder="Price" className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded" />
                    <input name="stock" value={form.stock} onChange={handleChange} type="text" placeholder="Stock" className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded" />

                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onclose} className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded cursor-pointer">Cancel</button>

                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer">{initialData ? "Update" : "Add"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProductModal;