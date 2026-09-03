import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { Link } from "@inertiajs/react";
import axios from "axios";
import {
    ArrowDownToLine,
    ArrowUpFromLine,
    Eye,
    FileText,
    Plus,
    Search,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";

interface InventoryTransactionUser {
    id: number;
    name: string;
}

interface InventoryTransaction {
    id: number;
    transaction_type: string;
    reason: string;
    status: string;
    reference_type: string | null;
    reference_number: string;
    invoice_no: string | null;
    remarks: string | null;
    created_by: number;
    posted_at: string | null;
    items_count: number;
    user: InventoryTransactionUser | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface InventoryTransactionResponse {
    current_page: number;
    data: InventoryTransaction[];
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

export default function InventoryTransactionPage() {
    const [transactions, setTransactions] = useState<
        InventoryTransaction[]
    >([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [transactionType, setTransactionType] = useState("");

    const [status, setStatus] = useState("");

    const [pagination, setPagination] =
        useState<InventoryTransactionResponse | null>(null);

    const fetchTransactions = async (
        page: number = 1
    ) => {
        try {
            setLoading(true);

            const response = await axios.get(
                "/api/inventory-transactions",
                {
                    params: {
                        page,
                        search: search || undefined,
                        transaction_type:
                            transactionType || undefined,
                        status: status || undefined,
                    },
                }
            );

            setTransactions(response.data.data);

            setPagination(response.data);
        } catch (error) {
            console.error(
                "Failed to load inventory transactions:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [search, transactionType, status]);

    const formatReason = (reason: string) => {
        return reason
            .replace(/_/g, " ")
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );
    };

    const formatTransactionType = (
        type: string
    ) => {
        switch (type) {
            case "stock_in":
                return "Stock In";

            case "stock_out":
                return "Stock Out";

            case "adjustment":
                return "Adjustment";

            default:
                return type;
        }
    };

    const formatDate = (
        date: string | null
    ) => {
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

    const getTypeBadge = (
        type: string
    ) => {
        switch (type) {
            case "stock_in":
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        <ArrowDownToLine size={14} />
                        Stock In
                    </span>
                );

            case "stock_out":
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                        <ArrowUpFromLine size={14} />
                        Stock Out
                    </span>
                );

            case "adjustment":
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
                        <FileText size={14} />
                        Adjustment
                    </span>
                );

            default:
                return (
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                        {formatTransactionType(type)}
                    </span>
                );
        }
    };

    const getStatusBadge = (
        transactionStatus: string
    ) => {
        switch (transactionStatus) {
            case "posted":
                return (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        Posted
                    </span>
                );

            case "draft":
                return (
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                        Draft
                    </span>
                );

            case "cancelled":
                return (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                        Cancelled
                    </span>
                );

            default:
                return (
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                        {transactionStatus}
                    </span>
                );
        }
    };

    const clearFilters = () => {
        setSearch("");
        setTransactionType("");
        setStatus("");
    };

    const hasFilters =
        search !== "" ||
        transactionType !== "" ||
        status !== "";

    return (
        <AdminMainLayout>
            <div className="min-h-screen bg-slate-50 p-4 md:p-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            Inventory Transactions
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Monitor all stock movements and inventory activities.
                        </p>
                    </div>

                    <Link
                        href="/admin/inventory-transactions/new-transaction"
                        className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-xl transition"
                    >
                        <Plus size={18} />
                        New Transaction
                    </Link>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Stock In Today
                                </p>

                                <h2 className="text-3xl font-bold text-green-600 mt-1">
                                    150
                                </h2>
                            </div>

                            <div className="p-3 rounded-xl bg-green-50 text-green-600">
                                <ArrowDownToLine size={22} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Stock Out Today
                                </p>

                                <h2 className="text-3xl font-bold text-red-600 mt-1">
                                    45
                                </h2>
                            </div>

                            <div className="p-3 rounded-xl bg-red-50 text-red-600">
                                <ArrowUpFromLine size={22} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Transactions Today
                                </p>

                                <h2 className="text-3xl font-bold text-sky-600 mt-1">
                                    18
                                </h2>
                            </div>

                            <div className="p-3 rounded-xl bg-sky-50 text-sky-600">
                                <FileText size={22} />
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
                                placeholder="Search reference, reason..."
                                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
                            />

                        </div>

                        {/* Type */}
                        <select
                            value={transactionType}
                            onChange={(e) =>
                                setTransactionType(e.target.value)
                            }
                            className="border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-sky-200"
                        >
                            <option value="">
                                All Types
                            </option>

                            <option value="stock_in">
                                Stock In
                            </option>

                            <option value="stock_out">
                                Stock Out
                            </option>

                            <option value="adjustment">
                                Adjustment
                            </option>
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
                                        Reference
                                    </th>

                                    <th className="p-4 font-medium">
                                        Type
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
                                        Posted At
                                    </th>

                                    <th className="p-4 font-medium">
                                        User
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
                                            Loading transactions...
                                        </td>
                                    </tr>

                                ) : transactions.length === 0 ? (

                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="p-10 text-center"
                                        >
                                            <div className="flex flex-col items-center">

                                                <FileText
                                                    size={40}
                                                    className="text-slate-300 mb-3"
                                                />

                                                <p className="font-medium text-slate-600">
                                                    No inventory transactions found.
                                                </p>

                                                <p className="text-sm text-slate-400 mt-1">
                                                    Transactions created from Goods Receipts and other inventory activities will appear here.
                                                </p>

                                            </div>
                                        </td>
                                    </tr>

                                ) : (

                                    transactions.map(
                                        (transaction) => (
                                            <tr
                                                key={transaction.id}
                                                className="border-b last:border-b-0 hover:bg-slate-50 transition"
                                            >

                                                {/* Reference */}
                                                <td className="p-4">

                                                    <div className="font-semibold text-slate-700">
                                                        {transaction.reference_number}
                                                    </div>

                                                    {transaction.reference_type && (
                                                        <div className="text-xs text-slate-400 mt-1">
                                                            {formatReason(
                                                                transaction.reference_type
                                                            )}
                                                        </div>
                                                    )}

                                                </td>

                                                {/* Type */}
                                                <td className="p-4">
                                                    {getTypeBadge(
                                                        transaction.transaction_type
                                                    )}
                                                </td>

                                                {/* Reason */}
                                                <td className="p-4 text-slate-600">
                                                    {formatReason(
                                                        transaction.reason
                                                    )}
                                                </td>

                                                {/* Items */}
                                                <td className="p-4 text-center">

                                                    <span className="inline-flex items-center justify-center min-w-8 h-8 px-2 rounded-lg bg-slate-100 text-slate-700 font-medium">
                                                        {transaction.items_count}
                                                    </span>

                                                </td>

                                                {/* Status */}
                                                <td className="p-4">
                                                    {getStatusBadge(
                                                        transaction.status
                                                    )}
                                                </td>

                                                {/* Posted At */}
                                                <td className="p-4 text-slate-600 whitespace-nowrap">
                                                    {formatDate(
                                                        transaction.posted_at
                                                    )}
                                                </td>

                                                {/* User */}
                                                <td className="p-4 text-slate-600">
                                                    {transaction.user?.name ??
                                                        "-"}
                                                </td>

                                                {/* Action */}
                                                <td className="p-4 text-right">

                                                    <Link
                                                        href={`/admin/inventory-transactions/${transaction.id}`}
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
                                transactions
                            </p>

                            <div className="flex items-center gap-1">

                                {pagination.links.map(
                                    (link, index) => {

                                        if (
                                            index === 0 ||
                                            index ===
                                                pagination.links.length -
                                                    1
                                        ) {
                                            return null;
                                        }

                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                disabled={!link.url}
                                                onClick={() => {
                                                    if (
                                                        link.url
                                                    ) {
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

                                                        fetchTransactions(
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