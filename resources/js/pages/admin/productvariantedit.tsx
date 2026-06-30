import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { Link,usePage,router } from "@inertiajs/react";
import { ArrowLeft, Upload, Save, Edit } from "lucide-react";
import { useState } from "react";


export default function EditVariantPage() {
    const [preview, setPreview] = useState<string | null>(null);

    const { products,categories,variants } = usePage().props as any;
    const { errors } = usePage().props;
    const [ saving, setSaving ] = useState(false);
    const [ editOn, setEditOn ] = useState(false);

    const [ product,setProduct ] = useState({
        sku: variants.sku,
        barcode: variants.barcode,
        cost_price: variants.cost_price,
        selling_price:variants.selling_price,
        variant_name:variants.variant_name,
        is_active: variants.is_active,
        image:  null as File | null,
        quantity_on_hand: variants.quantity_on_hand,
        reorder_level: variants.reorder_level,

    });


    const [ errorMsg,setErrorMsg]=useState("");

    const submitHandle = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true)

        router.post(`/admin/products/${products.slug}/variants/${variants.id}/save`,{...product,_method:"put",},{

            onSuccess:()=>{
               
                setSaving(false);
            },
            onError:(errors)=>{
                setSaving(false);
                setErrorMsg(errors.errorMsg);
                
               
            },

        });


    }

    const handleImage = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <AdminMainLayout>
            <div className="min-h-screen bg-slate-50 p-4 md:p-6">

                {/* Header */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            Add Product Variant
                        </h1>

                        <p className="text-gray-500">
                            Create a new product variant.
                        </p>
                    </div>

                    <Link 
                        href={`/admin/products/${products.slug}/details`}
                    className="flex items-center gap-2 border px-4 py-2 rounded-xl bg-white hover:bg-slate-100">
                        <ArrowLeft size={18} />
                        Back
                    </Link>

                </div>

                {/* Product Card */}

                <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">

                    <h2 className="font-semibold text-slate-800">
                        Product Information
                    </h2>

                    <div className="mt-4 flex items-center gap-4">

                        <img
                            src={`${import.meta.env.VITE_IMAGE_URL}/files/product_images/${products.featured_image}`}
                            className="w-20 h-20 rounded-xl object-cover"
                        />

                        <div>
                            <h3 className="font-semibold text-lg">
                               {products.name}
                            </h3>

                            <p className="text-gray-500">
                                {categories.name}
                            </p>
                        </div>

                    </div>

                </div>

                {/* Form */}
                <form onSubmit={submitHandle}>
                <div className="bg-white rounded-2xl shadow-sm p-6">

                    <div className="grid lg:grid-cols-3 gap-6">

                        {/* Left Side */}

                        <div className="lg:col-span-2 space-y-5">

                            <div className="grid md:grid-cols-2 gap-4">

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        SKU <span className="text-red-500"> *</span>
                                         {errors.sku && (  <span className="text-red-500 text-sm mt-2"> {errors.sku} 
                                            
                                         </span>  )}
                                    </label>
                                    

                                    <input
                                        type="text"
                                        className={`w-full border rounded-xl px-4 py-3 ${!editOn ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                                        placeholder="NIKE-BLK-8"
                                        required
                                        maxLength={16}
                                        minLength={6}
                                        value={product.sku}
                                        onChange={(e) => setProduct({...product, sku: e.target.value})}
                                        disabled={!editOn}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Barcode 
                                        {errors.barcode && (  <span className="text-red-500 text-sm mt-2"> {errors.barcode} 
                                         </span>  )}
                                    </label>

                                    <input
                                        type="text"
                                        className={`w-full border rounded-xl px-4 py-3 ${!editOn ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                                        placeholder="123456789"
                                        min={4}
                                        maxLength={50}
                                        value={product.barcode}
                                        onChange={(e) => setProduct({...product, barcode: e.target.value})}
                                        disabled={!editOn}
                                    />
                                </div>

                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Variant Name <span className="text-red-500"> *</span>
                                    {errors.variant_name && (  <span className="text-red-500 text-sm mt-2"> {errors.variant_name} 
                                         </span>  )}
                                </label>

                                <input
                                    type="text"
                                    className={`w-full border rounded-xl px-4 py-3 ${!editOn ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                                    placeholder="Black Size 8"
                                    required
                                    minLength={6}
                                    maxLength={50}
                                    value={product.variant_name}
                                    onChange={(e) => setProduct({...product, variant_name: e.target.value})}
                                    disabled={!editOn}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Cost Price <span className="text-red-500"> *</span>
                                    </label>

                                    <input
                                        type="number"
                                        className={`w-full border rounded-xl px-4 py-3 ${!editOn ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                                        placeholder="3000.00"
                                        required
                                        maxLength={12}
                                        value={product.cost_price}
                                        onChange={(e) => setProduct({...product, cost_price: e.target.value})}
                                        disabled={!editOn}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Selling Price <span className="text-red-500"> *</span> 
                                                    {errors.selling_price && (  <span className="text-red-500 text-sm mt-2"> {errors.selling_price}
                                                         </span> )}
                                    </label>

                                    <input
                                        type="number"
                                        className={`w-full border rounded-xl px-4 py-3 ${!editOn ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                                        placeholder="4999.00"
                                        required
                                        maxLength={12}
                                        value={product.selling_price}
                                        onChange={(e) => setProduct({...product, selling_price: e.target.value})}
                                        disabled={!editOn}
                                    />
                                </div>

                            </div>

                            <div className="grid md:grid-cols-2 gap-4">

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Quantity On Hand 
                                    </label>

                                    <input
                                        type="number"
                                        className="w-full border rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
                                        placeholder="20"
                                        maxLength={6}
                                        required
                                        value={product.quantity_on_hand}
                                        onChange={(e) => setProduct({...product, quantity_on_hand: e.target.value})}
                                        disabled
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Reorder Level <span className="text-red-500"> *</span>
                                    </label>

                                    <input
                                        type="number"
                                        className={`w-full border rounded-xl px-4 py-3 ${!editOn ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                                        placeholder="5"
                                        required
                                        maxLength={5}
                                        value={product.reorder_level}
                                        onChange={(e) => setProduct({...product, reorder_level: e.target.value})}
                                        disabled={!editOn}
                                    />
                                </div>

                            </div>

                        </div>

                        {/* Right Side */}

                        <div className="space-y-5">

                            {/* Image Upload */}

                            <div className="border rounded-2xl p-5">

                                <h2 className="font-semibold mb-4">
                                    Variant Image
                                </h2>

                                 <label
                                className={`
                                    relative
                                    block
                                    h-76
                                    overflow-hidden
                                    rounded-xl
                                    border-2
                                    border-dashed
                                    ${
                                        !editOn
                                            ? "bg-gray-100 cursor-not-allowed"
                                            : "cursor-pointer hover:border-sky-500"
                                    }
                                `}
                            >
                                {!product.image ? (
                                    <img
                                        src={`${import.meta.env.VITE_IMAGE_URL}/files/variant_images/${variants.image}`}
                                        alt=""
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src={URL.createObjectURL(product.image)}
                                        alt=""
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                )}

                                {!variants.image && !product.image && (
                                    <div className="flex h-full flex-col items-center justify-center">
                                        <Upload
                                            size={30}
                                            className="text-gray-400"
                                        />
                                        <span className="mt-2 text-gray-500">
                                            Upload Image
                                        </span>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    disabled={!editOn}
                                    onChange={(e) =>
                                        setProduct({
                                            ...product,
                                            image:
                                                e.target.files?.[0] || null,
                                        })
                                    }
                                />
                            </label>

                            </div>

                            {/* Status */}

                        <div className="rounded-2xl border bg-white p-5 shadow-sm">
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Product Status
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Enable or disable this product from appearing on the website.
                                </p>
                            </div>

                            <div className="flex items-center justify-between rounded-xl border bg-gray-50 p-4">
                                <div>
                                    <p className="font-medium text-gray-800">
                                        Visibility
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Control whether this product is active.
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span
                                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                                            product.is_active
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {product.is_active ? "Active" : "Inactive"}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setProduct({
                                                ...product,
                                                is_active: !product.is_active,
                                            })
                                        }
                                        disabled={!editOn}
                                        className={`relative h-8 w-14 ${!editOn ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer'} rounded-full transition-colors duration-300 ${
                                            product.is_active
                                                ? "bg-sky-500"
                                                : "bg-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow transition-transform duration-300 ${
                                                product.is_active
                                                    ? "translate-x-6"
                                                    : ""
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                            {/* Information */}

                            <div className="border rounded-2xl p-5 bg-sky-50">

                                <h2 className="font-semibold mb-3">
                                    Variant Information
                                </h2>

                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li>
                                        • Stock is managed per variant.
                                    </li>

                                    <li>
                                        • Prices can differ per variant.
                                    </li>

                                    <li>
                                        • Images can be unique.
                                    </li>

                                    <li>
                                        • Each variant requires a unique SKU.
                                    </li>
                                </ul>

                            </div>

                        </div>

                    </div>

                    {/* Buttons */}

                    <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row gap-3 justify-end">

                        <Link
                        href={`/admin/products/${products.slug}/details`}
                        type="button"
                        className="px-6 py-3 bg-white border rounded-xl hover:bg-gray-100">
                            Cancel
                        </Link>

                        <button
                                onClick={function(){setEditOn(true)}}
                                type="button"
                                className="px-6 py-3 bg-sky-500 hover:bg-sky-600 hover:cursor-pointer text-white rounded-xl flex items-center justify-center gap-2"     
                                hidden={editOn}
                                disabled={editOn}
                            >
                                <Edit size={18} />
                                Edit
                        </button>

                         
                        <button disabled={saving} hidden={!editOn} className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl flex items-center justify-center gap-2">
                            <Save size={18} />
                            {!saving ? "Save Variant" : "Saving..."}
                            
                        </button>
                                             
                        
                    </div>

                </div>
                      </form>                          
            </div>
        </AdminMainLayout>
    );
}