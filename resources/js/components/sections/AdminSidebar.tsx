import { useState } from "react";
import { Link,usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    Boxes,
    Package,
    FolderTree,
    Tags,
    Warehouse,
    ShoppingCart,
    Truck,
    ClipboardList,
    History,
    Users,
    UserCircle,
    BarChart3,
    Settings,
    Building2,
    LogOut,
    ChevronDown,
    ChevronRight,
    Menu,
    X,
    FileText,
    BadgeDollarSign,
    PackageOpen,
    Handshake,
    User,
    UsersRound,
    PackageSearch,
    FileSpreadsheet,
    ChartColumn,
    PackageCheck
} from "lucide-react";

export default function AdminSidebar() {

    const { auth,role } = usePage().props as any;
    const user = auth?.user;

    const [open, setOpen] = useState(false);

    const [catalogOpen, setCatalogOpen] = useState(false);

    const [inventoryOpen, setInventoryOpen] = useState(false);

    const [purchaseOrderOpen, setPurchaseOrderOpen] = useState(false);

    const [salesOpen, setSalesOpen] = useState(false);

    const [stockControlOpen, setStockControlOpen] = useState(false);

    const [businessPartnerOpen, setBusinessPartnerOpen] = useState(false);

    const [reportOpen, setReportOpen] = useState(false);

    const [settingsOpen, setSettingsOpen] = useState(false);

    return (

        <>
            {/* Mobile Toggle */}

            <button
                onClick={() => setOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow"
            >
                <Menu size={22} />
            </button>

            {/* Overlay */}

            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}

            <aside
            className={`
                fixed
                top-0
                left-0
                z-50
                h-screen
                w-72
                bg-slate-900
                text-white
                flex
                flex-col
                transition-transform
                duration-300
                ${
                    open
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                }
            `}
        >

                {/* Header */}

                <div className="flex items-center justify-between p-6 border-b border-slate-700">

                    <div>

                        <h1 className="text-xl font-bold">
                            Mark Shopping Spree
                        </h1>

                        <p className="text-sm text-slate-400">
                            Inventory System
                        </p>

                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="lg:hidden"
                    >
                        <X />
                    </button>

                </div>

                {/* User */}

                <div className="border-b border-slate-700 p-6">

                    <div className="flex items-center gap-3">

                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm bg-slate-100 flex items-center justify-center">

                        <img
                            src={`${import.meta.env.VITE_IMAGE_URL}/files/user_images/${user.image}`}
                            alt={user.name}
                            className="w-full h-full object-cover"
                        />

                    </div>

                        <div>

                            <p className="font-semibold">
                                {user.first_name}
                            </p>

                            <p className="text-sm text-slate-400">
                                {role.name}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Menu */}

                <div className="flex-1 overflow-y-auto px-4 py-5 space-y-2">

                    <SidebarItem
                        icon={<LayoutDashboard size={20} />}
                        label="Dashboard"
                        href="/admin/dashboard"
                    />

                    {/* Catalog */}

                    <SidebarDropdown
                        title="Catalog"
                        icon={<Boxes size={20} />}
                        open={catalogOpen}
                        setOpen={setCatalogOpen}
                    >

                        <SidebarChild
                            href="/admin/products"
                            icon={<Package size={18} />}
                            label="Products"
                        />

                        <SidebarChild
                            href="/admin/categories"
                            icon={<FolderTree size={18} />}
                            label="Categories"
                        />

                        <SidebarChild
                            href="/admin/brands"
                            icon={<Tags size={18} />}
                            label="Brands"
                        />

                    </SidebarDropdown>

                    {/* Inventory */}

                    <SidebarDropdown
                        title="Inventory"
                        icon={<Warehouse size={20} />}
                        open={inventoryOpen}
                        setOpen={setInventoryOpen}
                    >

                        <SidebarChild
                            href="/admin/product/list"
                            icon={<Package size={18} />}
                            label="Item Masterlist"
                        />
                    </SidebarDropdown>

                    {/* Purchase Order */}
                    <SidebarDropdown
                        title="Purchase Order"
                        icon={<ShoppingCart size={20} />}
                        open={purchaseOrderOpen}
                        setOpen={setPurchaseOrderOpen}
                    >

                     <SidebarChild
                            href="/admin/purchase-orders"
                            icon={<ClipboardList size={18} />}
                            label="Purchase Orders"
                        />

                        <SidebarChild
                            href="/admin/goods-receipts"
                            icon={<PackageCheck size={18} />}
                            label="Goods Receipts"
                        />
                     </SidebarDropdown>

                     {/* Sales */}
                    <SidebarDropdown
                        title="Sales"
                        icon={<BadgeDollarSign size={20} />}
                        open={salesOpen}
                        setOpen={setSalesOpen}
                    >

                        <SidebarChild
                            href="/admin/sales-orders"
                            icon={<FileText size={18}/>}
                            label="Sales Orders"
                        />

                        <SidebarChild
                            href="/admin/delivery-receipts"
                            icon={<PackageOpen size={18}/>}
                            label="Delivery Receipts"
                        />
                     </SidebarDropdown>

                    {/* Stock Controls */}
                    <SidebarDropdown
                        title="Stock Controls"
                        icon={<Warehouse size={20} />}
                        open={stockControlOpen}
                        setOpen={setStockControlOpen}
                    >
                        <SidebarChild
                            href="/admin/stock-adjustments"
                            icon={<PackageSearch size={18} />}
                            label="Stock Adjustments"
                        />

                        <SidebarChild
                            href="/admin/inventory-history"
                            icon={<History size={18} />}
                            label="Inventory History"
                        />
                     </SidebarDropdown>


                    {/* Business Partners */}

                    <SidebarDropdown
                        title="Business Partners"
                        icon={<Handshake size={20} />}
                        open={businessPartnerOpen}
                        setOpen={setBusinessPartnerOpen}
                    >
                        <SidebarChild
                            href="/admin/supplier/list"
                            icon={<UsersRound size={20} />}
                            label="Supplier List"
                        />

                        {/*<SidebarChild
                            href="/admin/suppliers/category"
                            label="Suppliers Categories"
                        />*/}

                        <SidebarChild
                            href="/admin/customers/list"
                            icon={<Users size={20} />}
                            label="Customer List"
                        />

                        <SidebarChild
                            href="/admin/customers/groups"
                            icon={<Building2 size={20} />}
                            label="Customer Groups"
                        />

                    </SidebarDropdown>

                    {/* Reports */}

                    <SidebarDropdown
                        title="Reports"
                        icon={<BarChart3 size={20} />}
                        open={reportOpen}
                        setOpen={setReportOpen}
                    >

                        <SidebarChild
                            href="/admin/reports/sales"
                            icon={<ChartColumn size={18} />}
                            label="Sales Report"
                        />

                        <SidebarChild
                            href="/admin/reports/purchase"
                            icon={<BarChart3 size={18} />}
                            label="Purchase Report"
                        />

                    </SidebarDropdown>

                    {/* Settings */}

                    <SidebarDropdown
                        title="Settings"
                        icon={<Settings size={20} />}
                        open={settingsOpen}
                        setOpen={setSettingsOpen}
                    >

                        <SidebarChild
                            href="/admin/settings/company"
                            icon={<Building2 size={18} />}
                            label="Company Settings"
                        />

                    </SidebarDropdown>

                </div>

                {/* Logout */}

                <div className="border-t border-slate-700 p-4">

                    <Link
                        href="/admin/logout"
                        method="post"
                        as="button"
                        className="flex items-center gap-3 text-red-400 hover:text-red-300"
                    >
                        <LogOut size={20} />

                        Logout

                    </Link>

                </div>

            </aside>
        </>

    );

}

/* ---------- Components ---------- */

function SidebarItem({
    href,
    icon,
    label,
}: any) {

    return (

        <Link
            href={href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800"
        >
            {icon}

            {label}

        </Link>

    );

}

function SidebarDropdown({
    title,
    icon,
    open,
    setOpen,
    children,
}: any) {

    return (

        <div>

            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center px-4 py-3 rounded-xl hover:bg-slate-800"
            >

                <div className="flex items-center gap-3">

                    {icon}

                    {title}

                </div>

                {open ? (
                    <ChevronDown size={18} />
                ) : (
                    <ChevronRight size={18} />
                )}

            </button>

            {open && (

                <div className="ml-6 mt-1 space-y-1">

                    {children}

                </div>

            )}

        </div>

    );

}

function SidebarChild({
    href,
    label,
    icon,
}: any) {

    return (

        <Link
            href={href}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
        >

            {icon}

            {label}

        </Link>

    );

}