import {
    PDFDocument,
} from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';



export const savePDF = async (
    data: any,
) => {
    try {
        const url = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf';
        const fontBytes = await fetch(url).then((res) => res.arrayBuffer());

        const pdfDoc = await PDFDocument.create();

        pdfDoc.setTitle('invoice');
        pdfDoc.setAuthor('open company');
        pdfDoc.setSubject('invoice');
        pdfDoc.setKeywords(['invoice']);
        pdfDoc.setProducer('open company');
        pdfDoc.setCreator('open company');

        pdfDoc.registerFontkit(fontkit);
        const ubuntuFont = await pdfDoc.embedFont(fontBytes);

        // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
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
    } catch (error) {
        return;
    }
}
