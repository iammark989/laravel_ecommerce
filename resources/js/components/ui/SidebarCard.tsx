interface SidebarCardProps {
    title: string;
    children: React.ReactNode;
}

export default function SidebarCard({
    title,
    children,
}: SidebarCardProps) {

    return (

        <div className="rounded-2xl border bg-white shadow-sm">

            <div className="border-b p-5">

                <h2 className="font-semibold">
                    {title}
                </h2>

            </div>

            <div className="p-5">

                {children}

            </div>

        </div>

    );

}