import Image from 'next/image';
import Link from 'next/link';
import React, {useRef} from 'react';
import { Product, Logos, ProductCarousel } from '../components';
import {client} from '../lib/client';
import image from '../public/images/image.jpg';
import banner from '../public/images/navBar.jpg';
import caps from '../public/images/caps.jpg';
import jerseys from '../public/images/jerseys.jpg';
import { Franchise } from '../utils/franquias';
import {BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill} from 'react-icons/bs'

const Home = ({products}) => {
  const carousel = useRef(null)
  const handleLeftArrow = (e) => {
    e.preventDefault();
    console.log(carousel.current.offsetWidth)
    carousel.current.scrollLeft -= carousel.current.offsetWidth
  }
  const handleRightArrow = (e) => {
    e.preventDefault();
    console.log(carousel.current.scrollLeft)
    carousel.current.scrollLeft += carousel.current.offsetWidth
  }

  return (
    <div>
      <div className="container">
        <Image src={image}  width={1320} height={400} style={{borderRadius: 3}} alt="banner" />
        <Image src={banner} width={1000} height={56} style={{marginTop: 10}} alt="banner2" />
      </div>

      <div className="conference-area">
        <span className="title">
          Coleção de Conferência
        </span>
        <div className="banner-area">
          <div style={{margin:'0 40px', cursor: 'pointer'}}>
            <Link href='/' style={{margin:'0 40px', cursor: 'pointer'}}>
              <Image src={caps} width={557} height={444} />
            </Link>
          </div>
          <div  style={{margin:'0 40px', cursor: 'pointer'}}>
            <Link href='/product' style={{margin:'0 40px', cursor: 'pointer'}}>
              <Image src={jerseys} width={500} height={444} />
            </Link>
          </div>
        </div>
      </div>

      <div className='carousel-products'>
        <h1 className='title' style={{textAlign: 'center'}}>Mais vendidos</h1>
        <div className='carousel' ref={carousel}>
          {products.map((item) => <ProductCarousel product={item} />)}
        </div>
        <div className='carousel-products-buttons'>
          <button onClick={handleLeftArrow}>
            <BsFillArrowLeftSquareFill  size={40} />
          </button>
          <button onClick={handleRightArrow}>
            <BsFillArrowRightSquareFill size={40} />
          </button>
        </div>   
      </div>

      <div className="franchise-area">
        <span className="title">Encontre os itens da sua franquia favorita</span>
        <div className="franchise-logo-area">
          {Franchise.map(item => (<Logos item={item} />)) }
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context)  {
  const query = '*[_type == "product"][0...12]'
  const products = await client.fetch(query);
  return {
    props: {
      products,
    }
  }
}

export default Home
