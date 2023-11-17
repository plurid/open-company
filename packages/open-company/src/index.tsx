/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Route, Routes } from '@solidjs/router';

import Index from './routes/Index';
import Database from './routes/Database';
import NewUser from './routes/NewUser';
import LoginUser from './routes/LoginUser';
import NewCompany from './routes/NewCompany';
import NewInvoice from './routes/NewInvoice';

import Users from './routes/Users';
import Companies from './routes/Companies';
import Contacts from './routes/Contacts';
import Items from './routes/Items';
import Contracts from './routes/Contracts';
import Invoices from './routes/Invoices';

import './styles.css';

import {
    routes,
} from './data';



render(
    () => (
        <Router>
            <Routes>
                <Route path={routes.index} component={Index} />
                <Route path={routes.new_database} component={Database} />
                <Route path={routes.new_user} component={NewUser} />
                <Route path={routes.login_user} component={LoginUser} />
                <Route path={routes.new_company} component={NewCompany} />
                <Route path={routes.new_invoice} component={NewInvoice} />

                <Route path={routes.users} component={Users} />
                <Route path={routes.companies} component={Companies} />
                <Route path={routes.contacts} component={Contacts} />
                <Route path={routes.items} component={Items} />
                <Route path={routes.contracts} component={Contracts} />
                <Route path={routes.invoices} component={Invoices} />
            </Routes>
        </Router>
    ),
    document.getElementById('root') as HTMLElement,
);
