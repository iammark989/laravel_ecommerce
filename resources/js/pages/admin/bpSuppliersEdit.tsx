import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { Link,usePage,router } from "@inertiajs/react";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function EditSupplierPage() {

    const [ saving, setSaving ] = useState(false);
    const { supplierDetails,supplierList } = usePage().props as any;

    const [supplier, setSupplier] = useState({
        id: supplierDetails.id,
        supplier_code: supplierDetails.supplier_code,
        name: supplierDetails.name,
        contact_person: supplierDetails.contact_person,
        contact_number: supplierDetails.contact_number,
        email: supplierDetails.email,
        tin_number: supplierDetails.tin_number,
        address: supplierDetails.address,
        remarks: supplierDetails.remarks ?? "",
        is_active: supplierDetails.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        // CHECK DUPLICATE
              const productExist = supplierList.some(
            (d: any) =>
                d.id !== supplier.id &&
                d.name.toLowerCase() === supplier.name.toLowerCase()
                );
        
                if (productExist) {
                Swal.fire(
                    "Duplicate",
                    "Suppliers Name Already Exist!.",
                    "warning"
                );
                setSaving(false);
                return;
                }

        router.put(`/admin/supplier/${supplierDetails.id}/save-update`,supplier,{
            onSuccess:()=>{
                  Swal.fire({
                    icon: "success",
                    title: "Supplier Successfully Added!",
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: true,
                }).then(() => {
                    router.get("/admin/supplier/list");
                });
                setSaving(false);
            },
            onError:(error)=>{
                console.log(error);
            }
        });
    };

    return (

        <AdminMainLayout>

            <section className="space-y-6">

                {/* Header */}

                <div className="flex flex-col md:flex-row justify-between gap-4">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Suppliers Information
                        </h1>

                        <p className="text-gray-500">
                            Update supplier information for purchasing transactions.
                        </p>

                    </div>

                    <Link
                        href="/admin/supplier/list"
                        className="border rounded-xl px-5 py-3 flex items-center gap-2"
                    >
                        <ArrowLeft size={18} />

                        Back

                    </Link>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Supplier Information */}

                    <div className="bg-white rounded-2xl shadow-sm p-6">

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">

                        <div>

                            <h2 className="text-xl font-semibold">
                                <span>{supplierDetails.name} </span>
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Supplier Code: <span>{supplierDetails.supplier_code} </span>
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                Created : <span>{new Intl.DateTimeFormat("en-PH", {year: "numeric",month: "long",day: "numeric",}).format(new Date(supplierDetails.created_at))}</span>
                            </p>

                        </div>

                        {/* Status */}

                        <div className="flex items-center gap-3 mt-4 md:mt-0">

                            <span
                                className={`text-sm font-medium ${
                                    supplier.is_active
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {supplier.is_active
                                    ? "Active"
                                    : "Inactive"}
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    setSupplier({
                                        ...supplier,
                                        is_active: !supplier.is_active,
                                    })
                                }
                                className={`relative inline-flex h-7 w-14 rounded-full transition
                                    ${
                                        supplier.is_active
                                            ? "bg-green-500"
                                            : "bg-gray-300"
                                    }`}
                            >

                                <span
                                    className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform
                                        ${
                                            supplier.is_active
                                                ? "translate-x-7"
                                                : ""
                                        }`}
                                />

                            </button>

                        </div>

                    </div>

                        <div className="grid md:grid-cols-2 gap-5">

                            <div>

                                <label className="block mb-2">
                                    Supplier Code
                                </label>

                                <input
                                    readOnly
                                    value={supplier.supplier_code}
                                    className="w-full border rounded-xl px-4 py-3 bg-gray-100"
                                />

                            </div>

                            <div>

                                <label className="block mb-2">
                                    Supplier Name <span className="text-red-500"> *</span>
                                </label>

                                <input
                                    type="text"
                                    value={supplier.name}
                                    onChange={(e)=>
                                        setSupplier({
                                            ...supplier,
                                            name:e.target.value
                                        })
                                    }
                                    className="w-full border rounded-xl px-4 py-3"
                                    required
                                    maxLength={75}
                                />

                            </div>

                            <div>

                                <label className="block mb-2">
                                    Contact Person  <span className="text-red-500"> *</span>
                                </label>

                                <input
                                    type="text"
                                    value={supplier.contact_person}
                                    onChange={(e)=>
                                        setSupplier({
                                            ...supplier,
                                            contact_person:e.target.value
                                        })
                                    }
                                    className="w-full border rounded-xl px-4 py-3"
                                    maxLength={75}
                                    required
                                />

                            </div>

                            <div>

                                <label className="block mb-2">
                                    Contact Number  <span className="text-red-500"> *</span>
                                </label>

                                <input
                                    type="text"
                                    value={supplier.contact_number}
                                    onChange={(e)=>
                                        setSupplier({
                                            ...supplier,
                                            contact_number:e.target.value
                                        })
                                    }
                                    className="w-full border rounded-xl px-4 py-3"
                                    maxLength={25}
                                    required
                                />

                            </div>

                            <div>

                                <label className="block mb-2">
                                    Email Address <span className="text-red-500"> *</span>
                                </label>

                                <input
                                    type="email"
                                    value={supplier.email}
                                    onChange={(e)=>
                                        setSupplier({
                                            ...supplier,
                                            email:e.target.value
                                        })
                                    }
                                    className="w-full border rounded-xl px-4 py-3"
                                />

                            </div>

                            <div>

                                <label className="block mb-2">
                                    TIN Number 
                                </label>

                                <input
                                    type="text"
                                    value={supplier.tin_number}
                                    onChange={(e)=>
                                        setSupplier({
                                            ...supplier,
                                            tin_number:e.target.value
                                        })
                                    }
                                    className="w-full border rounded-xl px-4 py-3"
                                    maxLength={50}
                                />

                            </div>

                        </div>

                        <div className="mt-5">

                            <label className="block mb-2">
                                Company Address
                            </label>

                            <textarea
                                rows={4}
                                value={supplier.address}
                                onChange={(e)=>
                                    setSupplier({
                                        ...supplier,
                                        address:e.target.value
                                    })
                                }
                                className="w-full border rounded-xl px-4 py-3"
                                maxLength={500}
                            />

                        </div>

                    </div>


                    {/* Remarks */}

                    <div className="bg-white rounded-2xl shadow-sm p-6">

                        <h2 className="text-lg font-semibold mb-5">
                            Notes
                        </h2>

                        <textarea
                            rows={4}
                            value={supplier.remarks}
                            onChange={(e)=>
                                setSupplier({
                                    ...supplier,
                                    remarks:e.target.value
                                })
                            }
                            placeholder="Remarks..."
                            className="w-full border rounded-xl px-4 py-3"
                            maxLength={500}
                        />

                    </div>

                    {/* Buttons */}

                    <div className="flex flex-col sm:flex-row justify-end gap-3">

                        <Link
                            href="/admin/supplier/list"
                            type="button"
                            className="border rounded-xl px-6 py-3 text-center"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="bg-sky-600 hover:bg-sky-700 text-white rounded-xl px-6 py-3 flex items-center justify-center gap-2"
                            disabled={saving}
                        >

                            <Save size={18} />

                            {saving ? "Saving..." : "Save Update"}

                        </button>

                    </div>

                </form>

            </section>

        </AdminMainLayout>

    );

}