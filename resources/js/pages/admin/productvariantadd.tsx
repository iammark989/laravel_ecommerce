import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { Link,usePage,router } from "@inertiajs/react";
import { ArrowLeft, Upload, Save, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import FormCard from "@/components/ui/FormCard";
import PageHeader from "@/components/ui/PageHeader";
import type { FormDataConvertible } from "@inertiajs/core";


export default function AddVariantPage() {
    const [preview, setPreview] = useState<string | null>(null);

    const { products,categories,priceLists,uoms,warehouses } = usePage().props as any;
    const { errors } = usePage().props;
    const [ saving, setSaving ] = useState(false);
    const [ showUomModal, setShowUomModal] = useState(false);
    const [showPriceLists, setShowPriceLists] = useState(false);
    

    interface SellingPrice {
    price_list_id: number;
    price: string;
    [key: string]: FormDataConvertible;
    }

    // form inputs variant price
    const [sellingPrices, setSellingPrices] = useState<SellingPrice[]>(
        priceLists.map((price: any) => ({
            price_list_id: price.id,
            price: "",
        }))
    );

    const handlePriceChange = (
    priceListId: number,
    value: string
    ) => {

        setSellingPrices((prev) =>
            prev.map((item) =>
                item.price_list_id === priceListId
                    ? {
                        ...item,
                        price: value,
                    }
                    : item
            )
        );

    };
    // form inputs product variant
    const [ variant,setVariant ] = useState({
        sku: "",
        barcode: "",
        cost_price: "",
        warehouse_id:"",
        variant_name:"",
        is_active:true,
        image:  null as File | null,
        quantity_on_hand:"",
        reorder_level:"",
        //base_uom_id:"",
        selling_uom_id:"",
        purchasing_uom_id:"",
        selling_qty:"",
        purchasing_qty:"",
    });

    const [ errorMsg,setErrorMsg]=useState("");

    const submitHandle = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true)

        const payload = {
        ...variant,
        sellingPrices,
        };

        router.post(`/admin/product/${products.slug}/variants/save`,payload,{

            onSuccess:()=>{
                setSaving(false);
            },
            onError:(errors)=>{
                setSaving(false);
                setErrorMsg(errors.errorMsg);
                //console.log(errors);
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


    
// UOM
const [ uom, setUom] = useState({
    code:"",
    description:"",
    is_active:true,
});
const saveUom = (e: React.FormEvent) => {
    e.preventDefault();

    router.post('/admin/product/create-uom',uom,{

        onSuccess: () => {
            //console.log('success');
            setShowUomModal(false);
            setUom({
                code:"",
                description:"",
                is_active:true,
            });
        },
        onError: (error) => {
            //console.log(error);
        },

    });

    };

    return (
        <AdminMainLayout>
            <div className="min-h-screen bg-slate-50 p-4 md:p-6">

                {/* Header */}
                <PageHeader title="Add Product Variant" description="Create a new product variant.">
                    <Link 
                    className="flex items-center gap-2 border px-4 py-2 rounded-xl bg-white hover:bg-slate-100"
                    href={`/admin/product/${products.slug}/details`}
                    >
                        <ArrowLeft size={18} />Back
                        </Link> 
                </PageHeader>

               

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
                <div className="space-y-6">
                <FormCard
                    title="Variant Information"
                    
                >
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
                                        className="w-full border rounded-xl px-4 py-3"
                                        placeholder="NIKE-BLK-8"
                                        required
                                        maxLength={16}
                                        minLength={6}
                                        value={variant.sku}
                                        onChange={(e) => setVariant({...variant, sku: e.target.value})}
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
                                        className="w-full border rounded-xl px-4 py-3"
                                        placeholder="123456789"
                                        min={4}
                                        maxLength={50}
                                        value={variant.barcode}
                                        onChange={(e) => setVariant({...variant, barcode: e.target.value})}
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
                                    className="w-full border rounded-xl px-4 py-3"
                                    placeholder="Black Size 8"
                                    required
                                    minLength={6}
                                    maxLength={50}
                                    value={variant.variant_name}
                                    onChange={(e) => setVariant({...variant, variant_name: e.target.value})}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Cost Price <span className="text-red-500"> *</span>
                                    </label>

                                    <input
                                        type="number"
                                        className="w-full border rounded-xl px-4 py-3"
                                        placeholder="3000.00"
                                        required
                                        maxLength={12}
                                        value={variant.cost_price}
                                        onChange={(e) => setVariant({...variant, cost_price: e.target.value})}
                                    />
                                </div>

                                {/* Pricing */}

                                <div className="rounded-2xl border bg-white shadow-sm">

                                    {/* Header */}

                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between p-5 border-b">

                                        <div>

                                            <h2 className="text-lg font-semibold">
                                                Selling Price Lists
                                            </h2>

                                            <p className="text-sm text-gray-500">
                                                Configure multiple selling prices for this product variant.
                                            </p>

                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setShowPriceLists(!showPriceLists)}
                                            className="mt-4 md:mt-0 inline-flex items-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-700 px-4 py-2 text-white transition"
                                        >

                                            {showPriceLists ? (
                                                <>
                                                    Hide Price Lists
                                                    <ChevronUp size={18} />
                                                </>
                                            ) : (
                                                <>
                                                    Manage Price Lists
                                                    <ChevronDown size={18} />
                                                </>
                                            )}

                                        </button>

                                    </div>

                                    {/* Summary 

                                    <div className="p-5">

                                        <div className="space-y-2 text-sm">

                                            <div className="flex justify-between">

                                                <span className="text-gray-500">
                                                    Retail
                                                </span>

                                                <span className="font-medium">
                                                    ₱500.00
                                                </span>

                                            </div>

                                            <div className="flex justify-between">

                                                <span className="text-gray-500">
                                                    Wholesale
                                                </span>

                                                <span className="font-medium">
                                                    ₱470.00
                                                </span>

                                            </div>

                                            <div className="flex justify-between">

                                                <span className="text-gray-500">
                                                    Terms
                                                </span>

                                                <span className="font-medium">
                                                    ₱480.00
                                                </span>

                                            </div>

                                        </div>

                                    </div>*/}

                                    {/* Collapsible Section */}

                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${
                                            showPriceLists
                                                ? "max-h-[700px] opacity-100 border-t"
                                                : "max-h-0 opacity-0"
                                        }`}
                                    >

                                        <div className="p-5">

                                            {/* Header */}

                                            <div className="flex items-center justify-between mb-5">

                                                <div>

                                                    <h3 className="font-semibold">
                                                        Price List
                                                    </h3>

                                                    <p className="text-sm text-gray-500">
                                                        Add or update selling prices.
                                                    </p>

                                                </div>

                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 px-4 py-2 text-white transition"
                                                >

                                                    <Plus size={18} />

                                                    Price Type

                                                </button>

                                            </div>

                                            {/* Price Inputs */}

                                            <div className="space-y-4">

                                                {priceLists.map((price: any) => {

                                                const currentPrice = sellingPrices.find(
                                                    p => p.price_list_id === price.id
                                                );

                                                return (

                                                    <div
                                                        key={price.id}
                                                        className="grid md:grid-cols-2 gap-4 items-center"
                                                    >

                                                        <div className="font-medium">

                                                            {price.description}

                                                        </div>

                                                        <input
                                                            type="number"
                                                            placeholder="0.00"
                                                            value={currentPrice?.price ?? ""}
                                                            onChange={(e) =>
                                                                handlePriceChange(
                                                                    price.id,
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="border rounded-xl px-4 py-3"
                                                            required
                                                        />

                                                    </div>

                                                );

                                            })}
                                                

                                            </div>
                                             

                                        </div>

                                    </div>

                                </div>

                                

                            </div>

                        </div>

                        {/* Right Side */}

                        <div className="space-y-5">

                            {/* Status */}
                            <div className="flex items-center justify-between rounded-xl border bg-gray-50 p-4">
                                <div>
                                    <p className="font-medium text-gray-800">
                                        Variant Status
                                    </p>
                                    
                                </div>

                                <div className="flex items-center gap-4">
                                    <span
                                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                                            variant.is_active
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {variant.is_active ? "Active" : "Inactive"}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setVariant({
                                                ...variant,
                                                is_active: !variant.is_active,
                                            })
                                        }
                                        className={`relative h-8 w-14 rounded-full transition-colors duration-300 ${
                                            variant.is_active
                                                ? "bg-sky-500"
                                                : "bg-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow transition-transform duration-300 ${
                                                variant.is_active
                                                    ? "translate-x-6"
                                                    : ""
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>

                         {/* Image Upload */}

                            <div className="border rounded-2xl p-5">

                                <h2 className="font-semibold mb-4">
                                    Variant Image
                                </h2>

                                <label className="border-2 border-dashed rounded-xl h-56 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500">

                                    {variant.image ? (
                                        <img
                                            src={URL.createObjectURL(variant.image)}
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
                                        onChange={(e) => setVariant({...variant, image: e.target.files?.[0] || null,})}
                                    />

                                </label>

                            </div>

                            {/* Information 

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
                            </div>*/}

                        </div>

                    </div>
                     </FormCard>                       
                    <FormCard
                        title="Inventory Configuration"
                    >
                         {/* Warehouse */}
                         <div className="grid lg:grid-cols-3 gap-6">
                             <div className="lg:col-span-2 space-y-5">

                                 {/** LEFT SIDE */}           
                                 <div className="grid md:grid-cols-2 gap-4">

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Quantity On Hand <span className="text-red-500"> *</span>
                                    </label>

                                    <input
                                        type="number"
                                        className="w-full border rounded-xl px-4 py-3"
                                        placeholder="20"
                                        maxLength={6}
                                        required
                                        value={variant.quantity_on_hand}
                                        onChange={(e) => setVariant({...variant, quantity_on_hand: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Reorder Level <span className="text-red-500"> *</span>
                                    </label>

                                    <input
                                        type="number"
                                        className="w-full border rounded-xl px-4 py-3"
                                        placeholder="5"
                                        required
                                        maxLength={5}
                                        value={variant.reorder_level}
                                        onChange={(e) => setVariant({...variant, reorder_level: e.target.value})}
                                    />
                                </div>
                            </div>
                              {/* Unit of Measure */}

                            <div className="bg-slate-50 border rounded-2xl p-5">

                                <div className="mb-5">

                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">

                                    <div>

                                        <h3 className="text-lg font-semibold">
                                            Unit of Measure (UoM)
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            Configure the default selling and purchasing units for this variant.
                                        </p>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setShowUomModal(true)}
                                        className="mt-3 md:mt-0 inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl transition"
                                    >

                                        <Plus size={18} />

                                        Add UoM

                                    </button>

                                </div>

                                </div>

                                {/* Base Unit 

                                <div className="mb-6">

                                    <label className="block text-sm font-medium mb-2">
                                        Base Unit <span className="text-red-500">*</span>
                                        
                                       
                                    </label>

                                    <select
                                        className="w-full border rounded-xl px-4 py-3"
                                        value={variant.base_uom_id}
                                        onChange={(e) =>
                                            setVariant({
                                                ...variant,
                                                base_uom_id: e.target.value,
                                            })
                                        }
                                        required
                                    >
                                        <option value="">Select Base Unit</option>
                                        {uoms.map((uom: any) => (
                                         <option key={uom.id} value={uom.id}>
                                            {uom.description}
                                            </option>       
                                        ))}
                                       
                                    </select>

                                </div>*/}

                                <div className="grid lg:grid-cols-2 gap-6">

                                    {/* Selling */}

                                    <div className="border rounded-xl p-4">

                                        <h4 className="font-semibold mb-4">
                                            Selling Unit
                                        </h4>

                                        <div className="grid grid-cols-2 gap-4">

                                            <div>

                                                <label className="block text-sm mb-2">
                                                    Unit
                                                </label>

                                                <select
                                                    className="w-full border rounded-xl px-4 py-3"
                                                    value={variant.selling_uom_id}
                                                    onChange={(e) =>
                                                        setVariant({
                                                            ...variant,
                                                            selling_uom_id: e.target.value,
                                                        })
                                                    }
                                                    required
                                                >

                                                    <option value="">Select Unit</option>

                                                    {uoms.map((uom: any) => (
                                                        <option key={uom.id} value={uom.id}>{uom.description}</option>
                                                    ))}

                                                </select>

                                            </div>

                                            <div>

                                                <label className="block text-sm mb-2">
                                                    Quantity
                                                </label>

                                                <input
                                                    type="number"
                                                    min="1"
                                                    className="w-full border rounded-xl px-4 py-3"
                                                    value={variant.selling_qty}
                                                    onChange={(e) =>
                                                        setVariant({
                                                            ...variant,
                                                            selling_qty: e.target.value,
                                                        })
                                                    }
                                                    required
                                                />

                                            </div>

                                        </div>

                                    </div>

                                    {/* Purchasing */}

                                    <div className="border rounded-xl p-4">

                                        <h4 className="font-semibold mb-4">
                                            Purchasing Unit
                                        </h4>

                                        <div className="grid grid-cols-2 gap-4">

                                            <div>

                                                <label className="block text-sm mb-2">
                                                    Unit
                                                </label>

                                                <select
                                                    className="w-full border rounded-xl px-4 py-3"
                                                    value={variant.purchasing_uom_id}
                                                    onChange={(e) =>
                                                        setVariant({
                                                            ...variant,
                                                            purchasing_uom_id: e.target.value,
                                                        })
                                                    }
                                                    required
                                                >

                                                    <option value="Pc">Select Unit</option>

                                                   {uoms.map((uom: any)=>(
                                                    <option key={uom.id} value={uom.id}>{uom.description}</option>
                                                   ))}

                                                </select>

                                            </div>

                                            <div>

                                                <label className="block text-sm mb-2">
                                                    Quantity
                                                </label>

                                                <input
                                                    type="number"
                                                    min="1"
                                                    className="w-full border rounded-xl px-4 py-3"
                                                    value={variant.purchasing_qty}
                                                    onChange={(e) =>
                                                        setVariant({
                                                            ...variant,
                                                            purchasing_qty: e.target.value,
                                                        })
                                                    }
                                                    required
                                                />

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="mt-5 rounded-xl bg-blue-50 border border-blue-200 p-4">

                                    <p className="text-sm text-blue-700">

                                        <strong>Example:</strong>

                                        Base Unit: <strong>Piece</strong><br />

                                        Selling: <strong>1 Piece</strong><br />

                                        Purchasing: <strong>1 Case = 48 Pieces</strong>

                                    </p>

                                </div>

                            </div>                   
                            
                   
                </div>
              {/** right side */}
                 <div className="space-y-5">
                                

                                    <div className="rounded-2xl border bg-white p-6 shadow-sm">

                                    <div className="flex items-center justify-between mb-5">

                                    <div>

                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Warehouse
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Select where this inventory will be stored.
                                        </p>

                                    </div>

                                    <button
                                        type="button"
                                        className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
                                    >
                                        Manage Warehouses
                                    </button>

                                </div>

                                <label className="block text-sm font-medium mb-2">
                                    Default Warehouse <span className="text-red-500">*</span>
                                </label>

                                <select
                                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                                   required
                                   value={variant.warehouse_id}    
                                   onChange={(e) => setVariant({...variant, warehouse_id: e.target.value})}             
                                >
                                    <option value="">Select Warehouse</option>
                                    {warehouses.map((warehouse:any)=>(
                                        <option key={warehouse.id} value={warehouse.id}>
                                            {warehouse.warehouse_code} - {warehouse.name}</option>
                                    ))}
                                </select>

                                {/*<div className="mt-4 rounded-xl bg-slate-50 p-4 border">

                                    <div className="flex justify-between">

                                        <span className="text-gray-500">
                                            Warehouse Code
                                        </span>

                                        <span className="font-medium">
                                            WH-001
                                        </span>

                                    </div>

                                    <div className="flex justify-between mt-2">

                                        <span className="text-gray-500">
                                            Location
                                        </span>

                                        <span className="font-medium">
                                            Main Warehouse
                                        </span>

                                    </div>

                                </div>*/}
                            </div>       
                             </div>
                
                    </div>
                    </FormCard>

                    {/* Buttons */}

                    <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row gap-3 justify-end">

                        <Link
                        href={`/admin/product/${products.slug}/details`}
                        type="button"
                        className="px-6 py-3 bg-white border rounded-xl hover:bg-gray-100">
                            Cancel
                        </Link>

                       
                        <button disabled={saving} className="hover:cursor-pointer px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl flex items-center justify-center gap-2">
                            <Save size={18} />
                            {saving ? "Saving..." : "Save Variant"}
                        </button>
                                             
                        
                    </div>
                    

                </div>
                      </form>     
                                    
            </div>

            
            {/** MODAL ADD UOM */}
{showUomModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">

                        {/* Header */}

                        <div className="flex justify-between items-center border-b p-5">

                            <div>

                                <h2 className="text-xl font-semibold">
                                    Add Unit of Measure
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Create a new Unit of Measure.
                                </p>

                            </div>

                            <button
                                onClick={() => setShowUomModal(false)}
                                className="text-gray-500 hover:text-red-500"
                            >
                                ✕
                            </button>

                        </div>

                        {/* Body */}
                        <form onSubmit={saveUom}>
                        <div className="p-6 space-y-5">

                            <div>

                                <label className="block mb-2 font-medium">
                                    UoM Code <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    placeholder="PC"
                                    value={uom.code}
                                    onChange={(e) => setUom({...uom, code: e.target.value})}
                                    className="w-full border rounded-xl px-4 py-3 uppercase"
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-medium">
                                    Description <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    value={uom.description}
                                    onChange={(e) => setUom({...uom, description: e.target.value})}
                                    placeholder="Piece"
                                    className="w-full border rounded-xl px-4 py-3"
                                />

                            </div>

                            <div className="flex items-center justify-between rounded-xl border p-4">

                                <div>

                                    <h4 className="font-medium">
                                        Status
                                    </h4>

                                    <p className="text-sm text-gray-500">
                                        Enable this Unit of Measure.
                                    </p>

                                </div>

                                <div className="flex items-center gap-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-medium ${
                                                uom.is_active
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {uom.is_active ? "Active" : "Inactive"}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setUom({
                                                    ...uom,
                                                    is_active: !uom.is_active,
                                                })
                                            }
                                            className={`relative h-8 w-14 rounded-full transition-colors duration-300 hover:cursor-pointer ${
                                                uom.is_active
                                                    ? "bg-sky-500"
                                                    : "bg-gray-300"
                                            }`}
                                        >
                                            <span
                                                className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow transition-transform duration-300 ${
                                                    uom.is_active
                                                        ? "translate-x-6"
                                                        : ""
                                                }`}
                                            />
                                            
                                        </button>
                                    </div>

                            </div>

                        </div>

                        {/* Footer */}

                        <div className="flex justify-end gap-3 border-t p-5">

                            <button
                                type="button"
                                onClick={() => setShowUomModal(false)}
                                className="border rounded-xl px-5 py-2"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="bg-sky-600 hover:bg-sky-700 hover:cursor-pointer text-white rounded-xl px-5 py-2"
                            >
                                Save UoM
                            </button>

                        </div>
                           </form>
                    </div>
                        
                </div>

                )}
        </AdminMainLayout>
    );
}