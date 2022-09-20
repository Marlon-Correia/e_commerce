import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import { Product } from '../../components';
import { useCart } from '../../context/StateContext';

import { client } from '../../lib/client';

const Busca = ({products, slug}) => {
    const {setSearch} = useCart()
    useEffect(() => {
        setSearch('');
    }, [products])

    return (
        <div>
        <div className='products-heading' >
            <span>
                <h2>Basquete</h2>
                <p>Resultados para <strong>{slug}</strong></p>
            </span>
            <select name='type'>
                <option value="Selecionar">Selecionar</option>
            </select>
        </div>
        <div className='products-container'>
            {products?.length > 0 
                ?
                    products.map((productAc) => <Product key={productAc._id} product={productAc} /> )
                :
                    ''
            }
        </div>
            
        </div>
    )
}

export async function getServerSideProps(context)  {
    const {slug} = context.query;
    const lowerSlug = slug.toLowerCase();

    const query = `*[_type == "product"]`
    const products = await client.fetch(query);
    let filterProducts = products.filter(item => item.name.toLowerCase().includes(lowerSlug))

    return {
        props: {
        products: filterProducts,
        slug: slug,
        }
    }
    }
export default Busca