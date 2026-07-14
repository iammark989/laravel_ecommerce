
    import { Link } from "@inertiajs/react";
    import { Eye,Edit,Trash2 } from "lucide-react";


    
    interface PurchaseOrderActionsProps {
    po: any;
}

export default function PurchaseOrderActions({
    po,
}: PurchaseOrderActionsProps) {
       
    switch (po.status) {
        case "draft":
            return (
                <div className="flex gap-2">
                    <Link
                        href={`/admin/purchase-order/${po.id}/details`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 text-white hover:bg-sky-600"
                    >
                        <Eye size={18} />
                        Details
                    </Link>

                    <Link
                        href={`/admin/purchase-order/${po.id}/edit`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-500 text-white hover:bg-gray-600"
                    >
                        <Edit size={18} />
                        Edit
                    </Link>

                    <Link
                        href={`/admin/purchase-order/${po.id}/delete`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
                    >
                        <Trash2 size={18} />
                        Delete
                    </Link>
                </div>
            );

        case "submitted":
            return (
                <div className="flex gap-2">
                    <Link
                        href={`/admin/purchase-order/${po.id}/details`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 text-white hover:bg-sky-600"
                    >
                        <Eye size={18} />
                        Details
                    </Link>

                    <Link
                        href={`/admin/purchase-order/${po.id}/cancel`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
                    >
                        Cancel
                    </Link>
                </div>
            );

        case "partially_received":
             return (
                <div className="flex gap-2">
                    <Link
                        href={`/admin/purchase-order/${po.id}/details`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 text-white hover:bg-sky-600"
                    >
                        <Eye size={18} />
                        Details
                    </Link>                   
                </div>
            );
        case "completed":
             return (
                <div className="flex gap-2">
                    <Link
                        href={`/admin/purchase-order/${po.id}/details`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 text-white hover:bg-sky-600"
                    >
                        <Eye size={18} />
                        Details
                    </Link>                   
                </div>
            );
        case "cancelled":
            return (
                <Link
                    href={`/admin/purchase-order/${po.id}/details`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 text-white hover:bg-sky-600"
                >
                    <Eye size={18} />
                    Details
                </Link>
            );

        default:
            return null;
    }

       
    }
   

