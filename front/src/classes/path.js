export default class {
    static getFirstElement(path) {
        if (!path.includes('/')) {
            return path;
        }

        const end = path.indexOf('/');
        return path.slice(0, end);
    }
}