import Link from "next/link";

export default function ErrorPage() {
    return (
        <div className="h-screen w-full flex items-center justify-center flex-col gap-2">
            <h1 className="text-2xl font-semibold">404 Page not found!</h1>
            <Link href={'/'} className="text-teal-500 hover:underline">Redirect to home</Link>
        </div>
    )
}