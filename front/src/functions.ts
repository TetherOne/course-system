import {
    Student,
    Teacher
} from '#types';



export function getCSRF_token(): string {
    const input: HTMLInputElement = <HTMLInputElement>document.querySelector('input');
    return input.value;
}

export function shortenName(user: Student | Teacher): string {
    const name: string = `${user.name.slice(0, 1)}.`;
    const fatherName: string = user.father_name ? `${user.father_name.slice(0, 1)}.` : '';

    return `${user.surname} ${name} ${fatherName}`;
}

export function buildFullName(user: Student | Teacher): string {
    const fatherName: string = user.father_name ?? '';
    return `${user.surname} ${user.name} ${fatherName}`;
}