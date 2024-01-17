import { useEffect, useState } from 'react'
import { throttle } from './../utils/timingUtils'

export default function useResize() {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        const onResizeCb = throttle(() => {
            setSize([window.innerWidth, window.innerHeight]);
        })

        window.addEventListener('resize', onResizeCb);
        return () => window.removeEventListener('resize', onResizeCb);
    }, []);

    return size;
}