import Link from 'next/link'
export default function Annotation() {
  return (
    <main className="flex flex-col items-center justify-start p-24 min-h-full">
      Annotation Page
      <Link href="/home">Home</Link>
      <Link href="/statistics">Statistics</Link>
      <Link href="/library">Library</Link>
      <Link href="/profile">Profile</Link>
    </main>
  )
}
