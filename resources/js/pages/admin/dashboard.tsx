import AdminMainLayout from "@/components/layout/AdminMainLayout";
import PageHeader from "@/components/ui/PageHeader";
import {
    Package,
    Boxes,
    Truck,
    Users,
    AlertTriangle,
    ShoppingCart,
    PhilippinePeso,
    Warehouse,
    ClipboardList,
    Plus,
    TrendingUp,
    Activity,
} from "lucide-react";
import { Link } from "@inertiajs/react";

export default function DashboardPage() {

    const dashboard = {
        products: 125,
        variants: 384,
        suppliers: 18,
        customers: 542,

        lowStock: 15,
        outOfStock: 4,
        pendingPO: 6,

        todaySales: "₱12,450",
        monthSales: "₱185,620",
        inventoryValue: "₱845,320",

        warehouse: 1,
    };

    const activities = [
        {
            title: "Variant Updated",
            subtitle: "Kopiko Blanca Twinpack 85g",
            time: "10 mins ago",
        },
        {
            title: "Supplier Added",
            subtitle: "Nestlé Philippines",
            time: "45 mins ago",
        },
        {
            title: "Purchase Order Approved",
            subtitle: "PO-20260711-00012",
            time: "2 hours ago",
        },
        {
            title: "Product Created",
            subtitle: "Nike Air Max",
            time: "Yesterday",
        },
    ];

    const lowStocks = [
        {
            sku: "KOP-001",
            name: "Kopiko Blanca Twinpack",
            stock: 5,
            reorder: 20,
        },
        {
            sku: "DM-100",
            name: "Del Monte Heart Smart",
            stock: 3,
            reorder: 15,
        },
        {
            sku: "NES-015",
            name: "Nescafe Creamy White",
            stock: 0,
            reorder: 20,
        },
    ];

    return (

        <AdminMainLayout>

            <section className="space-y-6">

                <PageHeader
                    title="Business Overview"
                    description="Welcome back! Here's your business overview."
                />

                {/* KPI Cards */}

                <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">

                    <DashboardCard
                        title="Products"
                        value={dashboard.products}
                        icon={<Package size={24} />}
                        color="sky"
                    />

                    <DashboardCard
                        title="Variants"
                        value={dashboard.variants}
                        icon={<Boxes size={24} />}
                        color="emerald"
                    />

                    <DashboardCard
                        title="Suppliers"
                        value={dashboard.suppliers}
                        icon={<Truck size={24} />}
                        color="amber"
                    />

                    <DashboardCard
                        title="Customers"
                        value={dashboard.customers}
                        icon={<Users size={24} />}
                        color="violet"
                    />

                </div>

                {/* Alerts */}

                <div className="grid lg:grid-cols-3 gap-5">

                    <InfoCard
                        title="Low Stock"
                        value={dashboard.lowStock}
                        icon={<AlertTriangle size={26} />}
                        color="yellow"
                    />

                    <InfoCard
                        title="Out of Stock"
                        value={dashboard.outOfStock}
                        icon={<Boxes size={26} />}
                        color="red"
                    />

                    <InfoCard
                        title="Pending Purchase Orders"
                        value={dashboard.pendingPO}
                        icon={<ClipboardList size={26} />}
                        color="blue"
                    />

                </div>

                {/* Sales + Inventory */}

                <div className="grid lg:grid-cols-3 gap-5">

                    <div className="bg-white rounded-2xl shadow-sm p-6">

                        <h2 className="font-semibold text-lg mb-5">
                            Sales Summary
                        </h2>

                        <div className="space-y-5">

                            <SummaryItem
                                title="Today's Sales"
                                value={dashboard.todaySales}
                            />

                            <SummaryItem
                                title="Monthly Sales"
                                value={dashboard.monthSales}
                            />

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6">

                        <h2 className="font-semibold text-lg mb-5">
                            Inventory Overview
                        </h2>

                        <div className="space-y-5">

                            <SummaryItem
                                title="Inventory Value"
                                value={dashboard.inventoryValue}
                            />

                            <SummaryItem
                                title="Warehouses"
                                value={dashboard.warehouse}
                            />

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6">

                        <h2 className="font-semibold text-lg mb-5">
                            Quick Actions
                        </h2>

                        <div className="grid gap-3">

                            <QuickButton
                                href="/admin/product/new"
                                icon={<Plus size={18} />}
                                label="Add Product"
                            />

                            <QuickButton
                                href="/admin/supplier/new"
                                icon={<Truck size={18} />}
                                label="Add Supplier"
                            />

                            <QuickButton
                                href="#"
                                icon={<ShoppingCart size={18} />}
                                label="New Purchase Order"
                            />

                            <QuickButton
                                href="#"
                                icon={<Warehouse size={18} />}
                                label="Stock Adjustment"
                            />

                        </div>

                    </div>

                </div>

                {/* Bottom */}

                <div className="grid xl:grid-cols-3 gap-5">

                    {/* Low Stock */}

                    <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm">

                        <div className="p-5 border-b">

                            <h2 className="font-semibold text-lg">
                                Low Stock Items
                            </h2>

                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-slate-100">

                                    <tr>

                                        <th className="text-left p-4">SKU</th>
                                        <th className="text-left p-4">Variant</th>
                                        <th className="text-center p-4">Stock</th>
                                        <th className="text-center p-4">Reorder</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {lowStocks.map((item) => (

                                        <tr
                                            key={item.sku}
                                            className="border-t hover:bg-slate-50"
                                        >

                                            <td className="p-4">
                                                {item.sku}
                                            </td>

                                            <td className="p-4">
                                                {item.name}
                                            </td>

                                            <td className="p-4 text-center text-red-600 font-semibold">
                                                {item.stock}
                                            </td>

                                            <td className="p-4 text-center">
                                                {item.reorder}
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* Activity */}

                    <div className="bg-white rounded-2xl shadow-sm p-6">

                        <div className="flex items-center gap-2 mb-5">

                            <Activity size={20} />

                            <h2 className="font-semibold text-lg">
                                Recent Activities
                            </h2>

                        </div>

                        <div className="space-y-5">

                            {activities.map((activity, index) => (

                                <div
                                    key={index}
                                    className="border-l-2 border-sky-500 pl-4"
                                >

                                    <div className="font-medium">
                                        {activity.title}
                                    </div>

                                    <div className="text-sm text-gray-500">
                                        {activity.subtitle}
                                    </div>

                                    <div className="text-xs text-gray-400 mt-1">
                                        {activity.time}
                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </section>

        </AdminMainLayout>

    );

}

function DashboardCard({ title, value, icon, color }: any) {

    const colors: any = {
        sky: "bg-sky-100 text-sky-600",
        emerald: "bg-emerald-100 text-emerald-600",
        amber: "bg-amber-100 text-amber-600",
        violet: "bg-violet-100 text-violet-600",
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center">

            <div>

                <p className="text-gray-500 text-sm">{title}</p>

                <h2 className="text-3xl font-bold mt-1">{value}</h2>

            </div>

            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colors[color]}`}>
                {icon}
            </div>

        </div>
    );

}

function InfoCard({ title, value, icon, color }: any) {

    const colors: any = {
        yellow: "text-yellow-600",
        red: "text-red-600",
        blue: "text-sky-600",
    };

    return (

        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4">

            <div className={colors[color]}>
                {icon}
            </div>

            <div>

                <p className="text-gray-500 text-sm">{title}</p>

                <h2 className="text-2xl font-bold">{value}</h2>

            </div>

        </div>

    );

}

function SummaryItem({ title, value }: any) {

    return (

        <div className="flex justify-between border-b pb-3">

            <span className="text-gray-500">
                {title}
            </span>

            <span className="font-semibold">
                {value}
            </span>

        </div>

    );

}

function QuickButton({ href, icon, label }: any) {

    return (

        <Link
            href={href}
            className="flex items-center gap-3 border rounded-xl p-4 hover:bg-sky-50 hover:border-sky-500 transition"
        >

            {icon}

            <span>{label}</span>

        </Link>

    );

}