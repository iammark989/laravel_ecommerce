import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { useState } from "react";
import { ArrowLeft, Upload, Save, Plus, X } from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";


export default function AddNewItemPage() {
  const [preview, setPreview] = useState<string | null>(null);

  const { categories,brands,products } = usePage().props as any;

  const [ showCategoryModal,setShowCategoryModal] = useState(false);

  const [ showBrandModal, setShowBrandModal ] = useState(false);

  const [ save, setSave ] = useState(false);

const [ product, setProduct ] = useState({
      'category_id':"",
      'brand_id':"",
      'name':"",
      'short_description':"",
      'description':"",
      'featured_image':  null as File | null,
      'is_active':true,
});

const [ category, setCategory ] = useState({
  name:"",
  description:"",

});

const [ brand, setBrand ] = useState({
  name: "",
  description:"",
  logo: null as File | null,
});

    // ADD CATEGORY
const handleSubmitCategory = (e: React.FormEvent) => {
      e.preventDefault();
      setSave(true);
      // CHECK DUPLICATE
      const categoryExist = categories.some(
      (d: any) => d.name.toLowerCase() === category.name.toLowerCase()
    );

    if (categoryExist) {
      Swal.fire("Duplicate", "Category already exists", "warning");
      return;
    }

      router.post('/admin/products/add-category',category,{
      preserveScroll: true,
        onSuccess: () => {
          setCategory({
            name:"",
            description:"",
          });
          setShowCategoryModal(false);
          setSave(false);
        },
        onError: (error) => {
         
        },
      });
}

function closeCategory(){
      setShowCategoryModal(false);
      setCategory({
        name:"",
        description:"",
      });
}


    // ADD BRAND
const handleSubmitBrand = (e: React.FormEvent) => {
      e.preventDefault();
      setSave(true);
      // CHECK DUPLICATE
      const brandExist = brands.some(
      (d: any) => d.name.toLowerCase() === brand.name.toLowerCase()
    );

    if (brandExist) {
      Swal.fire("Duplicate", "Brand Name already exists", "warning");
      return;
    }

      router.post('/admin/products/add-brand',brand,{
      preserveScroll: true,
        onSuccess: () => {
          setBrand({
            name:"",
            logo: null as File | null,
            description:"",
          });
          setShowBrandModal(false);
          setSave(false);
        },
        onError: (error) => {
          
        },
      });
}

function closeBrand(){
    setShowBrandModal(false);
    setBrand({
      name:"",
      logo: null as File | null,
      description:"",
    }); 
}

const handleSubmitProduct = (e: React.FormEvent) => {
  e.preventDefault();

   // CHECK DUPLICATE
      const productExist = products.some(
      (d: any) => d.name.toLowerCase() === product.name.toLowerCase()
    );

    if (productExist) {
      Swal.fire("Duplicate", "Product Already exists", "warning");
      return;
    }

  router.post('/admin/products/add-product',product,{

    onSuccess: () =>{
      setProduct({
      'category_id':"",
      'brand_id':"",
      'name':"",
      'short_description':"",
      'description':"",
      'featured_image':  null as File | null,
      'is_active':true,
      });
    },
    onError: (error) => {
      //console.log(error);
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
    <AdminMainLayout><section>
      

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

        <Link
          href="/admin/item-masterlist"
          className="flex items-center gap-2 border px-4 py-2 rounded-xl bg-white hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

      </div>

      {/* Form */}
      <form onSubmit={handleSubmitProduct} >
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
                value={product.name}
                onChange={(e) => setProduct({...product, name: e.target.value})}
                placeholder="Enter Product Name"
                className="w-full border rounded-xl px-4 py-3"
                maxLength={50}
              />
            </div>

            {/* Slug 

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
              */}

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
                    required
                    value={product.category_id}
                    onChange={(e) => setProduct({...product, category_id: e.target.value})}
                  >
                    <option value="" >Select Category</option>
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
                    required
                    value={product.brand_id}
                    onChange={(e) => setProduct({...product, brand_id: e.target.value})}
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand: any) => (
                    <option key={brand.id} value={brand.id}>
                       {brand.name.toUpperCase()}
                    </option>
                    ))}
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
                required
                value={product.short_description}
                onChange={(e) => setProduct({...product, short_description: e.target.value})}
                maxLength={255}
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
                required
                value={product.description}
                onChange={(e) => setProduct({...product, description: e.target.value})}
                maxLength={1000}
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

                {product.featured_image ? (
                  <img
                    src={URL.createObjectURL(product.featured_image)}
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
                  onChange={(e) => setProduct({...product, featured_image: e.target.files?.[0] || null,})}
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
                            className={`relative h-8 w-14 rounded-full transition-colors duration-300 ${
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

          <Link
          href="/admin/item-masterlist"
            className="px-6 py-3 border rounded-xl"
          >
            Cancel
          </Link>

          <button
            className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl flex items-center justify-center gap-2"
          >
            <Save size={18} />
            Save Product
          </button>

        </div>
               
      </div>
            </form>     
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
                    onClick={closeCategory}
                    className="text-gray-500 text-xl"
                >
                    <X size={25} />
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
                     type="button"
                     onClick={closeCategory}
                    className="px-5 py-3 bg-white hover:bg-gray-100 border rounded-xl"
                    >
                    Cancel
                </button>
                    {!save ?
                <button
                    className="px-5 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl"  
                >
                   Save Category
                </button>
                    :
                    <button
                    className="px-5 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl"  
                      disabled
                >
                   Saving...
                   </button>
                    }
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
                    onClick={closeBrand}
                    className="text-gray-500 text-xl"
                >
                    <X size={25} />
                </button>

            </div>
                   <form onSubmit={handleSubmitBrand}>
            <div className="p-6 space-y-5">
                 
                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Name <span className="text-red-500"> *</span>
                    </label>

                    <input
                        type="text"
                        value={brand.name}
                        onChange={(e) => setBrand({...brand, name: e.target.value})}
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="Nike"
                        required
                        maxLength={30}
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Logo
                    </label>

                    <label className="border-2 border-dashed rounded-xl h-44 flex flex-col justify-center items-center cursor-pointer">

                        {brand.logo ? (
                            <img
                                src={URL.createObjectURL(brand.logo)}
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
                            onChange={(e) => setBrand({...brand, logo: e.target.files?.[0] || null,})}
                        />

                    </label>

                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Description
                    </label>

                    <textarea
                        rows={4}
                        value={brand.description}
                        onChange={(e) => setBrand({...brand, description: e.target.value})}
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
                        
                </div>*/}

            </div>

            <div className="border-t p-6 flex justify-end gap-3">
                <button
                     type="button"
                     onClick={closeBrand}
                    className="px-5 py-3 bg-white hover:bg-gray-100 border rounded-xl"
                    >
                    Cancel
                </button>              
            
                 {!save ?
                 <button
                    className="px-5 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl"
                >
                    Save Brand
                </button>
                  : 
                  <button
                    className="px-5 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl"
                    disabled
                >
                    Saving...
                </button>
                   }             
               
            </div>
              </form>
        </div>

    </div>
)}
    </section></AdminMainLayout>
  );
}

       