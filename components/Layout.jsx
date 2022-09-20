import React from 'react'
import Head from 'next/head'

import NavBar from './NavBar'
import Footer from './Footer'

const Layout = ({children}) => {
    return (
        <div className='layout'>
            <Head>
                <title>Marlon Store</title>
            </Head>
            <header>
                <NavBar />
                <main className='main-container'>
                    {children}
                </main>
                <footer>
                    <Footer />
                </footer>
            </header>
        </div>
    )
}

export default Layout