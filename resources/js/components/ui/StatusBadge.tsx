interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({
    status,
}: StatusBadgeProps) {
    const statusClasses: Record<string, string> = {
        draft:
            "bg-gray-100 text-gray-700",

        submitted:
            "bg-blue-100 text-blue-700",

        completed:
            "bg-green-100 text-green-700",

        cancelled:
            "bg-red-100 text-red-700",

        partially_received:
            "bg-amber-100 text-amber-700",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                statusClasses[status] ??
                "bg-slate-100 text-slate-700"
            }`}
        >
            {status.replace("_", " ")}
        </span>
    );
}