export function getFileNameFromPath(
    filePath: string,
) {
    const regex = /[\\/]/;
    const parts = filePath.split(regex);

    return parts[parts.length - 1];
}
