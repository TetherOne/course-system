import { AxiosError } from 'axios';

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

export function handleRequestError(error: AxiosError): void {
    console.log(error);
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