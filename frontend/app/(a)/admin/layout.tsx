import { AdminHeader } from "@/components/admin-navbar";

export default function AdminLayout({children}: Readonly<{children: React.ReactNode}>) {
    return(
        <div>
            <AdminHeader />
            {children}
        </div>
    )
}