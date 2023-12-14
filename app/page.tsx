import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>This is the start</h1>
      <div className="flex gap-4">
        <Link href="/login">
          <button className="border-2 border-blue-700 rounded bg-blue-200 px-2">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="border-2 border-blue-700 rounded bg-blue-200 px-2">
            Signup
          </button>
        </Link>
      </div>
      <div>
        <h1>Visit protected page</h1>
        <Link href="/protected">
        <button className="border-2 border-red-700 rounded bg-red-200 px-2">
          Protected
        </button>
        </Link>
      </div>
    </>
  );
}
