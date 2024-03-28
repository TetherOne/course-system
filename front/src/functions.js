export function shortenName(surname, name, fatherName) {
    name = `${name.slice(0, 1)}.`;
    fatherName = fatherName ? `${fatherName.slice(0, 1)}.` : '';
    return `${surname} ${name} ${fatherName}`;
}

export function getPathLastElement(path) {
    return path.slice(path.lastIndexOf('/') + 1);
}