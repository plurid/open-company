import { A } from '@solidjs/router';

import './Index.css';



function App() {
    return (
        <div class="container"
        >
            <h1>open company</h1>

            <div class="flex flex-col gap-2">
                <A href="/database">database</A>
                <A href="/new-user">new user</A>
                <A href="/new-company">new company</A>
                <A href="/new-invoice">new invoice</A>
            </div>
        </div>
    );
}


export default App;
