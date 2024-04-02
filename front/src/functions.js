export function shortenName(surname, name, fatherName) {
    name = name.slice(0, 1) + '.';
    fatherName = fatherName === null ? '' : fatherName.slice(0, 1) + '.';

    return `${surname} ${name} ${fatherName}`;
}