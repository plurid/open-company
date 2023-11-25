import {
    PDFDocument,
} from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';



export interface InvoiceData {
    // invoiceNumber: string;
    invoicingCompany: any;
    invoiceeCompany: any;
    invoicingItems: any[];
}


const runPDFScript = async (
    data: InvoiceData,
    pdfDoc: PDFDocument,
) => {
    const url = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf';
    const fontBytes = await fetch(url).then((res) => res.arrayBuffer());

    const ubuntuFont = await pdfDoc.embedFont(fontBytes);

    const page = pdfDoc.addPage();
    page.drawText(
        JSON.stringify(data.invoicingCompany),
        {
            x: 50,
            y: 750,
            size: 12,
            // maxWidth: 50,
            maxWidth: page.getWidth(),
            wordBreaks: [" "],
            // font: helveticaFont,
            font: ubuntuFont,
        },
    );
    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
}


export const savePDF = async (
    data: InvoiceData,
) => {
    try {
        const pdfDoc = await PDFDocument.create();

        pdfDoc.setTitle('invoice');
        pdfDoc.setAuthor('open company');
        pdfDoc.setSubject('invoice');
        pdfDoc.setKeywords(['invoice']);
        pdfDoc.setProducer('open company');
        pdfDoc.setCreator('open company');

        pdfDoc.registerFontkit(fontkit);

        const pdfBytes = await runPDFScript(
            data,
            pdfDoc,
        );

        return pdfBytes;
    } catch (error) {
        return;
    }
}
