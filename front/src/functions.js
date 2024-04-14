export function shortenName(surname, name, fatherName) {
    name = `${name.slice(0, 1)}.`;
    fatherName = fatherName === null ? '' : `${fatherName.slice(0, 1)}.`;

    return `${surname} ${name} ${fatherName}`;
}

export function showToast(useToastInstance, type, message, title = '') {
    useToastInstance.add({
        severity: type,
        summary: title,
        detail: message,
        life: 3000
    });
}