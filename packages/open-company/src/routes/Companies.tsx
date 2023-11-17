import './Companies.css';

import BackHomeButton from '../components/BackHomeButton';



function Companies() {
    return (
        <div class={`
            h-full p-8 w-[400px] mx-auto text-center
            grid gap-4 content-center place-content-center
        `}>
            <h1>companies</h1>

            <div class="grid gap-4 place-content-center justify-items-center w-[300px]">

                <BackHomeButton />
            </div>
        </div>
    );
}


export default Companies;
