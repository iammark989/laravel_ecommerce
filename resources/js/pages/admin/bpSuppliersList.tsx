import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { Link,usePage,router } from "@inertiajs/react";
import { useState } from "react";
import {
    Plus,
    Search,
    Eye,
    Building2,
} from "lucide-react";


export default function SupplierListPage() {
    const { suppliersList, filters: initialFilters } = usePage().props as any;

        const [filters, setFilters] = useState(
            initialFilters ?? {
                search: "",
                status: "all",
                per_page: 10,
            }
        );

    const updateFilters = (field: string, value: any) => {

    const newFilters = {
        ...filters,
        [field]: value,
    };

    setFilters(newFilters);

    router.get(
        "/admin/supplier/list",
        newFilters,
        {
            preserveState: true,
            replace: true,
        }
    );
};

    return (

        <AdminMainLayout>

            <section className="space-y-6">

                {/* Header */}

                <div className="flex flex-col md:flex-row justify-between gap-4">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Suppliers
                        </h1>

                        <p className="text-gray-500">
                            Manage supplier information used for purchasing.
                        </p>

                    </div>

                    <Link
                        href="/admin/supplier/new"
                        className="bg-sky-600 hover:bg-sky-700 text-white rounded-xl px-5 py-3 flex items-center gap-2"
                    >
                        <Plus size={18} />

                        Add Supplier

                    </Link>

                </div>

                {/* Filters */}

                <div className="bg-white rounded-2xl shadow-sm p-5">

                    <div className="grid md:grid-cols-3 gap-4">

                        <div className="relative">

                            <Search
                                className="absolute left-3 top-3.5 text-gray-400"
                                size={18}
                            />

                            <input
                                type="text"
                                value={filters.search}
                                onChange={(e) => updateFilters("search", e.target.value)}
                                placeholder="Search supplier..."
                                className="w-full border rounded-xl pl-10 pr-4 py-3"
                            />

                        </div>

                        <select
                            className="border rounded-xl px-4 py-3"
                            value={filters.status}
                             onChange={(e) => { const value = e.target.value; 
                                  const newFilters = {
                                        ...filters,
                                        status: value,
                                    };
                                    setFilters(newFilters);
                                router.get('/admin/supplier/list',
                                    newFilters,
                                    {preserveState:true, replace:true,});
                            }}
                        >

                            <option value='all'>
                                All Status
                            </option>

                            <option value='active'>
                                Active
                            </option>

                            <option value='inactive'>
                                Inactive
                            </option>

                        </select>

                        <select
                            value={filters.per_page}
                            onChange={(e) => { const value = e.target.value; 
                                  const newFilters = {
                                        ...filters,
                                        per_page: value,
                                    };
                                    setFilters(newFilters);
                                router.get('/admin/supplier/list',
                                    newFilters,
                                    {preserveState:true, replace:true,});
                            }}
                            className="border rounded-xl px-4 py-3"
                        >

                            <option value="10">
                                10 Per Page
                            </option>

                            <option value="25">
                                25 Per Page
                            </option>

                            <option value="50">
                                50 Per Page
                            </option>

                        </select>

                    </div>

                </div>

                {/* Table */}

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="min-w-full">

                            <thead className="bg-slate-100">

                                <tr>

                                    <th className="p-4 text-left">
                                        Supplier Code
                                    </th>

                                    <th className="p-4 text-left">
                                        Supplier Name
                                    </th>

                                    <th className="p-4 text-left">
                                        Contact Person
                                    </th>

                                    <th className="p-4 text-left">
                                        Contact Number
                                    </th>

                                    <th className="p-4 text-center">
                                        Status
                                    </th>

                                    <th className="p-4 text-center">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {suppliersList.data.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan={6}
                                            className="py-14 text-center text-gray-400"
                                        >

                                            <div className="flex flex-col items-center">

                                                <Building2
                                                    size={55}
                                                    className="mb-4 text-gray-300"
                                                />

                                                <p className="font-medium">
                                                    No suppliers found.
                                                </p>

                                                <p className="text-sm">
                                                    Click "Add Supplier" to create one.
                                                </p>

                                            </div>

                                        </td>

                                    </tr>

                                )}

                                {suppliersList.data.map((supplier:any) => (

                                    <tr
                                        key={supplier.id}
                                        className="border-t hover:bg-slate-50"
                                    >

                                        <td className="p-4">

                                            {supplier.supplier_code}

                                        </td>

                                        <td className="p-4 font-medium">

                                            {supplier.name}

                                        </td>

                                        <td className="p-4">

                                            {supplier.contact_person}

                                        </td>

                                        <td className="p-4">

                                            {supplier.contact_number}

                                        </td>

                                        <td className="p-4 text-center">

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    supplier.is_active
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >

                                                {supplier.is_active
                                                    ? "Active"
                                                    : "Inactive"}

                                            </span>

                                        </td>

                                        <td className="p-4">

                                            <div className="flex justify-center">

                                                <Link
                                                    href={`/admin/supplier/${supplier.id}/edit`}
                                                    className="p-2 rounded-lg hover:bg-slate-100"
                                                >

                                                    <Eye size={18} />

                                                </Link>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </section>

        </AdminMainLayout>

    );

}