export function shortenName(surname: string, name: string, fatherName: string | null) {
    name = name.slice(0, 1) + '.';

    if (fatherName === null) {
        fatherName = '';
    } else {
        fatherName = fatherName.slice(0, 1) + '';
    }

    return `${surname} ${name} ${fatherName}`;
}

export function buildFullName(surname: string, name: string, fatherName: string | null) {
    if (fatherName === null) {
        fatherName = '';
    }

    return `${surname} ${name} ${fatherName}`;
}