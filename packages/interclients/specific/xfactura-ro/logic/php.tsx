import { PhpWeb } from 'php-wasm/PhpWeb.mjs';



export class PHPRunner {
    public php: any;
    public extractor;


    constructor(
        extractor: (value: string) => void,
    ) {
        this.php = new PhpWeb;

        this.listen();
        this.run();
        this.extractor = extractor;
    }


    private listen() {
        // Listen to STDOUT
        this.php.addEventListener('output', (event: any) => {
            try {
                const data = event.detail[0].trim();
                if (!data) {
                    return;
                }
                this.extractor(data);
            } catch (error) {
                console.log(error);
            }
        });

        // Listen to STDERR
        this.php.addEventListener('error', (event: any) => {
            // console.log(event.detail);
        });
    }

    private run() {
        this.php.addEventListener('ready', () => {
            this.php.run(`
                <?php
                // TODO ???

                $invoiceInput = file_get_contents('php://stdin');
                // echo $userInput;
                $invoiceData = json_decode($invoiceInput);
                echo json_encode($invoiceData);
            `).then((value: string) => {
                // this.extractor(value);
            });
        });
    }


    public input<I>(
        data: I,
    ) {
        this.php.inputString(
            JSON.stringify(data),
        );
    }
}
