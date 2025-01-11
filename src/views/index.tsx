
import React from 'react';
import { createRoot } from 'react-dom/client';
import '@Styles/index';
import {Application} from '@Views/app/Application';

const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
    <React.StrictMode>
        <Application key='app' />
    </React.StrictMode>
);
