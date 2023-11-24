import BackHomeButton from '../components/BackHomeButton';



function NewContract() {
    return (
        <div class={`
            h-full p-8 w-[400px] mx-auto text-center
            grid gap-4 content-center place-content-center
        `}>
            <h1>
                new contract
            </h1>

            <BackHomeButton />
        </div>
    );
}


export default NewContract;
