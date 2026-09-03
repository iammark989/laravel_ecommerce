import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { Link, usePage } from "@inertiajs/react";
import axios from "axios";
import {
    ArrowDownToLine,
    ArrowLeft,
    ArrowUpFromLine,
    ClipboardList,
    FileText,
    User,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Product {
    id: number;
    name: string;
}

interface Uom {
    id: number;
    name: string;
}

interface ProductVariant {
    id: number;
    sku: string;
    variant_name?: string | null;
    product: Product | null;
    uom: Uom | null;
}

interface InventoryTransactionItem {
    id: number;
    product_variant_id: number;
    quantity: string | number;
    stock_before: string | number;
    stock_after: string | number;
    remarks: string | null;
    product_variant: ProductVariant | null;
}

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
    user: InventoryTransactionUser | null;
    items: InventoryTransactionItem[];
}

interface TransactionResponse {
    transaction: InventoryTransaction;
}

export default function InventoryTransactionShow() {
    const { id } = usePage().props as {
        id: number;
    };

    const [transaction, setTransaction] =
        useState<InventoryTransaction | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(
        null
    );

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                setLoading(true);
                setError(null);

                const response =
                    await axios.get<TransactionResponse>(
                        `/api/inventory-transactions/${id}`
                    );

                setTransaction(
                    response.data.transaction
                );
            } catch (error) {
                console.error(
                    "Failed to load inventory transaction:",
                    error
                );

                setError(
                    "Unable to load inventory transaction."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchTransaction();
    }, [id]);

    const formatReason = (reason: string) => {
        return reason
            .replace(/_/g, " ")
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );
    };

    const formatType = (type: string) => {
        switch (type) {
            case "stock_in":
                return "Stock In";

            case "stock_out":
                return "Stock Out";

            case "adjustment":
                return "Adjustment";

            default:
                return formatReason(type);
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

    const formatQuantity = (
        value: string | number
    ) => {
        return Number(value ?? 0).toLocaleString(
            "en-US",
            {
                minimumFractionDigits: 0,
                maximumFractionDigits: 3,
            }
        );
    };

    const getTypeBadge = (
        type: string
    ) => {
        switch (type) {
            case "stock_in":
                return (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        <ArrowDownToLine size={15} />
                        Stock In
                    </span>
                );

            case "stock_out":
                return (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                        <ArrowUpFromLine size={15} />
                        Stock Out
                    </span>
                );

            case "adjustment":
                return (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
                        <ClipboardList size={15} />
                        Adjustment
                    </span>
                );

            default:
                return (
                    <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm">
                        {formatType(type)}
                    </span>
                );
        }
    };

    const getStatusBadge = (
        status: string
    ) => {
        switch (status) {
            case "posted":
                return (
                    <span className="px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        Posted
                    </span>
                );

            case "draft":
                return (
                    <span className="px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                        Draft
                    </span>
                );

            case "cancelled":
                return (
                    <span className="px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                        Cancelled
                    </span>
                );

            default:
                return (
                    <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm">
                        {formatReason(status)}
                    </span>
                );
        }
    };

    if (loading) {
        return (
            <AdminMainLayout>
                <div className="min-h-screen bg-slate-50 p-4 md:p-6">
                    <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-slate-500">
                        Loading inventory transaction...
                    </div>
                </div>
            </AdminMainLayout>
        );
    }

    if (error || !transaction) {
        return (
            <AdminMainLayout>
                <div className="min-h-screen bg-slate-50 p-4 md:p-6">

                    <Link
                        href="/admin/inventory-transactions"
                        className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 mb-5"
                    >
                        <ArrowLeft size={18} />
                        Back to Transactions
                    </Link>

                    <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                        <FileText
                            size={42}
                            className="mx-auto text-slate-300 mb-3"
                        />

                        <h2 className="text-lg font-semibold text-slate-700">
                            Transaction Not Found
                        </h2>

                        <p className="text-slate-500 mt-1">
                            {error ??
                                "The requested inventory transaction could not be found."}
                        </p>
                    </div>

                </div>
            </AdminMainLayout>
        );
    }

    return (
        <AdminMainLayout>
            <div className="min-h-screen bg-slate-50 p-4 md:p-6">

                {/* Back */}
                <Link
                    href="/admin/inventory-transactions"
                    className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 mb-5"
                >
                    <ArrowLeft size={18} />
                    Back to Transactions
                </Link>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-slate-800">
                                {transaction.reference_number}
                            </h1>

                            {getStatusBadge(
                                transaction.status
                            )}
                        </div>

                        <p className="text-gray-500 mt-1">
                            Inventory transaction details and stock movement history.
                        </p>
                    </div>

                    <div>
                        {getTypeBadge(
                            transaction.transaction_type
                        )}
                    </div>

                </div>

                {/* Transaction Information */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-6">

                    <div className="p-5 border-b">
                        <div className="flex items-center gap-2">
                            <FileText
                                size={20}
                                className="text-sky-500"
                            />

                            <h2 className="text-lg font-semibold text-slate-800">
                                Transaction Information
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">

                        <div>
                            <p className="text-sm text-slate-400">
                                Reference Number
                            </p>

                            <p className="font-semibold text-slate-700 mt-1">
                                {transaction.reference_number}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-400">
                                Transaction Type
                            </p>

                            <div className="mt-1">
                                {getTypeBadge(
                                    transaction.transaction_type
                                )}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-slate-400">
                                Reason
                            </p>

                            <p className="font-medium text-slate-700 mt-1">
                                {formatReason(
                                    transaction.reason
                                )}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-400">
                                Reference Type
                            </p>

                            <p className="font-medium text-slate-700 mt-1">
                                {transaction.reference_type
                                    ? formatReason(
                                          transaction.reference_type
                                      )
                                    : "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-400">
                                Invoice Number
                            </p>

                            <p className="font-medium text-slate-700 mt-1">
                                {transaction.invoice_no ??
                                    "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-400">
                                Posted At
                            </p>

                            <p className="font-medium text-slate-700 mt-1">
                                {formatDate(
                                    transaction.posted_at
                                )}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-400">
                                Created By
                            </p>

                            <div className="flex items-center gap-2 mt-1">

                                <div className="w-7 h-7 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
                                    <User size={15} />
                                </div>

                                <span className="font-medium text-slate-700">
                                    {transaction.user?.name ??
                                        "-"}
                                </span>

                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-slate-400">
                                Items
                            </p>

                            <p className="font-semibold text-slate-700 mt-1">
                                {transaction.items.length}
                            </p>
                        </div>

                    </div>

                    {transaction.remarks && (
                        <div className="border-t p-5">

                            <p className="text-sm text-slate-400 mb-1">
                                Remarks
                            </p>

                            <p className="text-slate-700">
                                {transaction.remarks}
                            </p>

                        </div>
                    )}

                </div>

                {/* Inventory Items */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

                    <div className="p-5 border-b">
                        <div className="flex items-center gap-2">
                            <ClipboardList
                                size={20}
                                className="text-sky-500"
                            />

                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Inventory Items
                                </h2>

                                <p className="text-sm text-slate-400">
                                    Stock movement recorded by this transaction.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>
                                <tr className="border-b bg-slate-50 text-left text-sm text-slate-500">

                                    <th className="p-4 font-medium">
                                        SKU
                                    </th>

                                    <th className="p-4 font-medium">
                                        Product
                                    </th>

                                    <th className="p-4 font-medium">
                                        UOM
                                    </th>

                                    <th className="p-4 font-medium text-right">
                                        Quantity
                                    </th>

                                    <th className="p-4 font-medium text-right">
                                        Stock Before
                                    </th>

                                    <th className="p-4 font-medium text-right">
                                        Stock After
                                    </th>

                                    <th className="p-4 font-medium">
                                        Remarks
                                    </th>

                                </tr>
                            </thead>

                            <tbody>

                                {transaction.items.length ===
                                0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="p-10 text-center text-slate-500"
                                        >
                                            No transaction items found.
                                        </td>
                                    </tr>
                                ) : (
                                    transaction.items.map(
                                        (item) => {

                                            const variant =
                                                item.product_variant;

                                            return (
                                                <tr
                                                    key={
                                                        item.id
                                                    }
                                                    className="border-b last:border-b-0 hover:bg-slate-50"
                                                >

                                                    {/* SKU */}
                                                    <td className="p-4">
                                                        <span className="font-medium text-slate-700">
                                                            {variant?.sku ??
                                                                "-"}
                                                        </span>
                                                    </td>

                                                    {/* Product */}
                                                    <td className="p-4">

                                                        <div className="font-medium text-slate-700">
                                                            {variant
                                                                ?.product
                                                                ?.name ??
                                                                "-"}
                                                        </div>

                                                        {variant?.variant_name && (
                                                            <div className="text-sm text-slate-400 mt-1">
                                                                {
                                                                    variant.variant_name
                                                                }
                                                            </div>
                                                        )}

                                                    </td>

                                                    {/* UOM */}
                                                    <td className="p-4 text-slate-600">
                                                        {variant
                                                            ?.uom
                                                            ?.name ??
                                                            "-"}
                                                    </td>

                                                    {/* Quantity */}
                                                    <td className="p-4 text-right">

                                                        <span
                                                            className={`font-semibold ${
                                                                transaction.transaction_type ===
                                                                "stock_out"
                                                                    ? "text-red-600"
                                                                    : transaction.transaction_type ===
                                                                      "stock_in"
                                                                    ? "text-green-600"
                                                                    : "text-amber-600"
                                                            }`}
                                                        >
                                                            {transaction.transaction_type ===
                                                            "stock_out"
                                                                ? "-"
                                                                : "+"}
                                                            {formatQuantity(
                                                                item.quantity
                                                            )}
                                                        </span>

                                                    </td>

                                                    {/* Before */}
                                                    <td className="p-4 text-right text-slate-600">
                                                        {formatQuantity(
                                                            item.stock_before
                                                        )}
                                                    </td>

                                                    {/* After */}
                                                    <td className="p-4 text-right">

                                                        <span className="font-semibold text-slate-700">
                                                            {formatQuantity(
                                                                item.stock_after
                                                            )}
                                                        </span>

                                                    </td>

                                                    {/* Remarks */}
                                                    <td className="p-4 text-slate-500">
                                                        {item.remarks ??
                                                            "-"}
                                                    </td>

                                                </tr>
                                            );
                                        }
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </AdminMainLayout>
    );
}