import { init } from '@datadog/ui-extensions-sdk'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

const client = init()

function Widget() {
    useEffect(() => {
        client.api.get('/api/v1/query', {
            params: {
                from: '1647527858',
                to: '1647532858',
                query: 'system.cpu.idle{*}'
            }
        })
        .then(data => console.log("=====", data))
        .catch(err => console.log("An error occurs", err))
    }, [])


    return (
        <h1>Ok, let's go</h1>
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

