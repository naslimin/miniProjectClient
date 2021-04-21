import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import useSWR, { mutate } from 'swr'
import Head from 'next/head'
import styles from '../styles/movies.module.css'
//import Navbar from "../components/navbar";
import withAuth from "../components/withAuth";
import Link from 'next/link'
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
"mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

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
            <MDBContainer>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img
                className="d-block w-100 fixP1"
                src={pic1}
                alt="First slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                className="d-block w-100 fixP2"
                src={pic2}
                alt="Second slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
                className="d-block w-100 fixP3"
                src={pic3}
                alt="Third slide"
              />
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
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


const s = {
    container: "fullW fullH rel overflowH",
    onScreen: "left0",
    offScreenRight: "left100vw",
    offScreenLeft: "leftM100vw",
    transition: "transition1l"
};

class Slideshow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slide1: {
                id: 0,
                position: s.onScreen,
                transition: true
            },
            slide2: {
                id: 1,
                position: s.offScreenRight,
                transition: true
            },
            currentId: 0
        };
    }

    componentDidMount() {
        this.startCarousel();
    }

    componentWillUnmount() {
        clearInterval(this.carouselInterval);
    }

    startCarousel = () => {
        this.carouselInterval = setInterval(() => {
            this.transitionSlides();
        }, 4000);
    };

    setSlideState = (slide1, slide2, currentId) => {
        this.setState({
            slide1: slide1,
            slide2: slide2,
            currentId: currentId
        });
    };

    transitionSlides = () => {
        const { slide1, slide2 } = this.state;
        let currentId;
        if (slide1["position"] === s.onScreen) {
            slide1["position"] = s.offScreenLeft;
            slide2["position"] = s.onScreen;
            currentId = slide2.id;
        } else {
            slide1["position"] = s.onScreen;
            slide2["position"] = s.offScreenLeft;
            currentId = slide1.id;
        }
        this.setSlideState(slide1, slide2, currentId);
        setTimeout(() => {
            this.resetSlideOffScreen();
        }, 1000);
    };

    resetSlideOffScreen = () => {
        const { slide1, slide2, currentId } = this.state;
        const { slides } = this.props;
        if (slide1["position"] === s.offScreenLeft) {
            slide1["transition"] = false;
            slide1["position"] = s.offScreenRight;
            slide1["id"] = slide2.id + 1 === slides.length ? 0 : slide2.id + 1;
        } else {
            slide2["transition"] = false;
            slide2["position"] = s.offScreenRight;
            slide2["id"] = slide1.id + 1 === slides.length ? 0 : slide1.id + 1;
        }
        this.setSlideState(slide1, slide2, currentId);
        this.resetSlideTransitions(slide1, slide2, currentId);
    };

    resetSlideTransitions = (slide1, slide2, currentId) => {
        setTimeout(() => {
            slide1["transition"] = true;
            slide2["transition"] = true;
            this.setSlideState(slide1, slide2, currentId);
        }, 500);
    };

    render() {
        const { slide1, slide2} = this.state;
        const { slides } = this.props;
        return (
            <div className={s.container}>
                <Slide
                    image={slides[slide1.id]}
                    position={slide1.position}
                    transition={slide1.transition ? s.transition : ""}
                />
                <Slide
                    image={slides[slide2.id]}
                    position={slide2.position}
                    transition={slide2.transition ? s.transition : ""}
                />
            </div>
        );
    }
}

export default Slideshow;
