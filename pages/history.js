import React from 'react'
import History from '../components/History'
import store from 'store-js'
import Link from 'next/link'
const history = () => {
    const user = store.get('user')?.user

    {if (user) {
        return (
            <div>
                <History />
            </div>
        )
    } else {
        return (
            <div style={{justifyContent:'center',alignItems:'center'}}>
                <h2><Link href='/login'>Sign in</Link> first </h2>
            </div>
        )
    }}
  
}

export default history
