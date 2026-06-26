import AdminMainLayout from "@/components/layout/AdminMainLayout";
import {
    ArrowLeft,
    Plus,
    Edit,
    Trash2,
    Package
} from "lucide-react";
import { Link, usePage } from "@inertiajs/react";


export default function ProductVariantPage() {
    const { variants,products,categories } = usePage().props as any;
   

    return (
        <AdminMainLayout>
            <div className="min-h-screen bg-slate-50 p-4 md:p-6">

                {/* Header */}

                <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">

                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            Product Variants
                        </h1>

                        <p className="text-gray-500">
                            Manage product variants, stock, and pricing.
                        </p>
                    </div>

                    <div className="flex gap-3">

                        <Link 
                        href="/admin/product/create"
                        className="border px-4 py-2 rounded-xl bg-white hover:bg-gray-100 flex items-center gap-2">
                            <ArrowLeft size={18} />
                            Back
                        </Link>

                        <Link 
                            href={`/admin/products/${products.slug}/variants/create`}
                        className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-xl flex items-center gap-2">
                            <Plus size={18} />
                            Add Variant
                        </Link>

                    </div>

                </div>

                {/* Product Card */}

                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

                    <div className="flex flex-col md:flex-row gap-5">

                        <img
                            src="https://placehold.co/120x120"
                            className="w-28 h-28 rounded-xl object-cover"
                        />

                        <div className="flex-1">

                            <h2 className="text-2xl font-bold text-slate-800">
                                {products.name.toUpperCase()}
                            </h2>

                            <p className="text-gray-500 mt-1">
                                {categories.name.toUpperCase()}
                            </p>

                            <p className="mt-4 text-gray-600">
                                {products.short_description.toUpperCase()}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Desktop Table */}

                <div className="hidden lg:block bg-white rounded-2xl shadow-sm overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-slate-100">

                            <tr className="text-left">

                                <th className="p-4">SKU</th>
                                <th className="p-4">Variant</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Stock</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {variants.map((variant: any) => (
                                <tr
                                    key={variant.id}
                                    className="border-t"
                                >
                                    <td className="p-4">
                                        {variant.sku}
                                    </td>

                                    <td className="p-4 font-medium">
                                        {variant.variant_name}
                                    </td>

                                    <td className="p-4">
                                        ₱{variant.selling_price.toLocaleString()}
                                    </td>

                                    <td className="p-4">
                                        {variant.quantity_on_hand}
                                    </td>

                                    <td className="p-4">

                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                           {variant.is_active ? "active" : "Inactive"}
                                        </span>

                                    </td>

                                    <td className="p-4">

                                        <div className="flex gap-2">

                                            <button className="p-2 rounded-lg border hover:bg-slate-100">
                                                <Edit size={18} />
                                            </button>

                                            <button className="p-2 rounded-lg border text-red-500 hover:bg-red-50">
                                                <Trash2 size={18} />
                                            </button>

                                        </div>

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Mobile Cards */}

                <div className="lg:hidden space-y-4">

                    {variants.map((variant: any) => (

                        <div
                            key={variant.id}
                            className="bg-white rounded-2xl shadow-sm p-5"
                        >

                            <div className="flex justify-between mb-4">

                                <div>

                                    <h3 className="font-semibold text-slate-800">
                                        {variant.variant_name}
                                    </h3>

                                    <p className="text-gray-500 text-sm">
                                        {variant.sku}
                                    </p>

                                </div>

                                <Package
                                    className="text-sky-500"
                                    size={22}
                                />

                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">

                                <div>
                                    <p className="text-gray-500">
                                        Price
                                    </p>

                                    <p className="font-semibold">
                                        ₱{variant.selling_price}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Stock
                                    </p>

                                    <p className="font-semibold">
                                        {variant.quantity_on_hand}
                                    </p>
                                </div>

                            </div>

                            <div className="flex gap-2 mt-5">

                                <button className="flex-1 border rounded-xl py-2">
                                    Edit
                                </button>

                                <button className="flex-1 bg-red-500 text-white rounded-xl py-2">
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </AdminMainLayout>
    );
}