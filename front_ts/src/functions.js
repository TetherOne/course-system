export function shortenName(surname, name, fatherName) {
    name = name.slice(0, 1) + '.';
    if (fatherName === null) {
        fatherName = '';
    }
    else {
        fatherName = fatherName.slice(0, 1) + '';
    }
    return `${surname} ${name} ${fatherName}`;
}
export function buildFullName(surname, name, fatherName) {
    if (fatherName === null) {
        fatherName = '';
    }
    return `${surname} ${name} ${fatherName}`;
}
