export class Path {
    static getLastElement(path) {
        const begin = path.lastIndexOf('/') + 1;
        return path.slice(begin);
    }
}