import DashboardLayout from "../layouts/DashboardLayout";
import ProductList from "../components/products/ProductsList";
import AddProductModal from "../components/products/AddProductModal";
import { useContext, useState } from "react";
import PageHeader from "../components/PageHeader";
import { SearchContext } from "../context/SearchContext";
import ConfirmModal from "../components/ConfirmModal";
import { useEffect } from "react";
import axios from "axios";
import { getProducts, addProductApi, updateProductApi, deleteProductApi } from "../services/productApi";

const Products = () => {

    // const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchedProducts = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:5000/api/products");
    //             setProducts(response.data.data);
    //         } catch (error) {
    //             console.log("Error fetching products", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchedProducts();
    // }, [])

    // if(loading) {
    //     return (
    //         <DashboardLayout>
    //             <p className="text-gray-500 text-center mt-10">Loading Products...</p>
    //         </DashboardLayout>
    //     )
    // };

    // const [products, setProducts] = useState(() => {
    //     const saved = localStorage.getItem("products");
    //     return saved ? JSON.parse(saved) : []; 
    // });

    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const {search} = useContext(SearchContext);

    const fetchedProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Fetch products error", error);
        }
    }

    useEffect(() => {
        fetchedProducts();
    }, []);

    const addProduct = async (newProduct) => {
        try {
            const saved = await addProductApi(newProduct);
            fetchedProducts();
            setOpen(false);
        } catch (error) {
            console.error(error.response?.data);
            alert("Validation failed ❌ Check inputs");
        }
        // const updated = [...products, {...newProduct, id: Date.now()}];
        // setProducts(updated);
        // localStorage.setItem("products", JSON.stringify(updated));
    };

    // const deleteProduct = (id) => {
    //     const updatedProcducts = products.filter(p => p.id !== id);
    //     setProducts(updatedProcducts);
    //     localStorage.setItem("products", JSON.stringify(updatedProcducts));
    // }

    const handleDeleteClick = (_id) => {
        setSelectedId(_id);
        setShowConfirm(true);
    }

    const confirmDelete = async () => {
        if (!selectedId) return;
        try {
            await deleteProductApi(selectedId);
            await fetchedProducts();
        } catch (error) {
            alert("Delete failed ❌");
        }  
        setShowConfirm(false);
        setSelectedId(null);
    }

    const editProduct = (_id) => {
        setEditId(_id);
        setOpen(true);
    }

    const productToEdit = products.find(p => p._id === editId);

    const updateProduct = async (updatedProcduct) => {
        await updateProductApi(editId, updatedProcduct);
        fetchedProducts();
        setEditId(null);
        setOpen(false);
        
        // const updatedProcducts = products.map(p => p.id === editId ? updatedProduct : p);
        // setProducts(updatedProcducts);
        // localStorage.setItem("products", JSON.stringify(updatedProcducts));
        
    }

    const filteredProducts = search ? products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
    ) : products;

    return (
        <DashboardLayout>
            <PageHeader title={"Products"} action={
                <button onClick={() => setOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer">+ Add Product</button>
            }/>
            {/* <div className="flex items-center justify-between mb-6"> */}
                {/* <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Products</h2> */}

                
            {/* </div> */}

            {filteredProducts.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">No products found for "{search}"</p>
            ) : (
                <ProductList products={filteredProducts} onDelete={handleDeleteClick} onEdit={editProduct}/>
            )}

            {open && (
                <AddProductModal 
                    onclose={() => {
                        setOpen(false);
                        setEditId(null);
                    }}
                    onAdd={addProduct}
                    onUpdate={updateProduct}
                    initialData={productToEdit} />
            )}

            {showConfirm && (
                <ConfirmModal title={"Delete Product"} message={"Are you sure you want to delete this product?"} onConfirm={confirmDelete} onCancel={() => setShowConfirm(false)} />
            )}
        </DashboardLayout>
    )
}

export default Products;