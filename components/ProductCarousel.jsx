import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'


const ProductCarousel = ({product}) => {
    return (
        <div>
            <Link href={`/product/${product.slug.current}`}>
                <div className='productInd-card'>
                    <img 
                        src={ urlFor(product.image && product.image[0]) } 
                        width={250}
                        height={250}
                        className='product-image'
                    />
                    <div style={{textAlign: 'center'}}>
                        <p>{product.name}</p>
                        <p>R${product.price},00</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProductCarousel;