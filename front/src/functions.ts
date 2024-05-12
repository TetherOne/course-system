export function getCSRF_token(): string {
    const input: HTMLInputElement = <HTMLInputElement>document.querySelector('input');
    return input.value;
}

export function getShortName(surname: string, name: string, fatherName: string | null): string {
    name = `${name.slice(0, 1)}.`;
    fatherName = fatherName ? `${fatherName.slice(0, 1)}.` : '';

    return `${surname} ${name} ${fatherName}`;
}