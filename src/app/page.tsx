import Link from 'next/link'


export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-start p-24 min-h-full">
      Homepage
      <Link href="/annotation">Start annotating</Link>
    </main>
);
}