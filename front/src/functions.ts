import {
    Student,
    Teacher
} from '#types';



export function getCSRF_token(): string {
    const input: HTMLInputElement = document.querySelector('input') as HTMLInputElement;
    return input.value;
}

export function getCaptcha(): string {
    const input: HTMLTextAreaElement = document.querySelector('textarea') as HTMLTextAreaElement;
    return input.value;
}

export function shortenName(user: Student | Teacher): string {
    if (!user.name) {
        return '';
    }
    const name: string = `${user.name.slice(0, 1)}.`;
    const fatherName: string = user.father_name ? `${user.father_name.slice(0, 1)}.` : '';

    return `${user.surname} ${name} ${fatherName}`;
}

export function buildFullName(user: Student | Teacher): string {
    if (!user.name) {
        return '';
    }
    const fatherName: string = user.father_name ?? '';
    return `${user.surname} ${user.name} ${fatherName}`;
}