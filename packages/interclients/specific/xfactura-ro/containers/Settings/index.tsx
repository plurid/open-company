import MenuBack from '../../components/MenuBack';
import Deleter from '../../components/Deleter';



export default function Settings({
    back,
} : {
    back: () => void,
}) {
    return (
        <div>
            <h1
                className="text-center mb-8"
            >
                setări
            </h1>

            <div
                className="grid gap-4"
            >
                <button
                    className="font-bold"
                >
                    export
                </button>

                <button
                    className="font-bold"
                >
                    import
                </button>

                <Deleter
                    title="ștergere totală"
                    atDelete={() => {}}
                />
            </div>

            <MenuBack
                back={back}
            />
        </div>
    );
}
