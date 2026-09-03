import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
    Search,
    Package,
    PackageCheck,
    PackageX,
    AlertTriangle,
    RefreshCw,
} from "lucide-react";

import AdminMainLayout from "@/components/layout/AdminMainLayout";
import StatusBadge from "@/components/ui/StatusBadge";

interface InventoryItem {
    id: number;
    product_variant_id: number;
    name: string;
    variant_name: string;
    sku: string;
    uom: string;
    quantity_on_hand: number;
    reorder_level: number;
    stock_status: "in_stock" | "low_stock" | "out_of_stock";
}

interface InventorySummary {
    total_products: number;
    total_stock: number;
    low_stock: number;
    out_of_stock: number;
}

export default function InventoryStocksPage() {

    const [inventory, setInventory] = useState<InventoryItem[]>([]);

    const [summary, setSummary] = useState<InventorySummary>({
        total_products: 0,
        total_stock: 0,
        low_stock: 0,
        out_of_stock: 0,
    });

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("");

    const [loading, setLoading] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Load Inventory
    |--------------------------------------------------------------------------
    */

    const loadInventory = async () => {

        try {

            setLoading(true);

            const response = await axios.get("/api/inventory");

            setInventory(response.data.items ?? []);

            setSummary(
                response.data.summary ?? {
                    total_products: 0,
                    total_stock: 0,
                    low_stock: 0,
                    out_of_stock: 0,
                }
            );

        } catch (error) {

            console.error("Failed to load inventory:", error);

        } finally {

            setLoading(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        loadInventory();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | Filter Inventory
    |--------------------------------------------------------------------------
    */

    const filteredInventory = useMemo(() => {

        const keyword = search.toLowerCase().trim();

        return inventory.filter((item) => {

            const matchesSearch =
                item.sku.toLowerCase().includes(keyword) ||
                item.name.toLowerCase().includes(keyword) ||
                item.variant_name.toLowerCase().includes(keyword);

            const matchesStatus =
                statusFilter === "" ||
                item.stock_status === statusFilter;

            return matchesSearch && matchesStatus;

        });

    }, [inventory, search, statusFilter]);


    /*
    |--------------------------------------------------------------------------
    | Number Formatting
    |--------------------------------------------------------------------------
    */

    const formatNumber = (value: number) => {

        return Number(value ?? 0).toLocaleString(
            undefined,
            {
                maximumFractionDigits: 3,
            }
        );

    };


    return (

        <AdminMainLayout>

            <section className="space-y-6">

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Inventory
                        </h1>

                        <p className="text-gray-500 mt-1">
                            View current stock levels and inventory status.
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={loadInventory}
                        disabled={loading}
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            border
                            rounded-xl
                            px-5
                            py-3
                            bg-white
                            hover:bg-gray-100
                            disabled:opacity-50
                        "
                    >

                        <RefreshCw
                            size={18}
                            className={loading ? "animate-spin" : ""}
                        />

                        Refresh

                    </button>

                </div>


                {/* =====================================================
                    SUMMARY CARDS
                ====================================================== */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">


                    {/* Total Products */}

                    <div className="bg-white rounded-2xl shadow-sm p-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Products
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {formatNumber(summary.total_products)}
                                </h2>

                            </div>

                            <div className="bg-sky-100 text-sky-600 rounded-xl p-3">

                                <Package size={24} />

                            </div>

                        </div>

                    </div>


                    {/* Total Stock */}

                    <div className="bg-white rounded-2xl shadow-sm p-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Stock
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {formatNumber(summary.total_stock)}
                                </h2>

                            </div>

                            <div className="bg-green-100 text-green-600 rounded-xl p-3">

                                <PackageCheck size={24} />

                            </div>

                        </div>

                    </div>


                    {/* Low Stock */}

                    <div className="bg-white rounded-2xl shadow-sm p-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Low Stock
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {formatNumber(summary.low_stock)}
                                </h2>

                            </div>

                            <div className="bg-yellow-100 text-yellow-600 rounded-xl p-3">

                                <AlertTriangle size={24} />

                            </div>

                        </div>

                    </div>


                    {/* Out of Stock */}

                    <div className="bg-white rounded-2xl shadow-sm p-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Out of Stock
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {formatNumber(summary.out_of_stock)}
                                </h2>

                            </div>

                            <div className="bg-red-100 text-red-600 rounded-xl p-3">

                                <PackageX size={24} />

                            </div>

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    INVENTORY TABLE
                ====================================================== */}

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">


                    {/* Search / Filter */}

                    <div className="p-5 border-b">

                        <div className="flex flex-col lg:flex-row gap-4">


                            {/* Search */}

                            <div className="relative flex-1">

                                <Search
                                    size={18}
                                    className="
                                        absolute
                                        left-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-400
                                    "
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search SKU, product or variant..."
                                    className="
                                        w-full
                                        border
                                        rounded-xl
                                        pl-10
                                        pr-4
                                        py-3
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-sky-200
                                    "
                                />

                            </div>


                            {/* Status Filter */}

                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                    min-w-[200px]
                                    bg-white
                                "
                            >

                                <option value="">
                                    All Stock Status
                                </option>

                                <option value="in_stock">
                                    In Stock
                                </option>

                                <option value="low_stock">
                                    Low Stock
                                </option>

                                <option value="out_of_stock">
                                    Out of Stock
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* Table */}

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-slate-50">

                                <tr>

                                    <th className="p-4 text-left">
                                        SKU
                                    </th>

                                    <th className="p-4 text-left">
                                        Product
                                    </th>

                                    <th className="p-4 text-left">
                                        Variant
                                    </th>

                                    <th className="p-4 text-left">
                                        UoM
                                    </th>

                                    <th className="p-4 text-right">
                                        On Hand
                                    </th>

                                    <th className="p-4 text-right">
                                        Reorder Level
                                    </th>

                                    <th className="p-4 text-center">
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {loading ? (

                                    <tr>

                                        <td
                                            colSpan={7}
                                            className="py-16 text-center text-gray-500"
                                        >

                                            <RefreshCw
                                                size={28}
                                                className="animate-spin mx-auto mb-3"
                                            />

                                            Loading inventory...

                                        </td>

                                    </tr>

                                ) : filteredInventory.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={7}
                                            className="py-16 text-center"
                                        >

                                            <Package
                                                size={42}
                                                className="mx-auto text-gray-300"
                                            />

                                            <p className="font-medium mt-3">
                                                No inventory found
                                            </p>

                                            <p className="text-sm text-gray-400 mt-1">
                                                Try changing your search or filter.
                                            </p>

                                        </td>

                                    </tr>

                                ) : (

                                    filteredInventory.map((item) => (

                                        <tr
                                            key={item.id}
                                            className="
                                                border-b
                                                last:border-b-0
                                                hover:bg-slate-50
                                            "
                                        >

                                            {/* SKU */}

                                            <td className="p-4 font-medium">

                                                {item.sku}

                                            </td>


                                            {/* Product */}

                                            <td className="p-4">

                                                {item.name}

                                            </td>


                                            {/* Variant */}

                                            <td className="p-4 text-gray-600">

                                                {item.variant_name}

                                            </td>


                                            {/* UOM */}

                                            <td className="p-4">

                                                {item.uom}

                                            </td>


                                            {/* On Hand */}

                                            <td className="p-4 text-right font-semibold">

                                                {formatNumber(
                                                    item.quantity_on_hand
                                                )}

                                            </td>


                                            {/* Reorder Level */}

                                            <td className="p-4 text-right text-gray-600">

                                                {formatNumber(
                                                    item.reorder_level
                                                )}

                                            </td>


                                            {/* Status */}

                                            <td className="p-4 text-center">

                                                <StatusBadge
                                                    status={item.stock_status}
                                                />

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* Footer */}

                    <div className="px-5 py-4 border-t text-sm text-gray-500">

                        {filteredInventory.length} inventory item
                        {filteredInventory.length !== 1 ? "s" : ""} found

                    </div>

                </div>

            </section>

        </AdminMainLayout>

    );
}