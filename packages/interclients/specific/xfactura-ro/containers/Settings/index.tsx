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
                className="text-center"
                style={{
                    marginBottom: '2rem',
                }}
            >
                setări
            </h1>

            <div
                className="grid gap-4"
            >
                <button>
                    export
                </button>

                <button>
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
