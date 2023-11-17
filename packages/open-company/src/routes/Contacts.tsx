import './Contacts.css';

import BackHomeButton from '../components/BackHomeButton';



function Contacts() {
    return (
        <div class={`
            h-full p-8 w-[400px] mx-auto text-center
            grid gap-4 content-center place-content-center
        `}>
            <h1>contacts</h1>

            <div class="grid gap-4 place-content-center justify-items-center w-[300px]">

                <BackHomeButton />
            </div>
        </div>
    );
}


export default Contacts;
