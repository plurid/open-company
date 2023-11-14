/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Route, Routes } from '@solidjs/router';

import Index from './routes/Index';
import Database from './routes/Database';
import NewCompany from './routes/NewCompany';
import NewInvoice from './routes/NewInvoice';

import './styles.css';



render(
    () => (
        <Router>
            <Routes>
                <Route path="/" component={Index} />
                <Route path="/database" component={Database} />
                <Route path="/new-company" component={NewCompany} />
                <Route path="/new-invoice" component={NewInvoice} />
            </Routes>
        </Router>
    ),
    document.getElementById('root') as HTMLElement,
);
