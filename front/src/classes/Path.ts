export default class Path {
    static getLastElement(path: string): string {
        if (path.includes('/')) {
            path = path.slice(path.lastIndexOf('/') + 1);
        }
        if (path.length > 15) {
            path = `${path.slice(0, 15)}...`;
        }
        return path;
    }
}