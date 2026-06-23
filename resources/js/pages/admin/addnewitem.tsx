import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { useState } from "react";
import { ArrowLeft, Upload, Save, Plus } from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";
import AdminAddCategories from "@/components/modals/adminAddCategories";
import Swal from "sweetalert2";


export default function AddNewItemPage() {
  const [preview, setPreview] = useState<string | null>(null);

  const { categories } = usePage().props as any;

  
const [ showCategoryModal,setShowCategoryModal] = useState(false);
const [ categoryActive,setCategoryActive] = useState(true);

const [ showBrandModal, setShowBrandModal ] = useState(false);
const [ brandActive, setBrandActive ] = useState(true);
const [ logoPreview ] = useState("");

const [ category, setCategory ] = useState({
  name:"",
  description:"",

});

const handleSubmitCategory = (e: React.FormEvent) => {
      e.preventDefault();

      const categoryExist = categories.some(
      (d: any) => d.name.toLowerCase() === category.name.toLowerCase()
    );


    if (categoryExist) {
      Swal.fire("Duplicate", "Category already exists", "warning");
      return;
    }

      router.post('/admin/category/add',category,{
      preserveScroll: true,
        onSuccess: () => {
          setCategory({
            name:"",
            description:"",
          });
          console.log("success");
        },
        onError: (error) => {
          console.log(error);
        },




      });
     
}

const handleBrandLogo = "";

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <AdminMainLayout><section>
      <AdminAddCategories />

{/** MAIN PAGE */}
<div className="min-h-screen bg-slate-50 p-4 md:p-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Add New Product
          </h1>

          <p className="text-gray-500">
            Create a new item in the master list
          </p>
        </div>

        <button
          className="flex items-center gap-2 border px-4 py-2 rounded-xl bg-white hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

      {/* Form */}

      <div className="bg-white rounded-2xl shadow-sm p-6">

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left Side */}

          <div className="lg:col-span-2 space-y-5">

            {/* Product Name */}

            <div>
              <label className="block text-sm font-medium mb-2">
                Product Name *
              </label>

              <input
                type="text"
                placeholder="Enter Product Name"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* Slug */}

            <div>
              <label className="block text-sm font-medium mb-2">
                Slug *
              </label>

              <input
                type="text"
                placeholder="nike-air-max"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

           {/* Category & Brand */}

            <div className="grid md:grid-cols-2 gap-4">

              {/* Category */}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Category *
                </label>

                <div className="flex gap-2">

                  <select
                    className="flex-1 border rounded-xl px-4 py-3"
                  >
                    <option>Select Category</option>
                    {categories.map((category: any) => (
                    <option key={category.id} value={category.id}>
                       {category.name.toUpperCase()}
                    </option>
                  ))}
                  </select>

                  <button
                    onClick={() => setShowCategoryModal(true)}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-4 rounded-xl flex items-center justify-center"
                  >
                    <Plus size={16} />
                    Add
                  </button>

                </div>

              </div>

              {/* Brand */}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Brand *
                </label>

                <div className="flex gap-2">

                  <select
                    className="flex-1 border rounded-xl px-4 py-3"
                  >
                    <option>Select Brand</option>
                    <option>Nike</option>
                    <option>Samsung</option>
                    <option>FoodCorp</option>
                  </select>

                  <button
                 onClick={() => setShowBrandModal(true)}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-4 rounded-xl flex items-center justify-center"
                >
                  <Plus size={16} />
                  Add
                </button>

                </div>

              </div>

            </div>

            {/* Short Description */}

            <div>
              <label className="block text-sm font-medium mb-2">
                Short Description
              </label>

              <textarea
                rows={3}
                className="w-full border rounded-xl px-4 py-3"
                placeholder="Short summary..."
              />
            </div>

            {/* Description */}

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>

              <textarea
                rows={8}
                className="w-full border rounded-xl px-4 py-3"
                placeholder="Full product description..."
              />
            </div>

          </div>

          {/* Right Side */}

          <div className="space-y-5">

            {/* Featured Image */}

            <div className="border rounded-2xl p-5">

              <h2 className="font-semibold mb-4">
                Featured Image
              </h2>

              <label
                className="border-2 border-dashed rounded-xl h-56 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500"
              >

                {preview ? (
                  <img
                    src={preview}
                    alt=""
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <>
                    <Upload
                      size={30}
                      className="text-gray-400"
                    />

                    <span className="text-gray-500 mt-2">
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

              <select
                className="w-full border rounded-xl px-4 py-3"
              >
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
                Next Step
              </h2>

              <p className="text-sm text-gray-600">
                After saving this product,
                you can create:
              </p>

              <ul className="mt-3 text-sm space-y-2 text-gray-700">
                <li>• Product Variants</li>
                <li>• Product Images</li>
                <li>• Inventory Quantity</li>
              </ul>

            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row gap-3 justify-end">

          <button
            className="px-6 py-3 border rounded-xl"
          >
            Cancel
          </button>

          <button
            className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl flex items-center justify-center gap-2"
          >
            <Save size={18} />
            Save Product
          </button>

        </div>

      </div>

</div>

                {/* ADD CATEGORY MODAL */}

                {/** CATEGORY MODAL */}
                {showCategoryModal && (
<div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
                  
        <div className="bg-white w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-lg rounded-none sm:rounded-2xl flex flex-col">

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

                  <form onSubmit={handleSubmitCategory}>
            <div className="p-6 space-y-5">

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Name <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        value={category.name}
                        onChange={(e) => setCategory({...category, name: e.target.value})}
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="Electronics"
                        required
                        maxLength={25}
                    />
                </div>


                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Description <span className="text-red-500">*</span>
                    </label>

                    <textarea
                        rows={4}
                        value={category.description}
                        onChange={(e) => setCategory({...category, description: e.target.value})}
                        className="w-full border rounded-xl px-4 py-3"
                        required
                        maxLength={255}
                    />
                </div>
                  {/* 
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
                            setCategory({...category, is_active: !category.is_active,})
                        }
                        className={`w-14 h-8 rounded-full transition relative ${
                            category.is_active
                                ? "bg-sky-500"
                                : "bg-gray-300"
                        }`}
                    >
                        <span
                            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition ${
                                category.is_active
                                    ? "translate-x-6"
                                    : ""
                            }`}
                        />
                    </button>

                </div>
                  */}
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
        </form>
        </div>

</div>
)}

                {/** BRAND MODAL */}
                {showBrandModal && (
<div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">

            <div className="border-b px-6 py-4 flex justify-between items-center">

                <h2 className="text-xl font-bold text-slate-800">
                    Add Brand
                </h2>

                <button
                    onClick={() => setShowBrandModal(false)}
                    className="text-gray-500 text-xl"
                >
                    ×
                </button>

            </div>

            <div className="p-6 space-y-5">

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Name *
                    </label>

                    <input
                        type="text"
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="Nike"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Logo
                    </label>

                    <label className="border-2 border-dashed rounded-xl h-44 flex flex-col justify-center items-center cursor-pointer">

                        {logoPreview ? (
                            <img
                                src={logoPreview}
                                className="w-full h-full object-contain rounded-xl"
                            />
                        ) : (
                            <>
                                <Upload
                                    size={28}
                                    className="text-gray-400"
                                />

                                <span className="mt-2 text-gray-500">
                                    Upload Logo
                                </span>
                            </>
                        )}

                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleBrandLogo}
                        />

                    </label>

                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Description
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
                            Brand is visible.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setBrandActive(!brandActive)
                        }
                        className={`w-14 h-8 rounded-full transition ${
                            brandActive
                                ? "bg-sky-500"
                                : "bg-gray-300"
                        } relative`}
                    >
                        <span
                            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition ${
                                brandActive
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
                        setShowBrandModal(false)
                    }
                    className="px-5 py-3 border rounded-xl"
                >
                    Cancel
                </button>

                <button
                    className="px-5 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl"
                >
                    Save Brand
                </button>

            </div>

        </div>

    </div>
)}
    </section></AdminMainLayout>
  );
}

       