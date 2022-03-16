import { init } from '@datadog/ui-extensions-sdk';
import React from 'react';
import ReactDOM from 'react-dom';

import 'typeface-roboto';
import 'milligram';
import '../../index.css';
import './widget.css';

const client = init();

function Widget() {

    return (
        <section style={{ padding: '10px' }}>
            <h2>Hello App Developer! 👋</h2>
            <p>Welcome to your first Datadog application.</p>
        </section>
    );
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>{<Widget />}</React.StrictMode>,
        document.getElementById('root')
    );
}
