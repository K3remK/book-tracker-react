'use client'

import { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>{count} likes</p>
            <button className='bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-500 cursor-pointer' onClick={() => setCount(count + 1)}>Click me!</button>
        </div>
    )
}