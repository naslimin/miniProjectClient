import Head from 'next/head'
import Layout from '../components/layout'
//import Navbar from '../components/navbar'
//import styles from '../styles/Home.module.css'
import Link from 'next/link'
import styles from '../styles/homepage.module.css'

export default function Home({ token }) {

  return (
    <Layout>
      <Head>
        <title>First Page</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.topnav}>
        <Link href="/login"><a> Login </a></Link>
          <Link href="/register"><a> Register </a></Link>
          <Link href="/homepage"><a> Home </a></Link>
          <Link href="/admin"><a> Admin </a></Link>
          <Link href="/manu"><a> manu </a></Link>
          <Link href="/foo"><a> Foo </a></Link>
          <Link href="/profile"><a> Profile </a></Link>
        </div>
        <h1>Home page</h1>
        No login required!

        
    </div>
    </Layout>
  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}
