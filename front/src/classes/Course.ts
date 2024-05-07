import {
    Course as CourseModel,
    Module as ModuleModel
} from '#models';

import Model from '#classes/Model';
import Student from '#classes/Student';
import Teacher from '#classes/Teacher';
import Module from '#classes/Module';

import {
    getCourseModules,
    getCourseTeacher
} from '#requests';



export default class Course extends Model {
    name: string;
    description?: string;
    available: boolean;
    modules: Module[] = [];
    teacher?: Teacher;
    students?: Student[];

    constructor({ id, course_name, description, status }: CourseModel) {
        super(id);

        this.name = course_name;
        this.description = description ?? undefined;
        this.available = status;
    }

    async loadTeacher(): Promise<void> {
        this.teacher = new Teacher(await getCourseTeacher(this.id));
    }

    async loadModules(): Promise<void> {
        const rawModules: ModuleModel[] = await getCourseModules(this.id);

        for (const rawModule of rawModules) {
            this.modules.push(new Module(rawModule));
        }
    }
}