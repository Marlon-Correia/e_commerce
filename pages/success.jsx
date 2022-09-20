import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import {useCart} from '../context/StateContext';
import { BsBagCheckFill } from 'react-icons/bs';
import { runFireworks } from '../lib/utils';

const Sucess = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useCart();
    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireworks();
    }, [])
    return (
        <div className='success-wrapper'>
            <div className="success">
                <p className="icon">
                    <BsBagCheckFill />
                </p>
                <h2>Obrigado pela sua compra!</h2>
                <p className="email-msg">Cheque seu email.</p>
                <p className="description">
                    Se tiver alguma duvida, mande um email 
                    <a href="mailto:order@exemple.com" className="email">
                        email@outlook.pt
                    </a>
                </p>
                <Link href='/'>
                    <button className='btn' type='button' width='300px'>
                        Continue Comprando
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Sucess