import Navbar from "./partials/Navbar"

export default function MainLayout({ children }: any) {
    return (
        <div>
            <Navbar />
            <div className="px-2 py-2">
                {children}
            </div>
        </div>
    )
}