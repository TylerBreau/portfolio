import React from 'react';
import ReactDOM from 'react-dom';
import '@Styles/index';
import {Application} from '@Views/app/Application';

ReactDOM.render(
    <React.StrictMode>
        <Application key='app' />
    </React.StrictMode>,
    document.getElementById('root')
);
