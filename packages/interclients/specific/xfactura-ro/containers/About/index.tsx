import MenuBack from '../../components/MenuBack';



export default function About({
    back,
} : {
    back: () => void,
}) {
    return (
        <div
            className="text-left"
        >
            <h1
                className="text-center mb-8"
            >
                despre xfactura.ro
            </h1>

            <p>
                xfactura.ro este un proiect
                &nbsp;
                <a
                    href="https://github.com/plurid/open-company/tree/master/packages/interclients/specific/xfactura-ro"
                    target="_blank"
                >
                    open source
                </a>
            </p>

            <p>
                xfactura.ro nu este asociat cu nicio instituție
            </p>

            <p>
                xfactura.ro rulează complet local în browser și nu stochează datele în nicio bază de date externă
                <br />
                toate datele sunt stocate folosind localStorage
                <br />
                datele pot fi exportate și importate în format JSON
            </p>

            <p>
                xfactura.ro poate fi rulat pe propriul calculator folosind
                &nbsp;
                <a
                    href="https://github.com/plurid/open-company/tree/master/packages/interclients/specific/xfactura-ro#self-hosting"
                    target="_blank"
                >
                    docker
                </a>
            </p>

            <p>
                xfactura.ro poate fi susținut prin
                &nbsp;
                <a
                    href="https://buy.stripe.com/aEU5nj6Pma6Va6A3ch"
                    target="_blank"
                >
                    stripe
                </a>
            </p>

            <MenuBack
                back={back}
            />
        </div>
    );
}
