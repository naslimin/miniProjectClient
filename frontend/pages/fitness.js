import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'

export default function Fitness({ token }) {

    return (
      <Layout>
        <Head>
          <title>Fitness</title>
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
          <div className={styles.listItem}>
          <h1>Fitness page</h1>

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
  