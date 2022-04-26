import { init } from '@datadog/ui-extensions-sdk'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
    ResponsiveContainer,
    LineChart,
    XAxis,
    YAxis
} from 'recharts'

const client = init()

function Widget() {
    const [ timeseriesData, setTimeseriesData  ] = useState<any>()

    useEffect(() => {
        const now = Math.floor(Date.now() / 1000)
        const nowMinusOneHour = now - 3600

        client.api.get('/api/v1/query', {
            params: {
                //from: '1647527858',
                //to: '1650975955',
                from: nowMinusOneHour.toString(),
                to: now.toString(),
                query: 'system.cpu.idle{*}'
            }
        })
        .then(data => {
            const timeseriesData = data.series[0]['pointlist']
            setTimeseriesData(timeseriesData)
        })
        .catch(err => console.log("An error occurs", err))
    }, [])

    console.log("=======")
    console.log(timeseriesData)
    console.log("=======")

    if (!timeseriesData) {
        return <div>Loading...</div>
    }

    return (
        <div>
        <h1>Ok, let's go</h1>
        <ResponsiveContainer>
            <LineChart
                data={timeseriesData}
            >
                <XAxis />
                <YAxis />
            </LineChart>
        </ResponsiveContainer>
        </div>
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

