import Link from 'next/link'
import React from 'react'
import { urlFor } from '../lib/client'

const HeroBanner = ({bannerData}) => {
    console.log(bannerData)
    return (
        <div className='hero-banner-container'>
            <div>
                <p className="beats-solo">{bannerData.smallText}</p>
                <h3>{bannerData.midText}</h3>
                <h1>{bannerData.largeText1}</h1>
                <img src={urlFor(bannerData.image)} alt="fones" className='hero-banner-image' />
            
                <div>
                    <Link href={`/product/${bannerData.product}`}>
                        <button type='button'>{bannerData.buttonText}</button>
                    </Link>
                </div>
                <div className="desc">
                    <h5>{bannerData.saleTime}</h5>
                    <p>{bannerData.desc}</p>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner