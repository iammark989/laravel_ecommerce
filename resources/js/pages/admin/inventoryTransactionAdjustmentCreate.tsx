import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

interface Variant {
    id: number;
    sku: string;
    variant_name: string;
    quantity_on_hand: number;
}

interface AdjustmentItem {
    product_variant_id: number;
    sku: string;
    variant_name: string;
    current_stock: number;
    adjustment_quantity: number;
    new_stock: number;
    remarks: string;
}

const reasons = [
    "Physical Count",
    "Inventory Audit",
    "Correction",
];

export default function InventoryAdjustmentCreate() {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<Variant[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [adjustment, setAdjustment] = useState({
        warehouse_id: "",
        adjustment_date: new Date().toISOString().split("T")[0],
        reason: "",
        remarks: "",
    });

    const [items, setItems] = useState<AdjustmentItem[]>([]);

    /*
    |--------------------------------------------------------------------------
    | Search Product Variants
    |--------------------------------------------------------------------------
    */

    const searchVariants = async (value: string) => {
        setSearch(value);

        if (value.length < 2) {
            setSearchResults([]);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.get("/admin/variants/search", {
                params: {
                    search: value,
                },
            });

            setSearchResults(response.data);
        } catch (error) {
            console.error(error);

            Swal.fire(
                "Error",
                "Unable to search product variants.",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Add Item
    |--------------------------------------------------------------------------
    */

    const addItem = (variant: Variant) => {
        const exists = items.some(
            (item) => item.product_variant_id === variant.id
        );

        if (exists) {
            Swal.fire(
                "Already Added",
                "This product variant is already in the adjustment.",
                "warning"
            );

            return;
        }

        const currentStock = Number(variant.quantity_on_hand ?? 0);

        setItems([
            ...items,
            {
                product_variant_id: variant.id,
                sku: variant.sku,
                variant_name: variant.variant_name,
                current_stock: currentStock,
                adjustment_quantity: 0,
                new_stock: currentStock,
                remarks: "",
            },
        ]);

        setSearch("");
        setSearchResults([]);
    };

    /*
    |--------------------------------------------------------------------------
    | Remove Item
    |--------------------------------------------------------------------------
    */

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    /*
    |--------------------------------------------------------------------------
    | Update Adjustment Quantity
    |--------------------------------------------------------------------------
    */

    const updateAdjustmentQuantity = (
        index: number,
        value: string
    ) => {
        const updated = [...items];

        const adjustmentQuantity = Number(value);

        updated[index].adjustment_quantity =
            Number.isNaN(adjustmentQuantity)
                ? 0
                : adjustmentQuantity;

        updated[index].new_stock =
            updated[index].current_stock +
            updated[index].adjustment_quantity;

        setItems(updated);
    };

    /*
    |--------------------------------------------------------------------------
    | Update Item Remarks
    |--------------------------------------------------------------------------
    */

    const updateItemRemarks = (
        index: number,
        value: string
    ) => {
        const updated = [...items];

        updated[index].remarks = value;

        setItems(updated);
    };

    /*
    |--------------------------------------------------------------------------
    | Submit Adjustment
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async () => {
        if (!adjustment.warehouse_id) {
            Swal.fire(
                "Required",
                "Please select a warehouse.",
                "warning"
            );

            return;
        }

        if (!adjustment.adjustment_date) {
            Swal.fire(
                "Required",
                "Please select an adjustment date.",
                "warning"
            );

            return;
        }

        if (!adjustment.reason) {
            Swal.fire(
                "Required",
                "Please select an adjustment reason.",
                "warning"
            );

            return;
        }

        if (items.length === 0) {
            Swal.fire(
                "No Items",
                "Please add at least one product variant.",
                "warning"
            );

            return;
        }

        const invalidItem = items.find(
            (item) =>
                item.adjustment_quantity === 0 ||
                item.new_stock < 0
        );

        if (invalidItem) {
            Swal.fire(
                "Invalid Adjustment",
                "Adjustment quantity cannot be zero and resulting stock cannot be negative.",
                "warning"
            );

            return;
        }

        const result = await Swal.fire({
            title: "Post Inventory Adjustment?",
            text: "This will update the inventory stock.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Post Adjustment",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) {
            return;
        }

        setSaving(true);

        try {
            const response = await axios.post(
                "/api/inventory-adjustments",
                {
                    warehouse_id: Number(
                        adjustment.warehouse_id
                    ),
                    adjustment_date:
                        adjustment.adjustment_date,
                    reason: adjustment.reason,
                    remarks:
                        adjustment.remarks || null,
                    items: items.map((item) => ({
                        product_variant_id:
                            item.product_variant_id,
                        adjustment_quantity:
                            item.adjustment_quantity,
                        remarks:
                            item.remarks || null,
                    })),
                }
            );

            await Swal.fire(
                "Success",
                response.data.message ||
                    "Inventory adjustment posted successfully.",
                "success"
            );

            window.location.href =
                "/admin/inventory-adjustments";

        } catch (error: any) {
            console.error(error);

            let message =
                "Unable to post inventory adjustment.";

            if (
                error.response?.data?.message
            ) {
                message =
                    error.response.data.message;
            }

            if (
                error.response?.data?.errors
            ) {
                const errors =
                    error.response.data.errors;

                message = Object.values(errors)
                    .flat()
                    .join("<br>");
            }

            Swal.fire(
                "Error",
                message,
                "error"
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminMainLayout>
            <div className="min-h-screen bg-slate-50 p-4 md:p-6">

                {/* Header */}

                <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">

                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            New Inventory Adjustment
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Correct inventory quantities and stock discrepancies.
                        </p>
                    </div>

                    <Link
                        href="/admin/product/transactions"
                        className="border rounded-xl px-4 py-2 bg-white flex items-center gap-2 w-fit"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </Link>

                </div>

                {/* Adjustment Information */}

                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

                    <h2 className="font-semibold text-lg mb-4">
                        Adjustment Information
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {/* Warehouse */}

                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Warehouse *
                            </label>

                            <input
                                type="number"
                                value={adjustment.warehouse_id}
                                onChange={(e) =>
                                    setAdjustment({
                                        ...adjustment,
                                        warehouse_id:
                                            e.target.value,
                                    })
                                }
                                placeholder="Warehouse ID"
                                className="w-full border rounded-xl px-4 py-3"
                            />

                            <p className="text-xs text-gray-400 mt-1">
                                We can replace this with the warehouse dropdown once we connect the warehouse API.
                            </p>
                        </div>

                        {/* Adjustment Date */}

                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Adjustment Date *
                            </label>

                            <input
                                type="date"
                                value={
                                    adjustment.adjustment_date
                                }
                                onChange={(e) =>
                                    setAdjustment({
                                        ...adjustment,
                                        adjustment_date:
                                            e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl px-4 py-3"
                            />
                        </div>

                        {/* Reason */}

                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Reason *
                            </label>

                            <select
                                value={adjustment.reason}
                                onChange={(e) =>
                                    setAdjustment({
                                        ...adjustment,
                                        reason:
                                            e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl px-4 py-3"
                            >
                                <option value="">
                                    Select Reason
                                </option>

                                {reasons.map((reason) => (
                                    <option
                                        key={reason}
                                        value={reason}
                                    >
                                        {reason}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    {/* Remarks */}

                    <div className="mt-4">

                        <label className="block mb-2 text-sm font-medium">
                            Remarks
                        </label>

                        <textarea
                            rows={3}
                            maxLength={500}
                            value={adjustment.remarks}
                            onChange={(e) =>
                                setAdjustment({
                                    ...adjustment,
                                    remarks:
                                        e.target.value,
                                })
                            }
                            placeholder="Explain the reason for the adjustment..."
                            className="w-full border rounded-xl px-4 py-3"
                        />

                    </div>

                </div>

                {/* Items */}

                <div className="bg-white rounded-2xl shadow-sm p-6">

                    <h2 className="font-semibold text-lg mb-4">
                        Adjustment Items
                    </h2>

                    {/* Search */}

                    <div className="relative mb-6">

                        <label className="block mb-2 text-sm font-medium">
                            Search Product Variant
                        </label>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                searchVariants(
                                    e.target.value
                                )
                            }
                            placeholder="Search SKU or Variant"
                            className="w-full border rounded-xl px-4 py-3"
                        />

                        {loading && (
                            <div className="mt-2 text-sm text-gray-500">
                                Searching...
                            </div>
                        )}

                        {searchResults.length > 0 && (
                            <div className="absolute z-50 mt-1 w-full bg-white border rounded-xl shadow-lg max-h-64 overflow-y-auto">

                                {searchResults.map(
                                    (variant) => (
                                        <button
                                            key={variant.id}
                                            type="button"
                                            onClick={() =>
                                                addItem(
                                                    variant
                                                )
                                            }
                                            className="w-full text-left p-4 hover:bg-slate-100 border-b"
                                        >
                                            <div className="font-medium">
                                                {variant.sku}
                                            </div>

                                            <div className="text-sm text-gray-500">
                                                {variant.variant_name}
                                            </div>

                                            <div className="text-xs text-gray-400 mt-1">
                                                Current Stock:{" "}
                                                {Number(
                                                    variant.quantity_on_hand ??
                                                        0
                                                ).toLocaleString()}
                                            </div>
                                        </button>
                                    )
                                )}

                            </div>
                        )}

                    </div>

                    {/* Desktop Table */}

                    <div className="hidden lg:block overflow-x-auto">

                        <table className="w-full">

                            <thead>
                                <tr className="border-b text-left">

                                    <th className="p-3">
                                        SKU
                                    </th>

                                    <th className="p-3">
                                        Variant
                                    </th>

                                    <th className="p-3">
                                        Current Stock
                                    </th>

                                    <th className="p-3">
                                        Adjustment
                                    </th>

                                    <th className="p-3">
                                        New Stock
                                    </th>

                                    <th className="p-3">
                                        Remarks
                                    </th>

                                    <th className="p-3">
                                    </th>

                                </tr>
                            </thead>

                            <tbody>

                                {items.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="p-8 text-center text-gray-500"
                                        >
                                            No items added yet.
                                        </td>
                                    </tr>
                                ) : (
                                    items.map(
                                        (item, index) => (
                                            <tr
                                                key={
                                                    item.product_variant_id
                                                }
                                                className="border-b"
                                            >

                                                <td className="p-3 font-medium">
                                                    {item.sku}
                                                </td>

                                                <td className="p-3">
                                                    {item.variant_name}
                                                </td>

                                                <td className="p-3">
                                                    {Number(
                                                        item.current_stock
                                                    ).toLocaleString()}
                                                </td>

                                                <td className="p-3">

                                                    <input
                                                        type="number"
                                                        step="0.001"
                                                        value={
                                                            item.adjustment_quantity
                                                        }
                                                        onChange={(e) =>
                                                            updateAdjustmentQuantity(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-32 border rounded-lg px-3 py-2"
                                                    />

                                                </td>

                                                <td className="p-3 font-semibold">

                                                    <span
                                                        className={
                                                            item.new_stock < 0
                                                                ? "text-red-600"
                                                                : "text-sky-600"
                                                        }
                                                    >
                                                        {Number(
                                                            item.new_stock
                                                        ).toLocaleString()}
                                                    </span>

                                                </td>

                                                <td className="p-3">

                                                    <input
                                                        type="text"
                                                        maxLength={500}
                                                        value={
                                                            item.remarks
                                                        }
                                                        onChange={(e) =>
                                                            updateItemRemarks(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="border rounded-lg px-3 py-2"
                                                        placeholder="Optional"
                                                    />

                                                </td>

                                                <td className="p-3">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeItem(
                                                                index
                                                            )
                                                        }
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2
                                                            size={18}
                                                        />
                                                    </button>

                                                </td>

                                            </tr>
                                        )
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* Mobile */}

                    <div className="lg:hidden space-y-4">

                        {items.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 border rounded-xl">
                                No items added yet.
                            </div>
                        ) : (
                            items.map(
                                (item, index) => (
                                    <div
                                        key={
                                            item.product_variant_id
                                        }
                                        className="border rounded-2xl p-4 space-y-3"
                                    >

                                        <div>
                                            <div className="text-sm text-gray-500">
                                                SKU
                                            </div>

                                            <div className="font-medium">
                                                {item.sku}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-sm text-gray-500">
                                                Variant
                                            </div>

                                            <div className="font-medium">
                                                {item.variant_name}
                                            </div>
                                        </div>

                                        <div className="flex justify-between">

                                            <span>
                                                Current Stock:
                                            </span>

                                            <span className="font-medium">
                                                {Number(
                                                    item.current_stock
                                                ).toLocaleString()}
                                            </span>

                                        </div>

                                        <div>

                                            <label className="block text-sm mb-1">
                                                Adjustment Quantity
                                            </label>

                                            <input
                                                type="number"
                                                step="0.001"
                                                value={
                                                    item.adjustment_quantity
                                                }
                                                onChange={(e) =>
                                                    updateAdjustmentQuantity(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full border rounded-xl px-4 py-3"
                                            />

                                        </div>

                                        <div className="flex justify-between">

                                            <span>
                                                New Stock:
                                            </span>

                                            <span
                                                className={
                                                    item.new_stock < 0
                                                        ? "font-semibold text-red-600"
                                                        : "font-semibold text-sky-600"
                                                }
                                            >
                                                {Number(
                                                    item.new_stock
                                                ).toLocaleString()}
                                            </span>

                                        </div>

                                        <div>

                                            <label className="block text-sm mb-1">
                                                Remarks
                                            </label>

                                            <input
                                                type="text"
                                                maxLength={500}
                                                value={
                                                    item.remarks
                                                }
                                                onChange={(e) =>
                                                    updateItemRemarks(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full border rounded-xl px-4 py-3"
                                            />

                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeItem(
                                                    index
                                                )
                                            }
                                            className="text-red-500 flex items-center gap-2"
                                        >
                                            <Trash2
                                                size={18}
                                            />
                                            Remove Item
                                        </button>

                                    </div>
                                )
                            )
                        )}

                    </div>

                </div>

                {/* Buttons */}

                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">

                    <Link
                        href="/admin/inventory-adjustments"
                        className="border rounded-xl px-6 py-3 text-center bg-white"
                    >
                        Cancel
                    </Link>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={saving}
                        className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                        <Save size={18} />

                        {saving
                            ? "Posting..."
                            : "Post Adjustment"}
                    </button>

                </div>

            </div>
        </AdminMainLayout>
    );
}