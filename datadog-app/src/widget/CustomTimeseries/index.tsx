import { init } from '@datadog/ui-extensions-sdk'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
    ResponsiveContainer,
    LineChart,
    XAxis,
    YAxis,
    Line,
    Legend,
    Tooltip
} from 'recharts'

import { useDimensions } from '../../hooks/useDimensions'

const client = init()

function Widget() {
    const [ timeseriesData, setTimeseriesData  ] = useState<any>()

    useEffect(() => {
        const now = Math.floor(Date.now() / 1000)
        const nowMinusOneHour = now - 3600

        client.api.get('/api/v1/query', {
            params: {
                from: nowMinusOneHour.toString(),
                to: now.toString(),
                query: 'system.cpu.idle{*}'
            }
        })
        .then(data => {
            const timeseriesData = data.series[0]['pointlist'].map((d: [number, number]) => ({
                time: new Date(d[0]).toLocaleTimeString("en-US"),
                cpu: d[1]
            }))
            setTimeseriesData(timeseriesData)
        })
        .catch(err => console.log("An error occurs", err))
    }, [])


    const { height, width } = useDimensions()

    if (!timeseriesData) {
        return <div>Loading...</div>
    }

    return (
        <ResponsiveContainer width={width} height={height}>
            <LineChart width={width} height={height} data={timeseriesData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>
            <Widget />
        </React.StrictMode>,
        document.getElementById('root')
    )
}

