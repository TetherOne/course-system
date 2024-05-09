export default class Path {
    static getLastElement(path: string): string {
        const lastSlashIndex: number = path.lastIndexOf('/');

        if (lastSlashIndex === -1) {
            return path;
        }

        return path.slice(lastSlashIndex + 1);
    }
}