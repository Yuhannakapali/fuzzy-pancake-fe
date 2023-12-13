import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>This is the start</h1>
      <Link href="/login">
      <button className="border-2 border-blue-700 rounded bg-blue-200">Login</button>
      </Link>
    </>
  );
}
