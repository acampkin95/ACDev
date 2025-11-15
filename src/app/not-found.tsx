import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center">
      <p className="text-sm uppercase tracking-widest text-zinc-400">404</p>
      <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
        That page couldn’t be found
      </h1>
      <p className="mx-auto mt-3 max-w-md text-zinc-400">
        It may have moved or never existed. Try heading back to the homepage.
      </p>
      <div className="mt-8">
        <Link href="/" className="rounded-md bg-emerald-400 px-5 py-2.5 font-medium text-zinc-950 transition hover:bg-emerald-300">
          Go home
        </Link>
      </div>
    </div>
  );
}

