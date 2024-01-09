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


export const defocus = () => {
    const focusedElement = document.activeElement;
    if (focusedElement && typeof (focusedElement as any).blur === 'function') {
        (focusedElement as any).blur();
    }
}


export const getDateFormat = (
    timestamp: number,
) => {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
}
