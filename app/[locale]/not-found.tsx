import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="text-5xl font-semibold tracking-[0.3em] text-black dark:text-white">404</p>
      <p className="mt-4 text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="mt-8 border border-black px-8 py-3 text-xs font-medium tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
      >
        BACK HOME
      </Link>
    </div>
  );
}
