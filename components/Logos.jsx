import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logos = ({item}) => {
    return (
        <div className="franchise-card-logo" style={{cursor: 'pointer'}}>
            <Link href={`/search/${item.slug}`}>
                <Image src={item.logo} alt="logo" width={item.width} height={item.height}/>
            </Link>
        </div>
    )
}

export default Logos