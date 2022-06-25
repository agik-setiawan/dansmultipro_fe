import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full px-4 py-2 bg-sky-700 text-gray-100">
            <Link href={'/'}>
                <h1 className="text-2xl hover:cursor-pointer"><b>GitHub</b> Jobs</h1>
            </Link>
        </nav>
    )
}