import * as React from 'react';
import { Switch, Route } from 'react-router';
const routes = require('./constants/routes.json');
import App from './containers/App';
import HomePage from './containers/HomePage';
import ChooseDatabasePage from './containers/ChooseDatabasePage';
import PasswordDatabasePage from './containers/PasswordDatabasePage';
import CreateCompanyPage from './containers/CreateCompanyPage';
import CreateClientPage from './containers/CreateClientPage';
import CreateInvoicePage from './containers/CreateInvoicePage';



export default () => (
    <App>
        <Switch>
            <Route path={routes.CHOOSE_DATABASE} component={ChooseDatabasePage} />
            <Route path={routes.PASSWORD_DATABASE} component={PasswordDatabasePage} />
            <Route path={routes.CREATE_COMPANY} component={CreateCompanyPage} />
            <Route path={routes.CREATE_CLIENT} component={CreateClientPage} />
            <Route path={routes.CREATE_INVOICE} component={CreateInvoicePage} />
            <Route path={routes.HOME} component={HomePage} />
        </Switch>
    </App>
);
