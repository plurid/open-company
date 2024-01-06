import {
    WebContainer,
} from '@webcontainer/api';

import {
    files,
} from '../data/files';



let webcontainerInstance: WebContainer | null = null;

window.addEventListener('load', async () => {
    webcontainerInstance = await WebContainer.boot();
    await webcontainerInstance.mount(files);

    const exitCodeInstall = await installDependencies();
    if (exitCodeInstall !== 0) {
        throw new Error('Installation failed');
    }
});

async function installDependencies() {
    if (!webcontainerInstance) {
        return;
    }

    const installProcess = await webcontainerInstance.spawn('npm', ['install']);
    installProcess.output.pipeTo(new WritableStream({
        write(data) {
            console.log(data);
        }
    }));

    return installProcess.exit;
}

export async function writeData<D>(
    content: D,
) {
    if (!webcontainerInstance) {
        return;
    }

    await webcontainerInstance.fs.writeFile('/data.json', JSON.stringify(content));
}

export async function startNodePHPServer(
    extractor: (value: string) => void,
) {
    if (!webcontainerInstance) {
        return;
    }

    const startProcess = await webcontainerInstance.spawn('npm', ['run', 'start']);
    startProcess.output.pipeTo(new WritableStream({
        write(data) {
            try {
                const result = JSON.parse(data);
                if (result.status) {
                    extractor(result.data);
                }
            } catch(error) {
                return;
            }
        }
    }));

    return startProcess.exit;
}
