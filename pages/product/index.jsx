import React from 'react';
import { FooterBanner, HeroBanner, Product } from '../../components'
import {client} from '../../lib/client';

const Products = ({products}) => {
    return (
    <>
        <div className='products-heading' >
            <span>
                <h2>Basquete</h2>
                <p>Encontre a Jersey da sua franquia do coração</p>
            </span>
            <select name='type'>
                <option value="Selecionar">Selecionar</option>
            </select>
        </div>
        <div className='products-container'>
            {products?.map(productAc => <Product key={productAc._id} product={productAc} /> ) }
        </div>
        </>
    )
    }

    export async function getServerSideProps(context)  {
    const query = '*[_type == "product"]'
    const products = await client.fetch(query);

    
    return {
        props: {
        products,
        }
    }
    }

export default Products
