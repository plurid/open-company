import * as React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';

import * as routes from './constants/routes.json';


import ClientCreatePage from './containers/ClientCreatePage';
import ClientEditPage from './containers/ClientEditPage';

import CompanyCreatePage from './containers/CompanyCreatePage';
import CompanyDashboardPage from './containers/CompanyDashboardPage';
import CompanyEditPage from './containers/CompanyEditPage';
import CompanySelectPage from './containers/CompanySelectPage';

import DatabaseChoosePage from './containers/DatabaseChoosePage';
import DatabasePasswordPage from './containers/DatabasePasswordPage';

import InvoiceCreatePage from './containers/InvoiceCreatePage';
import InvoiceEditPage from './containers/InvoiceEditPage';

import IntroPage from './containers/IntroPage';



export default () => (
    <App>
        <Switch>
            <Route path={routes.DATABASE_CHOOSE} component={DatabaseChoosePage} />
            <Route path={routes.DATABASE_PASSWORD} component={DatabasePasswordPage} />

            <Route path={routes.COMPANY_CREATE} component={CompanyCreatePage} />
            <Route path={routes.COMPANY_DASHBOARD} component={CompanyDashboardPage} />
            <Route path={routes.COMPANY_EDIT} component={CompanyEditPage} />
            <Route path={routes.COMPANY_SELECT} component={CompanySelectPage} />

            <Route path={routes.CLIENT_CREATE} component={ClientCreatePage} />
            <Route path={routes.CLIENT_EDIT} component={ClientEditPage} />

            <Route path={routes.INVOICE_CREATE} component={InvoiceCreatePage} />
            <Route path={routes.INVOICE_EDIT} component={InvoiceEditPage} />

            <Route path={routes.INTRO} component={IntroPage} />
        </Switch>
    </App>
);
