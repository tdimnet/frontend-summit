import { useEffect, useState } from 'react'

const getDimensions = (): { width: number; height: number } => ({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
})


const useDimensions = (): { width: number; height: number } => {
    const [ dimensions, setDimensions ] = useState(getDimensions())

    useEffect(() => {
        const resizeListener = () => setDimensions(getDimensions())
        window.addEventListener('resize', resizeListener)

        return () => window.removeEventListener('resize', resizeListener)
    }, [])

    return dimensions
}

export {
    getDimensions,
    useDimensions
}

