import MenuBack from '../../components/MenuBack';



export default function AI({
    back,
} : {
    back: () => void;
}) {
    return (
        <div
            className="text-left"
        >
            <h1
                className="text-center mb-8"
            >
                acte inteligente
            </h1>

            <MenuBack
                back={back}
            />
        </div>
    );
}
