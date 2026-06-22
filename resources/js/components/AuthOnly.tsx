import { usePage } from "@inertiajs/react";

export default function AuthOnly({
    children,
}: {
    children: React.ReactNode;
}) {
    const { auth } = usePage().props as any;

    if (!auth?.user) {
        return null;
    }

    return <>{children}</>;
}