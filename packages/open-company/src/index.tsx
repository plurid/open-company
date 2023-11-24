/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Route, Routes } from '@solidjs/router';

import Index from './routes/Index';

import Database from './routes/Database';
import LoginUser from './routes/LoginUser';

import Users from './routes/Users';
import Companies from './routes/Companies';
import Contacts from './routes/Contacts';
import Items from './routes/Items';
import Contracts from './routes/Contracts';
import Invoices from './routes/Invoices';

import NewUser from './routes/NewUser';
import NewCompany from './routes/NewCompany';
import NewItem from './routes/NewItem';
import NewContract from './routes/NewContract';
import NewInvoice from './routes/NewInvoice';

import './styles.css';

import {
    routes,
} from './data';



render(
    () => (
        <div class="flex h-full w-full flex-col">
            <div class="flex flex-1 min-h-0 overflow-auto">
                <Router>
                    <Routes>
                        <Route path={routes.index} component={Index} />

                        <Route path={routes.new_database} component={Database} />
                        <Route path={routes.login_user} component={LoginUser} />

                        <Route path={routes.users} component={Users} />
                        <Route path={routes.companies} component={Companies} />
                        <Route path={routes.contacts} component={Contacts} />
                        <Route path={routes.items} component={Items} />
                        <Route path={routes.contracts} component={Contracts} />
                        <Route path={routes.invoices} component={Invoices} />

                        <Route path={routes.new_user} component={NewUser} />
                        <Route path={routes.new_company} component={NewCompany} />
                        <Route path={routes.edit_company} component={NewCompany} />
                        <Route path={routes.new_item} component={NewItem} />
                        <Route path={routes.edit_item} component={NewItem} />
                        <Route path={routes.new_contract} component={NewContract} />
                        <Route path={routes.new_invoice} component={NewInvoice} />
                    </Routes>
                </Router>
            </div>
        </div>
    ),
    document.getElementById('root') as HTMLElement,
);
