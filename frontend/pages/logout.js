import Head from 'next/head'
import Layout from '../components/layout'
//import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
//import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'
import Link from 'next/link'
import styles from '../styles/index.module.css'

export default function Logout({ token }) {

    const [status, setStatus] = useState('')

    useEffect(() => {
        logout()
    }, [])

    const logout = async () => {
        console.log('remove token: ', token)
        let result = await axios.get(`${config.URL}/logout`, { withCredentials: true })
        setStatus("Logout successful")
    }

    return (
        <Layout>
            <Head>
                <title>User profile</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.topnav}>
                    <Link href="/login"><a> Login </a></Link>
                    <Link href="/getConfig"><a> Config </a></Link>
                    <Link href="/admin"><a> Admin </a></Link>
                    <Link href="/manu"><a> manu </a></Link>
                    <Link href="/foo"><a> Foo </a></Link>
                    <Link href="/profile"><a> Profile </a></Link>
                    <Link href="/register"><a> Register </a></Link>
                    <Link href="/"><a> Home </a></Link>
                </div>
                <h1>Logout</h1>
                <div>
                    <h2> {status}  </h2>
                </div>
            </div>
        </Layout>
    )
}
