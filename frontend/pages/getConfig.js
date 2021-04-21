import Layout from '../components/layout'
import Head from 'next/head'
import config from '../config/config'
//import styles from '../styles/Home.module.css'
//import Navbar from '../components/navbar'
import Link from 'next/link'
import styles from '../styles/movies.module.css'

const GetConfig = () => {
    return (<Layout>
        <Head>
            <title>Get Config</title>
        </Head>
        <div className={styles.container}>
            <div className={styles.topnav}>
                <Link href="/logout"><a> Logout </a></Link>
                <Link href="/getConfig"><a> Config </a></Link>
                <Link href="/admin"><a> Admin </a></Link>
                <Link href="/movies"><a> movies </a></Link>
                <Link href="/foo"><a> Foo </a></Link>
                <Link href="/profile"><a> Profile </a></Link>
                <Link href="/register"><a> Register </a></Link>
                <Link href="/"><a> Home </a></Link>
            </div>
            <h2> Get Configuration from ../config/config.js </h2>
            <b>Config: </b> {JSON.stringify(config)}
            <ul>
                <li>npm run dev  (for development mode)</li>
                <li>npm run build; npm run start  (for production mode)</li>
            </ul>
        </div>

    </Layout>)
}

export default GetConfig