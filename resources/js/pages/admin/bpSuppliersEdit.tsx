import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { Link,usePage,router } from "@inertiajs/react";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function EditSupplierPage() {

    const { supplierDetails } = usePage().props as any;

    const [supplier, setSupplier] = useState({
        supplier_code: supplierDetails.supplier_code,
        name: supplierDetails.name,
        contact_person: supplierDetails.contact_person,
        contact_number: supplierDetails.contact_number,
        email: supplierDetails.email,
        tin_number: supplierDetails.tin_number,
        address: supplierDetails.address,
        remarks: supplierDetails.remarks,
        is_active: supplierDetails.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        router.post('/admin/supplier/save',supplier,{
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
                            Add Supplier
                        </h1>

                        <p className="text-gray-500">
                            Register a new supplier for purchasing transactions.
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

                        <h2 className="text-lg font-semibold mb-5">
                            Supplier Information
                        </h2>

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

                    {/* Status */}

                    <div className="bg-white rounded-2xl shadow-sm p-6">

                        <h2 className="text-lg font-semibold mb-5">
                            Status
                        </h2>

                        <label className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                checked={supplier.is_active}
                                onChange={(e)=>
                                    setSupplier({
                                        ...supplier,
                                        is_active:e.target.checked
                                    })
                                }
                            />

                            Active Supplier

                        </label>

                    </div>

                    {/* Remarks */}

                    <div className="bg-white rounded-2xl shadow-sm p-6">

                        <h2 className="text-lg font-semibold mb-5">
                            Additional Information
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
                            maxLength={255}
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
                        >

                            <Save size={18} />

                            Save Supplier

                        </button>

                    </div>

                </form>

            </section>

        </AdminMainLayout>

    );

}