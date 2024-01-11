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


export function toFixed(
    num: number,
    fixed: number = 2,
) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)![0].replace('.', ',');
}


export const formatNumber = (
    value: number,
) => {
    const formatter = new Intl.NumberFormat('ro-RO', {
        // currency: 'RON',
        // currencySign: 'accounting',
        // style: 'currency',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    });
    const formated = formatter.format(value);

    return formated;
}


export const financial = (
    num: number,
) => {
    return Math.round(num * 100) / 100;
}


export const logger = (
    type: 'log' | 'error' | 'warn' | 'info',
    ...args: any[]
) => {
    switch (type) {
        case 'log':
            console.log(...args);
            break;
        case 'error':
            console.error(...args);
            break;
        case 'warn':
            console.warn(...args);
            break;
        case 'info':
            console.info(...args);
            break;
    }
}


export function debounce(callback: any, delay = 700) {
    let timer: any;

    return (...args: any) => {
        return new Promise((resolve, reject) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                try {
                    let output = callback(...args);
                    resolve(output);
                } catch (err) {
                    reject(err);
                }
            }, delay);
        })

    }
}
