import { init } from '@datadog/ui-extensions-sdk'
import React from 'react'
import ReactDOM from 'react-dom'

const client = init()

function Widget() {
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

