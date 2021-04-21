import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import useSWR, { mutate } from 'swr'
import Head from 'next/head'
import styles from '../styles/movies.module.css'
//import Navbar from "../components/navbar";
import withAuth from "../components/withAuth";
import Link from 'next/link'

const URL = "http://localhost:2000/api/movies";
const URL2 = "http://localhost:2000/api/income";

const fetcher = url => axios.get(url).then(res => res.data)

const SWR2 = () => {
    const [movies, setmovies] = useState({ list: [{ id: 1, type: 'Romantic', name: "Love at first side", ratting: 8, part: 1, ToComeOut: 2012, time: 125 },] })
    const [movie, setmovie] = useState({})
    const [id, setId] = useState(0)
    const [type, setType] = useState('')
    const [name, setName] = useState(0)
    const [ratting, setRatting] = useState(0)
    const [part, setPart] = useState(0)
    //const { data } = useSWR(URL, fetcher)
    //const { data } = useSWR(URL2, fetcher)


    useEffect(() => { getmovies() }, [])

    const getmovies = async () => {
        let movies = await axios.get(URL)
        setmovies(movies.data)
        //console.log('movie:', movies.data)
    }
    const buymovie = async (id) => {
        const result = await axios.delete(`${URL2}${id}`)
        console.log(result.data)
        getmovies()
    }


    const printmovies = () => {
        if (movies && movies.length)
            return movies.map((movie, index) =>
                <li className={styles.listItem} key={index}>
                    <h6>Type:{(movie) ? movie.type : '-'}</h6>
                    <h6>Name:{(movie) ? movie.name : 0}</h6>
                    <h6>Ratting:{(movie) ? movie.ratting : 0}</h6>
                    <h6>Part:{(movie) ? movie.part : 0}</h6>

                    <button onClick={() => buymovie(movie.id)} className={styles.byttonupdate} >Buy</button>
                </li>
            )
        else
            return <li> No movie</li>
    }
    return (<div className={styles.container}>
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

        <h1>movies shop</h1>
        <ul className={styles.list} >{printmovies()}</ul>
    </div>
    )

}

export default SWR2

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}