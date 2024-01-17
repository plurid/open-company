export default function Subtitle({
    text,
} : {
    text: string;
}) {
    return (
        <h2
            className="select-none text-center text-xl mb-4 md:text-left"
        >
            {text}
        </h2>
    );
}
