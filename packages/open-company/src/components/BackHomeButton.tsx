import { A } from '@solidjs/router';



function BackHomeButton({
    atClick,
} : {
    atClick?: () => void;
}) {
    return (
        <A
            href="/"
            class="mt-12"
            onClick={(event) => {
                if (atClick) {
                    event.preventDefault();
                    atClick();
                }
            }}
        >
            back
        </A>
    );
}


export default BackHomeButton;
