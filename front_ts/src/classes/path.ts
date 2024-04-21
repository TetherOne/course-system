export default class Path {
    static getLastElement(path: string) {
        if (!path.includes('/')) {
            return path;
        }

        const begin = path.lastIndexOf('/') + 1;
        return path.slice(begin);
    }
}