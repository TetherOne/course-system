export default class Path {
    static getLastElement(path: string): string {
        if (!path.includes('/')) {
            return path;
        }
        return path.slice(path.lastIndexOf('/') + 1);
    }
}