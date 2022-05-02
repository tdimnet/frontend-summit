import { init } from '@datadog/ui-extensions-sdk'
import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import Globe from 'react-globe.gl'

import { useDimensions } from '../../hooks/useDimensions'


const client = init()

const API_URL = 'http://localhost:5000'

function Widget() {
    const globeElt = useRef<any>()
    const [ coordinates, setCoordinates ] = useState([])

    useEffect(() => {
        if (globeElt.current !== null) {
            globeElt.current.controls().autoRotate = true
            globeElt.current.controls().autoRotateSpeed = 0.3
        }
    }, [])
    
    useEffect(() => {
        fetch(`${API_URL}/ips`)
            .then(res => res.json())
            .then(data => setCoordinates(data))
            .catch(() => console.log('something went wrong'))
    }, [])

    const { height, width } = useDimensions()

    console.log("======")
    console.log(coordinates)
    console.log("======")

    return (
        <Globe
            globeImageUrl='./earth-night.jpeg'
            height={height}
            pointsData={coordinates}
            ref={globeElt}
            width={width}
        />
    )
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>{<Widget />}</React.StrictMode>,
        document.getElementById('root')
    )
}

