interface FormCardProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

export default function FormCard({
    title,
    description,
    children,
}: FormCardProps) {
    return (
        <div className="rounded-2xl border bg-white shadow-sm mb-3">

            <div className="border-b p-5">

                <h2 className="text-lg font-semibold">
                    {title}
                </h2>

                {description && (
                    <p className="mt-1 text-sm text-gray-500">
                        {description}
                    </p>
                )}

            </div>

            <div className="p-6">

                {children}

            </div>

        </div>
    );
}