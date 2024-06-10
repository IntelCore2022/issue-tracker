import Image from 'next/image'
import NavBar from './NavBar'
import{ Button } from '@radix-ui/themes'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <p><Button><Link href='/issues/new'>New Issues</Link></Button></p>
    </main>
  )
}
