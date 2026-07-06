import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { useState } from "react";
import { ArrowLeft, Upload, Save, Plus, X, Edit } from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";


export default function ProductvariantDetailsPage() {
  const [preview, setPreview] = useState<string | null>(null);

  const { categories,brands,products,allProducts,variants } = usePage().props as any;

  const [ showCategoryModal,setShowCategoryModal] = useState(false);

  const [ showBrandModal, setShowBrandModal ] = useState(false);

  const [ editOn, setEditOn ] = useState(false);

  const [ saving, setSaving ] = useState(false);

const [ product, setProduct ] = useState({
    'id' : products.id,
      'category_id': products.category_id,
      'brand_id': products.brand_id,
      'name':products.name,
      'short_description':products.short_description,
      'description':products.description,
      'featured_image':  null as File | null,
      'is_active':products.is_active,
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
      setSaving(true);
      // CHECK DUPLICATE
      const categoryExist = categories.some(
      (d: any) => d.name.toLowerCase() === category.name.toLowerCase()
    );

    if (categoryExist) {
      Swal.fire("Duplicate", "Category already exists", "warning");
      return;
    }

      router.post('/admin/product/add-category',category,{
      preserveScroll: true,
        onSuccess: () => {
          setCategory({
            name:"",
            description:"",
          });
          setShowCategoryModal(false);
          setSaving(false);
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
      setSaving(true);
      // CHECK DUPLICATE
      const brandExist = brands.some(
      (d: any) => d.name.toLowerCase() === brand.name.toLowerCase()
    );

    if (brandExist) {
      Swal.fire("Duplicate", "Brand Name already exists", "warning");
      return;
    }

      router.post('/admin/product/add-brand',brand,{
      preserveScroll: true,
        onSuccess: () => {
          setBrand({
            name:"",
            logo: null as File | null,
            description:"",
          });
          setShowBrandModal(false);
          setSaving(false);
          
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
      const productExist = allProducts.some(
    (d: any) =>
        d.id !== product.id &&
        d.name.toLowerCase() === product.name.toLowerCase()
        );

        if (productExist) {
        Swal.fire(
            "Duplicate",
            "Product already exists.",
            "warning"
        );
        return;
        }

    setSaving(true);
  router.post(`/admin/product/${products.slug}/save`,{...product,_method: "put",},{
    forceFormData: true,
    
    onSuccess: () =>{
      Swal.fire({
            title:"Product updated successfully.",
             timer: 1500,
      });
      
      setSaving(false);
      setEditOn(false);

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
            {products.name} Product Details
          </h1>

          <p className="text-gray-500">
            View and Edit product details in the master list
          </p>
        </div>

        <Link
          href="/admin/product/list"
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
                Product Name <span className="text-red-500"> *</span>
              </label>

              <input
                type="text"
                value={product.name}
                onChange={(e) => setProduct({...product, name: e.target.value})}
                placeholder="Enter Product Name"
                className={`w-full border rounded-xl px-4 py-3 ${!editOn ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} `}
                maxLength={50}
                disabled={!editOn}
               
              />
            </div>


           {/* Category & Brand */}

            <div className="grid md:grid-cols-2 gap-4">

              {/* Category */}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Category <span className="text-red-500"> *</span>
                </label>

                <div className="flex gap-2">

                  <select
                    className={`flex-1 border rounded-xl px-4 py-3 ${!editOn ? 'bg-gray-100 cursor-not-allowed' : 'bg-white' }`}
                    
                    required
                    value={product.category_id}
                    onChange={(e) => setProduct({...product, category_id: e.target.value})}
                    disabled={!editOn}
                  >
                    <option value="" >Select Category</option>
                    {categories.map((category: any) => (
                    <option key={category.id} value={category.id}>
                       {category.name.toUpperCase()}
                    </option>
                    ))}
                  </select>

                  <button
                    hidden={!editOn}
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
                  Brand <span className="text-red-500"> *</span>
                </label>

                <div className="flex gap-2">

                  <select
                    className={`flex-1 border rounded-xl px-4 py-3 ${!editOn ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                    disabled={!editOn}
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
                  hidden={!editOn}
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
                className={`w-full border rounded-xl px-4 py-3 ${!editOn ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                placeholder="Short summary..."
                required
                value={product.short_description}
                onChange={(e) => setProduct({...product, short_description: e.target.value})}
                maxLength={255}
                disabled={!editOn}
              />
            </div>

            {/* Description */}

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>

              <textarea
                rows={8}
                className={`w-full border rounded-xl px-4 py-3 ${!editOn ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                placeholder="Full product description..."
                required
                value={product.description}
                onChange={(e) => setProduct({...product, description: e.target.value})}
                maxLength={1000}
                disabled={!editOn}
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
                    {!product.featured_image ? (
                        <img
                            src={`${import.meta.env.VITE_IMAGE_URL}/files/product_images/${products.featured_image}`}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    ) : (
                        <img
                            src={URL.createObjectURL(product.featured_image)}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    )}

                    {!products.featured_image && !product.featured_image && (
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
                                featured_image:
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
                           disabled={!editOn}
                            type="button"
                            onClick={() =>
                                setProduct({
                                    ...product,
                                    is_active: !product.is_active,
                                })
                            }
                            className={`relative h-8 w-14 rounded-full transition-colors duration-300 ${!editOn ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer' } ${
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

            

          </div>

        </div>

        {/* Buttons */}

        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row gap-3 justify-end">
           
           <Link
          href="/admin/product/list"
            className="px-6 py-3 border rounded-xl hover:bg-gray-100"
          >
            Cancel
          </Link>
            
            
                <button
                    onClick={function(){setEditOn(true)}}
                    type="button"
                    className="px-6 py-3 bg-sky-500 hover:bg-sky-600 hover:cursor-pointer text-white rounded-xl flex items-center justify-center gap-2"     
                    hidden={editOn}
                >
                    <Edit size={18} />
                    Edit
            </button>
            
            <button
                    type="submit"
                    className="px-6 py-3 bg-sky-500 hover:bg-sky-600 hover:cursor-pointer text-white rounded-xl flex items-center justify-center gap-2"
                    disabled={saving}
                    hidden={!editOn}           
                >
                    <Save size={18} />
                    {!saving ? "Save" : "Saving..."}
            </button> 
            
                             
        </div>
               
      </div>
       
          </form>  



          {/* Product Variants */}
            <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            Product Variants
                        </h2>

                        <p className="text-gray-500">
                            Manage product sizes, prices, and inventory.
                        </p>
                    </div>

                    <Link
                        href={`/admin/product/${products.slug}/variants/add`}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl"
                    >
                        <Plus size={18} />
                        Add Variant
                    </Link>
                </div>

                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b text-left text-sm text-gray-500">
                                <th className="py-3">Image</th>
                                <th className="py-3">SKU</th>
                                <th className="py-3">Variant Name</th>
                                <th className="py-3">Price</th>
                                <th className="py-3">Stocks</th>
                                <th className="py-3">Status</th>
                                <th className="py-3 text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {variants.map((variant: any) => (
                                <tr
                                    key={variant.id}
                                    className="border-b hover:bg-slate-50"
                                >
                                    <td className="py-4">
                                        <img
                                            src={`${import.meta.env.VITE_IMAGE_URL}/files/variant_images/${variant.image}`}
                                            className="w-14 h-14 rounded-xl object-cover border"
                                        />
                                    </td>

                                    <td className="font-medium">
                                        {variant.sku}
                                    </td>

                                    <td>
                                        {variant.variant_name}
                                    </td>

                                    <td>
                                        ₱
                                        {Number(
                                            variant.selling_price
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {variant.quantity_on_hand}
                                    </td>

                                    <td>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                variant.is_active
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {variant.is_active
                                                ? "Active"
                                                : "Inactive"}
                                        </span>
                                    </td>

                                    <td className="text-right">
                                        <Link
                                            href={`/admin/product/${products.slug}/variants/${variant.id}`}
                                            className="inline-flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-slate-100"
                                        >
                                            <Edit size={16} />
                                            Details
                                        </Link>
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
                            className="border rounded-2xl p-4"
                        >
                            <div className="flex gap-4">

                                <img
                                    src={`${import.meta.env.VITE_IMAGE_URL}/files/variant_images/${variant.image}`}
                                    className="w-20 h-20 rounded-xl object-cover border"
                                />

                                <div className="flex-1">

                                    <h3 className="font-semibold">
                                        {variant.variant_name}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {variant.sku}
                                    </p>

                                    <p className="mt-2 font-medium text-sky-600">
                                        ₱
                                        {Number(
                                            variant.selling_price
                                        ).toFixed(2)}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Stocks:
                                        {" "}
                                        {variant.quantity_on_hand}
                                    </p>

                                    <span
                                        className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${
                                            variant.is_active
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {variant.is_active
                                            ? "Active"
                                            : "Inactive"}
                                    </span>
                                </div>
                            </div>

                            <Link
                                href={`/admin/product/${products.slug}/variants/${variant.id}`}
                                className="mt-4 w-full flex items-center justify-center gap-2 border rounded-xl py-3 hover:bg-slate-100"
                            >
                                <Edit size={16} />
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {variants.length === 0 && (
                    <div className="text-center py-16">
                        <h3 className="text-lg font-semibold text-gray-700">
                            No variants found
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Create your first product variant.
                        </p>

                        <Link
                            href={`/admin/product/${products.slug}/variants/add`}
                            className="inline-flex items-center gap-2 mt-5 px-5 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl"
                        >
                            <Plus size={18} />
                            Add Variant
                        </Link>
                    </div>
                )}

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
              
            </div>

            <div className="border-t p-6 flex justify-end gap-3">
                
                <button
                     type="button"
                     onClick={closeCategory}
                    className="px-5 py-3 bg-white hover:bg-gray-100 border rounded-xl"
                    >
                    Cancel
                </button>
                    {!saving ?
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

            </div>

            <div className="border-t p-6 flex justify-end gap-3">
                <button
                     type="button"
                     onClick={closeBrand}
                    className="px-5 py-3 bg-white hover:bg-gray-100 border rounded-xl"
                    >
                    Cancel
                </button>              
            
                 {!saving ?
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

       