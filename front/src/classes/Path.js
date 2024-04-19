export class Path {
    static getLastElement(path) {
        const begin = path.lastIndexOf('/') + 1;
        const lastElement = path.slice(begin);
        return lastElement;
    }
}