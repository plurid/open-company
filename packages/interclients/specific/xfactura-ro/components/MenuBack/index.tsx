export default function MenuBack({
    back,
} : {
    back: () => void,
}) {
    return (
        <div
            className="mt-8 flex justify-center font-bold"
        >
            <div
                className="cursor-pointer text-center inline"
                onClick={() => back()}
            >
                înapoi
            </div>
        </div>
    );
}
