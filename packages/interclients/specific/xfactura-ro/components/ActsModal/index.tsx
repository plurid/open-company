import LinkButton from '../LinkButton';
import Subtitle from '../Subtitle';
import TooltipQuestion from '../TooltipQuestion';



export default function ActsModal({
    title,
    description,
    back,
    action,
} : {
    title: string;
    description: string;
    back: () => void;
    action: (
        type: 'local' | 'cloud',
    ) => void;
}) {
    return (
        <div
            role="status"
            className={`fixed w-full h-full backdrop-blur-md top-0 right-0 bottom-0 z-30 grid items-center justify-center place-content-center gap-12`}
            style={{
            }}
        >
            <div
                className="grid gap-2 max-w-[250px]"
            >
                <div
                    className="m-auto"
                >
                    <Subtitle
                        text={title}
                    />
                </div>

                <div>
                    {description}
                </div>
            </div>

            <div
                className="grid items-center justify-center gap-2"
            >
                <div
                    className="flex items-center justify-center gap-2"
                >
                    <LinkButton
                        text="procesare locală"
                        onClick={() => {
                            action('local');
                        }}
                    />

                    <TooltipQuestion
                        content={(
                            <p
                                style={{
                                    margin: 0,
                                }}
                            >
                                folosire modele neuronale locale, timpul de încărcare și de procesare este mai mare, iar rezultatele sunt mai puțin precise
                            </p>
                        )}
                    />
                </div>

                <div
                    className="text-sm"
                >
                    gratuit
                </div>
            </div>

            <div
                className="grid items-center justify-center gap-2"
            >
                <div
                    className="flex items-center justify-center gap-2"
                >
                    <LinkButton
                        text="procesare în cloud"
                        onClick={() => {
                            // show login screen?
                            // show buy screen?

                            action('cloud');
                        }}
                    />

                    <TooltipQuestion
                        content={(
                            <p
                                style={{
                                    margin: 0,
                                }}
                            >
                                folosire modele neuronale în cloud, timpul de încărcare și de procesare este scurt, iar rezultatele sunt mult mai precise
                            </p>
                        )}
                    />
                </div>

                <div
                    className="text-sm"
                >
                    contra cost
                </div>
            </div>

            <LinkButton
                text="anulare"
                onClick={() => {
                    back();
                }}
            />
        </div>
    );
}
