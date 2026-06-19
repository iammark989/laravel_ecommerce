import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { useState } from "react";
import { ArrowLeft, Upload, Save } from "lucide-react";

export default function AddNewItemPage() {
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
    <AdminMainLayout><section>
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

              <div>
                <label className="block text-sm font-medium mb-2">
                  Category *
                </label>

                <select
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option>Select Category</option>
                  <option>Electronics</option>
                  <option>Footwear</option>
                  <option>Canned Goods</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Brand *
                </label>

                <select
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option>Select Brand</option>
                  <option>Nike</option>
                  <option>Samsung</option>
                  <option>FoodCorp</option>
                </select>
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
    </section></AdminMainLayout>
  );
}