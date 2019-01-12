import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

import TitleBar from './components/layout/TitleBar';


// const Datastore = require('nedb');
// const db = new Datastore({ filename: './db' });


// const doc = { hello: 'world'
//                , n: 5
//                , today: new Date()
//                , nedbIsAwesome: true
//                , notthere: null
//                , notToBeSaved: undefined  // Will not be saved
//                , fruits: [ 'apple', 'orange', 'pear' ]
//                , infos: { name: 'nedb' }
//                };

// db.loadDatabase(function (err) {    // Callback is optional
//   // Now commands will be executed
// });

// db.insert(doc, function (err, newDoc) {   // Callback is optional
//     // newDoc is the newly inserted document, including its _id
//     // newDoc has no key called notToBeSaved since its value was undefined
// });

// db.find({ hello: 'world' }, function (err, docs) {
//     console.log(docs);
// });


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
