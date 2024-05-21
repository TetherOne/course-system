import { NameVariant } from '#enums';

import {
    User,
    Student,
    Teacher
} from '#types';

import {
    getUser,
    getStudentByUserId,
    getTeacherByUserId
} from '#requests';



export function getCSRF_token(): string {
    const input: HTMLInputElement = document.querySelector('input') as HTMLInputElement;
    return input.value;
}

export async function getUserName(id: number, variant: NameVariant): Promise<string> {
    const user: User = await getUser(id);
    let userPersonalInfo: Student | Teacher;

    if (user.is_teacher)
        userPersonalInfo = await getTeacherByUserId(id);
    else
        userPersonalInfo = await getStudentByUserId(id);

    if (!userPersonalInfo.surname || !userPersonalInfo.name)
        return user.username;

    let name: string = userPersonalInfo.surname;

    if (variant === NameVariant.Short) {
        name = `${name} ${userPersonalInfo.name[0]}.`;

        if (userPersonalInfo.father_name)
            name = `${name} ${userPersonalInfo.father_name[0]}.`;

        return name;
    } else {
        name = `${name} ${userPersonalInfo.name}`;

        if (userPersonalInfo.father_name)
            name = `${name} ${userPersonalInfo.father_name}`;

        return name;
    }
}