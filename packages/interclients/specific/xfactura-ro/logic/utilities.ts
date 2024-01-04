export function downloadTextFile(
    fileName: string,
    text: string,
) {
    const blob = new Blob(
        [text],
        {
            type: 'application/xml',
        },
    );

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);

    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
