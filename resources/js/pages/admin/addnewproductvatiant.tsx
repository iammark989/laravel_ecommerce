import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { ArrowLeft, Upload, Save } from "lucide-react";
import { useState } from "react";

export default function AddVariantPage() {
    const [preview, setPreview] = useState<string | null>(null);

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

                    <button className="flex items-center gap-2 border px-4 py-2 rounded-xl bg-white hover:bg-slate-100">
                        <ArrowLeft size={18} />
                        Back
                    </button>

                </div>

                {/* Product Card */}

                <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">

                    <h2 className="font-semibold text-slate-800">
                        Product Information
                    </h2>

                    <div className="mt-4 flex items-center gap-4">

                        <img
                            src="https://placehold.co/100x100"
                            className="w-20 h-20 rounded-xl object-cover"
                        />

                        <div>
                            <h3 className="font-semibold text-lg">
                                Nike Air Max
                            </h3>

                            <p className="text-gray-500">
                                Footwear • Nike
                            </p>
                        </div>

                    </div>

                </div>

                {/* Form */}

                <div className="bg-white rounded-2xl shadow-sm p-6">

                    <div className="grid lg:grid-cols-3 gap-6">

                        {/* Left Side */}

                        <div className="lg:col-span-2 space-y-5">

                            <div className="grid md:grid-cols-2 gap-4">

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        SKU *
                                    </label>

                                    <input
                                        type="text"
                                        className="w-full border rounded-xl px-4 py-3"
                                        placeholder="NIKE-BLK-8"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Barcode
                                    </label>

                                    <input
                                        type="text"
                                        className="w-full border rounded-xl px-4 py-3"
                                        placeholder="123456789"
                                    />
                                </div>

                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Variant Name *
                                </label>

                                <input
                                    type="text"
                                    className="w-full border rounded-xl px-4 py-3"
                                    placeholder="Black Size 8"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Cost Price
                                    </label>

                                    <input
                                        type="number"
                                        className="w-full border rounded-xl px-4 py-3"
                                        placeholder="3000.00"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Selling Price
                                    </label>

                                    <input
                                        type="number"
                                        className="w-full border rounded-xl px-4 py-3"
                                        placeholder="4999.00"
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
                                        className="w-full border rounded-xl px-4 py-3"
                                        placeholder="20"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Reorder Level
                                    </label>

                                    <input
                                        type="number"
                                        className="w-full border rounded-xl px-4 py-3"
                                        placeholder="5"
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

                                <label className="border-2 border-dashed rounded-xl h-56 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500">

                                    {preview ? (
                                        <img
                                            src={preview}
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    ) : (
                                        <>
                                            <Upload
                                                size={30}
                                                className="text-gray-400"
                                            />

                                            <span className="mt-2 text-gray-500">
                                                Upload Image
                                            </span>
                                        </>
                                    )}

                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImage}
                                    />

                                </label>

                            </div>

                            {/* Status */}

                            <div className="border rounded-2xl p-5">

                                <h2 className="font-semibold mb-4">
                                    Status
                                </h2>

                                <select className="w-full border rounded-xl px-4 py-3">
                                    <option value="1">
                                        Active
                                    </option>

                                    <option value="0">
                                        Inactive
                                    </option>
                                </select>

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

                        <button className="px-6 py-3 border rounded-xl">
                            Cancel
                        </button>

                        <button className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl flex items-center justify-center gap-2">
                            <Save size={18} />
                            Save Variant
                        </button>

                    </div>

                </div>

            </div>
        </AdminMainLayout>
    );
}