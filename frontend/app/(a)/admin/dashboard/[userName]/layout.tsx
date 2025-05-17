export const metadata = {
    title: "Admin Dashboard - Fit Life Gym",
    description: "Admin dashboard page"
}

export default function AdminDashboardLayout({children}: Readonly<{children: React.ReactNode}>){
    return(
        <div>
            {children}
        </div>
    )
}