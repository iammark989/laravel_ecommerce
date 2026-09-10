import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { Link } from "@inertiajs/react";
import axios from "axios";
import {
    ClipboardPenLine,
    Eye,
    Plus,
    Search,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";

interface InventoryAdjustmentUser {
    id: number;
    name: string;
}

interface InventoryAdjustmentWarehouse {
    id: number;
    name: string;
}

interface InventoryAdjustment {
    id: number;
    adjustment_number: string;
    warehouse_id: number;
    adjustment_date: string;
    reason: string;
    status: string;
    remarks: string | null;
    created_by: number;
    posted_at: string | null;
    items_count: number;
    warehouse: InventoryAdjustmentWarehouse | null;
    user: InventoryAdjustmentUser | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface InventoryAdjustmentResponse {
    current_page: number;
    data: InventoryAdjustment[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

const reasons = [
    "Physical Count",
    "Inventory Audit",
    "Correction",
];

export default function InventoryAdjustmentsPage() {
    const [adjustments, setAdjustments] = useState<
        InventoryAdjustment[]
    >([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");

    const [reason, setReason] = useState("");

    const [pagination, setPagination] =
        useState<InventoryAdjustmentResponse | null>(null);

    /*
    |--------------------------------------------------------------------------
    | Fetch Adjustments
    |--------------------------------------------------------------------------
    */

    const fetchAdjustments = async (page: number = 1) => {
        try {
            setLoading(true);

            const response = await axios.get(
                "/api/inventory-adjustments",
                {
                    params: {
                        page,
                        search: search || undefined,
                        status: status || undefined,
                        reason: reason || undefined,
                    },
                }
            );
            console.log("Inventory Adjustment API:", response.data);
            setAdjustments(response.data.data);
            
            setPagination(response.data);
        } catch (error) {
            console.error(
                "Failed to load inventory adjustments:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Initial Load / Filter Changes
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        fetchAdjustments();
    }, [search, status, reason]);

    /*
    |--------------------------------------------------------------------------
    | Format Date
    |--------------------------------------------------------------------------
    */

    const formatDate = (date: string | null) => {
        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Format Date Time
    |--------------------------------------------------------------------------
    */

    const formatDateTime = (date: string | null) => {
        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
            }
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Format Reason
    |--------------------------------------------------------------------------
    */

    const formatReason = (value: string) => {
        return value
            .replace(/_/g, " ")
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );
    };

    /*
    |--------------------------------------------------------------------------
    | Status Badge
    |--------------------------------------------------------------------------
    */

    const getStatusBadge = (adjustmentStatus: string) => {
        switch (adjustmentStatus) {
            case "posted":
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        Posted
                    </span>
                );

            case "draft":
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                        Draft
                    </span>
                );

            case "cancelled":
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                        Cancelled
                    </span>
                );

            default:
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                        {adjustmentStatus}
                    </span>
                );
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Clear Filters
    |--------------------------------------------------------------------------
    */

    const clearFilters = () => {
        setSearch("");
        setStatus("");
        setReason("");
    };

    const hasFilters =
        search !== "" ||
        status !== "" ||
        reason !== "";

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <AdminMainLayout>
            <div className="min-h-screen bg-slate-50 p-4 md:p-6">

                {/* Header */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            Inventory Adjustments
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Review and manage inventory stock adjustments.
                        </p>
                    </div>

                    <Link
                        href="/admin/product/adjustment"
                        className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-xl transition"
                    >
                        <Plus size={18} />
                        New Adjustment
                    </Link>

                </div>

                {/* Summary */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-gray-500 text-sm">
                                    Total Adjustments
                                </p>

                                <h2 className="text-3xl font-bold text-sky-600 mt-1">
                                    {pagination?.total ?? 0}
                                </h2>
                            </div>

                            <div className="p-3 rounded-xl bg-sky-50 text-sky-600">
                                <ClipboardPenLine size={22} />
                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-gray-500 text-sm">
                                    Posted
                                </p>

                                <h2 className="text-3xl font-bold text-green-600 mt-1">
                                    {adjustments?.filter(
                                        (adjustment) =>
                                            adjustment.status === "posted"
                                    ).length ?? 0}
                                </h2>
                            </div>

                            <div className="p-3 rounded-xl bg-green-50 text-green-600">
                                <ClipboardPenLine size={22} />
                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-gray-500 text-sm">
                                    Current Page
                                </p>

                                <h2 className="text-3xl font-bold text-slate-700 mt-1">
                                    {pagination?.current_page ?? 0}
                                </h2>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-100 text-slate-600">
                                <ClipboardPenLine size={22} />
                            </div>

                        </div>

                    </div>

                </div>

                {/* Filters */}

                <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-slate-100">

                    <div className="flex flex-col lg:flex-row gap-3">

                        {/* Search */}

                        <div className="relative flex-1">

                            <Search
                                size={18}
                                className="absolute left-3 top-3.5 text-gray-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search adjustment number, reason..."
                                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
                            />

                        </div>

                        {/* Reason */}

                        <select
                            value={reason}
                            onChange={(e) =>
                                setReason(e.target.value)
                            }
                            className="border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-sky-200"
                        >
                            <option value="">
                                All Reasons
                            </option>

                            {reasons.map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>

                        {/* Status */}

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
                            className="border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-sky-200"
                        >
                            <option value="">
                                All Status
                            </option>

                            <option value="posted">
                                Posted
                            </option>

                            <option value="draft">
                                Draft
                            </option>

                            <option value="cancelled">
                                Cancelled
                            </option>
                        </select>

                        {/* Clear */}

                        {hasFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                            >
                                <X size={17} />
                                Clear
                            </button>
                        )}

                    </div>

                </div>

                {/* Table */}

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>
                                <tr className="border-b bg-slate-50 text-left text-gray-500 text-sm">

                                    <th className="p-4 font-medium">
                                        Adjustment
                                    </th>

                                    <th className="p-4 font-medium">
                                        Date
                                    </th>

                                    <th className="p-4 font-medium">
                                        Warehouse
                                    </th>

                                    <th className="p-4 font-medium">
                                        Reason
                                    </th>

                                    <th className="p-4 font-medium text-center">
                                        Items
                                    </th>

                                    <th className="p-4 font-medium">
                                        Status
                                    </th>

                                    <th className="p-4 font-medium">
                                        Created By
                                    </th>

                                    <th className="p-4 font-medium text-right">
                                        Action
                                    </th>

                                </tr>
                            </thead>

                            <tbody>

                                {loading ? (

                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="p-10 text-center text-gray-500"
                                        >
                                            Loading inventory adjustments...
                                        </td>
                                    </tr>

                                ) : adjustments.length === 0 ? (

                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="p-10 text-center"
                                        >

                                            <div className="flex flex-col items-center">

                                                <ClipboardPenLine
                                                    size={40}
                                                    className="text-slate-300 mb-3"
                                                />

                                                <p className="font-medium text-slate-600">
                                                    No inventory adjustments found.
                                                </p>

                                                <p className="text-sm text-slate-400 mt-1">
                                                    Posted stock adjustments will appear here.
                                                </p>

                                            </div>

                                        </td>
                                    </tr>

                                ) : (

                                    adjustments.map(
                                        (adjustment) => (

                                            <tr
                                                key={adjustment.id}
                                                className="border-b last:border-b-0 hover:bg-slate-50 transition"
                                            >

                                                {/* Adjustment */}

                                                <td className="p-4">

                                                    <div className="font-semibold text-slate-700">
                                                        {adjustment.adjustment_number}
                                                    </div>

                                                    <div className="text-xs text-slate-400 mt-1">
                                                        {adjustment.posted_at
                                                            ? `Posted ${formatDateTime(
                                                                  adjustment.posted_at
                                                              )}`
                                                            : "Not posted"}
                                                    </div>

                                                </td>

                                                {/* Date */}

                                                <td className="p-4 text-slate-600 whitespace-nowrap">
                                                    {formatDate(
                                                        adjustment.adjustment_date
                                                    )}
                                                </td>

                                                {/* Warehouse */}

                                                <td className="p-4 text-slate-600">
                                                    {adjustment.warehouse?.name ??
                                                        "-"}
                                                </td>

                                                {/* Reason */}

                                                <td className="p-4 text-slate-600">
                                                    {formatReason(
                                                        adjustment.reason
                                                    )}
                                                </td>

                                                {/* Items */}

                                                <td className="p-4 text-center">

                                                    <span className="inline-flex items-center justify-center min-w-8 h-8 px-2 rounded-lg bg-slate-100 text-slate-700 font-medium">
                                                        {adjustment.items_count}
                                                    </span>

                                                </td>

                                                {/* Status */}

                                                <td className="p-4">
                                                    {getStatusBadge(
                                                        adjustment.status
                                                    )}
                                                </td>

                                                {/* Created By */}

                                                <td className="p-4 text-slate-600">
                                                    {adjustment.user?.name ??
                                                        "-"}
                                                </td>

                                                {/* Action */}

                                                <td className="p-4 text-right">

                                                    <Link
                                                        href={`/admin/inventory-adjustments/${adjustment.id}`}
                                                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sky-600 hover:bg-sky-50 transition"
                                                    >
                                                        <Eye size={16} />
                                                        View
                                                    </Link>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* Pagination */}

                {pagination &&
                    pagination.last_page > 1 && (

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-5">

                            <p className="text-sm text-slate-500">

                                Showing{" "}

                                <span className="font-medium">
                                    {pagination.from ?? 0}
                                </span>{" "}

                                to{" "}

                                <span className="font-medium">
                                    {pagination.to ?? 0}
                                </span>{" "}

                                of{" "}

                                <span className="font-medium">
                                    {pagination.total}
                                </span>{" "}

                                adjustments

                            </p>

                            <div className="flex items-center gap-1">

                                {pagination.links.map(
                                    (link, index) => {

                                        if (
                                            index === 0 ||
                                            index ===
                                                pagination.links.length - 1
                                        ) {
                                            return null;
                                        }

                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                disabled={!link.url}
                                                onClick={() => {

                                                    if (link.url) {

                                                        const url =
                                                            new URL(
                                                                link.url
                                                            );

                                                        const page =
                                                            Number(
                                                                url.searchParams.get(
                                                                    "page"
                                                                ) ?? 1
                                                            );

                                                        fetchAdjustments(
                                                            page
                                                        );

                                                    }

                                                }}
                                                className={`min-w-9 h-9 px-3 rounded-lg text-sm ${
                                                    link.active
                                                        ? "bg-sky-500 text-white"
                                                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                                                } ${
                                                    !link.url
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : ""
                                                }`}
                                            >
                                                {link.label}
                                            </button>
                                        );
                                    }
                                )}

                            </div>

                        </div>

                    )}

            </div>
        </AdminMainLayout>
    );
}