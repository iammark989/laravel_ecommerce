interface SummaryLineProps {
    label: string;
    value: React.ReactNode;
}

export default function SummaryLine({
    label,
    value,
}: SummaryLineProps) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-gray-600">
                {label}
            </span>

            <span className="font-medium">
                {value}
            </span>
        </div>
    );
}