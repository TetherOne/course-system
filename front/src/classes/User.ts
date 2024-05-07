import Model from '#classes/Model';
import Course from '#classes/Course';



export default class User extends Model {
    surname: string;
    name: string;
    fatherName?: string;
    faculty: string;
    avatar?: string;
    courses: Course[] = [];

    constructor(
        id: number,
        surname: string,
        name: string,
        fatherName: string | null,
        faculty: string,
        avatar: string | null
    ) {
        super(id);

        this.surname = surname;
        this.name = name;
        this.fatherName = fatherName ?? undefined;
        this.faculty = faculty;
        this.avatar = avatar ?? undefined;
    }

    getFullName(): string {
        const fatherName: string = this.fatherName ?? '';
        return `${this.surname} ${this.name} ${fatherName}`;
    }

    getShortName(): string {
        const fatherNameLetter: string = this.fatherName ? `${this.fatherName[0]}.` : '';
        return `${this.surname} ${this.name[0]}. ${fatherNameLetter}`;
    }

    async loadCourses(): Promise<void> {}
}