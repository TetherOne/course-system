import axios from 'axios';
import {viteURL} from '#config';

import {
    Student,
    Teacher,
    Enrollment,
    Course,
    Module,
    Lesson,
    LessonFile,
    Checkpoint,
    PassedCheckpoint,
    Summary,
    QuestionChoice
} from '#src/models';


export default class API {
    static API_URL = `${viteURL}/api`;

    static userApp = `${API.API_URL}/userapp`;

    static students = `${API.userApp}/students/`;
    static teachers = `${API.userApp}/teachers/`;

    static courseApp = `${API.API_URL}/courseapp`;

    static enrollments = `${API.courseApp}/enrollments/`;
    static courses = `${API.courseApp}/courses/`;
    static modules = `${API.courseApp}/modules/`;
    static lessons = `${API.courseApp}/lessons/`;
    static lessonFiles = `${API.courseApp}/lesson-other-files/`;

    static checkpointApp = `${API.API_URL}/checkpointapp`;

    static checkpoints = `${API.checkpointApp}/checkpoints/`;
    static passedCheckpoints = `${API.checkpointApp}/passed-checkpoints/`;
    static summaries = `${API.checkpointApp}/summaries/`;

    static history = `${API.API_URL}/history`;
    static historyOfPassedAnswers = `${API.history}/history-of-passed-answers/`;

    static standardConfig: any = {
        params: {
            format: 'json'
        }
    };


    static async student(id: number): Promise<Student> {
        return (await axios.get(`${API.students}${id}`, API.standardConfig)).data;
    }

    static async studentEnrollments(id: number): Promise<Enrollment[]> {
        const config = structuredClone(API.standardConfig);
        config.params.student = id;

        return (await axios.get(API.enrollments, config)).data;
    }

    static async studentCourses(id: number): Promise<Course[]> {
        const enrollments = await API.studentEnrollments(id);

        const courses: Course[] = [];
        for (const enrollment of enrollments) {
            courses.push(await API.course(enrollment.course));
        }

        return courses;
    }


    static async teacher(id: number): Promise<Teacher> {
        return (await axios.get(`${API.teachers}${id}`, API.standardConfig)).data;
    }

    static async teacherCourses(id: number): Promise<Course[]> {
        const config = structuredClone(API.standardConfig);
        config.params.teacher_profile = id;

        return (await axios.get(API.courses, config)).data;
    }


    static async course(id: number): Promise<Course> {
        return (await axios.get(`${API.courses}${id}`, API.standardConfig)).data;
    }

    static async courseModules(id: number): Promise<Module[]> {
        const config = structuredClone(API.standardConfig);
        config.params.course = id;

        return (await axios.get(API.modules, config)).data;
    }

    static async addCourse(name: string, description: string, password: string, teacher: number) {
        if (description === '') {
            description = null;
        }

        await axios.post(API.courses, {
            course_name: name,
            description: description,
            course_password: password,
            teacher_profile: teacher,
            status: true
        });
    }


    static async module(id: number): Promise<Module> {
        return (await axios.get(`${API.modules}${id}`, API.standardConfig)).data;
    }

    static async moduleLessons(id: number): Promise<Lesson[]> {
        const config = structuredClone(API.standardConfig);
        config.params.module = id;

        return (await axios.get(API.lessons, config)).data;
    }

    static async moduleCheckpoints(id: number): Promise<Checkpoint[]> {
        const config = structuredClone(API.standardConfig);
        config.params.module = id;

        return (await axios.get(API.checkpoints, config)).data;
    }

    static async addModule(name: string, courseId: number) {
        await axios.post(API.modules, {
            module_name: name,
            course: courseId,
            status: true
        });
    }


    static async lesson(id: number): Promise<Lesson> {
        return (await axios.get(`${API.lessons}${id}`, API.standardConfig)).data;
    }

    static async getLessonFiles(id: number): Promise<LessonFile[]> {
        const config = structuredClone(API.standardConfig);
        config.params.lesson = id;

        return (await axios.get(API.lessonFiles, config)).data;
    }

    static async checkpoint(id: number): Promise<Checkpoint> {
        return (await axios.get(`${API.checkpoints}${id}`, API.standardConfig)).data;
    }

    static async studentPassedCheckpoints(id: number): Promise<PassedCheckpoint[]> {
        const config = structuredClone(API.standardConfig);
        config.params.student = id;

        return (await axios.get(API.passedCheckpoints, config)).data;
    }


    static async sendQuestionChoice(studentId: number, questionId: number, chosenAnswerId: number, checkpointId: number) {
        await axios.post(API.historyOfPassedAnswers, {
            student: studentId,
            question: questionId,
            selected_answer: chosenAnswerId,
            checkpoint: checkpointId
        });
    }
}