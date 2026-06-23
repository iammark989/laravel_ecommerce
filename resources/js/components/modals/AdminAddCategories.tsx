import { useState } from "react";

export default function AdminAddCategories(){

const [ showCategoryModal,setShowCategoryModal] = useState(false);
const [ categoryActive,setCategoryActive] = useState(false);

    return(
        <div>
        {showCategoryModal && (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">

            <div className="border-b px-6 py-4 flex justify-between items-center">

                <h2 className="text-xl font-bold text-slate-800">
                    Add Category
                </h2>

                <button
                    onClick={() => setShowCategoryModal(false)}
                    className="text-gray-500 text-xl"
                >
                    ×
                </button>

            </div>

            <div className="p-6 space-y-5">

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Name <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="Electronics"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Slug <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="electronics"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Description <span className="text-red-500">*</span>
                    </label>

                    <textarea
                        rows={4}
                        className="w-full border rounded-xl px-4 py-3"
                    />
                </div>

                <div className="flex items-center justify-between border rounded-xl p-4">

                    <div>
                        <h3 className="font-medium">
                            Active Status
                        </h3>

                        <p className="text-sm text-gray-500">
                            Category is visible.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setCategoryActive(!categoryActive)
                        }
                        className={`w-14 h-8 rounded-full transition relative ${
                            categoryActive
                                ? "bg-sky-500"
                                : "bg-gray-300"
                        }`}
                    >
                        <span
                            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition ${
                                categoryActive
                                    ? "translate-x-6"
                                    : ""
                            }`}
                        />
                    </button>

                </div>

            </div>

            <div className="border-t p-6 flex justify-end gap-3">

                <button
                    onClick={() =>
                        setShowCategoryModal(false)
                    }
                    className="px-5 py-3 border rounded-xl"
                >
                    Cancel
                </button>

                <button
                    className="px-5 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl"
                >
                    Save Category
                </button>

            </div>

        </div>

    </div>
)}
</div>
    );
}