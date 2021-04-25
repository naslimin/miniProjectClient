import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import styles from '../styles/admin.module.css'
//import useSWR, { mutate } from 'swr'
//import Navbar from "../components/navbar";
import withAuth from "../components/withAuth";


const URL = "http://localhost:2000/api/manu";
const URL2 = "http://localhost:2000/api/income";


const fetcher = url => axios.get(url).then(res => res.data)
const SWR1 = () => {
    const [manu, setmanu] = useState({})
    const [pet, setPet] = useState({})    
    const [id, setId] = useState(0)
    const [type, setType] = useState('')
    const [age, setAge] = useState(0)
    const [weight, setWeight] = useState(0)
    const [price, setPrice] = useState(0)
    const [income, setIncome] = useState(0)
    //const { data } = useSWR(URL, URL2, fetcher)


    useEffect(() => {
        getmanu();
        getIncome();
        profileUser();
      }, []);

    const profileUser = async () => {
        try {
          // console.log('token: ', token)
          const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // console.log('user: ', users.data)
          setUser(users.data);
        } catch (e) {
          console.log(e);
        }
      };
    
    const getmanu = async () => {
        let manu = await axios.get(URL)
        setmanu(manu.data)
        //console.log('Pet:', manu.data)
    }
    const getIncome = async () => {
        let income = await axios.get(URL2)
        setIncome(income.data)
        //console.log('income:', income.data)
    }

    const getPet = async (id) => {
        let pet = await axios.get(`${URL}/${id}`)
        console.log('bear id: ', pet.data)
        setPet({ id: pet.data.id, type: pet.data.type, weight: pet.data.weight, age: pet.data.age, price: pet.data.price })
    }



    const printmanu = () => {
        if (manu && manu.length)
            return manu.map((pet, index) =>
                <li className={styles.listItem} key={index}>
                    <h6>Id:{(pet) ? pet.id : 0}</h6>
                    <h6>Type:{(pet) ? pet.type : '-'}</h6>
                    <h6>Age:{(pet) ? pet.age : 0}</h6>
                    <h6>Weight:{(pet) ? pet.weight : 0}</h6>
                    Price:{(pet) ? pet.price : 0}
                    <button className={styles.byttondelet} onClick={() => deletePet(pet.id)} >Delete</button>
                    <button className={styles.byttonget} onClick={() => getPet(pet.id)}>Get</button>
                    <button className={styles.byttonupdate} onClick={() => updatePet(pet.id)}>Update</button>
                </li>
            )
        else
            return <li> No Pet</li>
    }

    const printIncome = () => {
        return income
    }


    const addPet = async (type, age, weight, price) => {
        let manu = await axios.post(URL, { type, age, weight, price })
        setmanu(manu.data)
    }


    const deletePet = async (id) => {
        const result = await axios.delete(`${URL}/${id}`)
        console.log(result.data)
        getmanu()
    }

    const updatePet = async (id) => {
        const result = await axios.put(`${URL}/${id}`, { id, type, age, weight, price })
        //console.log('student id update: ', result.data)
        getmanu()
    }



    return (<div className={styles.container} >
        <h1>Admin</h1>
        <h2>Income:{printIncome()}</h2>
        <h2>manu</h2>
        <ul className={styles.list}  >{printmanu()}</ul>
        selected pet: {pet.type} {pet.age} {pet.weight} {pet.price}
        <h2>Add pet</h2>
        <ul className={styles.formadd} >
            Type:<input type="text" onChange={(e) => setType(e.target.value)} /> <br />
        Age:<input type="number" onChange={(e) => setAge(e.target.value)} /> <br />
        Weight:<input type="number" onChange={(e) => setWeight(e.target.value)} /> <br />
        Price:<input type="number" onChange={(e) => setPrice(e.target.value)} /> <br />
            <button className={styles.byttonadd} onClick={() => addPet(type, age, weight, price)}>Add new pet</button>
        </ul>
    </div>
    )
}

export default withAuth(SWR1);

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
  }
