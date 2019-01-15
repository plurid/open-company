import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

import TitleBar from './components/layout/TitleBar';


const store = configureStore();



render(
    <AppContainer>
        <React.Fragment>
            <TitleBar />
            <Root store={store} history={history} />
        </React.Fragment>
    </AppContainer>,
    document.getElementById('root')
);


if ((module as any).hot) {
    (module as any).hot.accept('./containers/Root', () => {
        // eslint-disable-next-line global-require
        const NextRoot = require('./containers/Root').default;
        render(
            <AppContainer>
                <NextRoot store={store} history={history} />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
