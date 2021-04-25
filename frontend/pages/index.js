import Head from 'next/head'
import Layout from '../components/layout'
import Link from 'next/link'
import styles from '../styles/index.module.css'
import Button from '@material-ui/core/Button';

export default function Home({ token }) {

  return (
    <Layout>
      <Head>
        <title>First Page</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.topnav}>
          <Link href="/login"><a> Admin </a></Link>
          <Link href="/manu"><a> manu </a></Link>
          <Link href="/foo"><a> Foo </a></Link>
          <Link href="/profile"><a> Profile </a></Link>
          <Link href="/homepage"><a> Home </a></Link>
        </div>
        <div className={styles.listItem}>
        <h1>WELCOME TO</h1>
        <h1>MAMA KITCHEN</h1>
        </div>
        <br/>
        <button className={styles.button5}><Link href="/homepage"><a> Go to home page </a></Link></button>
    </div>
    </Layout>
  )
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
