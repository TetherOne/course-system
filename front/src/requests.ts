import axios from 'axios';
import { AxiosRequestConfig } from 'axios';

import {
    Student,
    Teacher,
    Course,
    Module,
    Lesson,
    LessonFile,
    Checkpoint,
    PassedCheckpoint,
    Enrollment,
    QuestionChoice,
    CurrentUser
} from '#types';

import { getCSRF_token } from '#functions';



const API_URL: string = 'http://127.0.0.1:8000/api';

const userAppURL: string = `${API_URL}/userapp`;

const studentsURL: string = `${userAppURL}/students/`;
const teachersURL: string = `${userAppURL}/teachers/`;

const courseAppURL: string = `${API_URL}/courseapp`;

const coursesURL: string = `${courseAppURL}/courses/`;
const modulesURL: string = `${courseAppURL}/modules/`;
const lessonsURL: string = `${courseAppURL}/lessons/`;
const lessonsFilesURL: string = `${courseAppURL}/lesson-other-files/`;
const enrollmentsURL: string = `${courseAppURL}/enrollments/`;

const checkpointAppURL: string = `${API_URL}/checkpointapp`;

const checkpointsURL: string = `${checkpointAppURL}/checkpoints/`;
const passedCheckpointsURL: string = `${checkpointAppURL}/passed-checkpoints/`;

const historyURL: string = `${API_URL}/history`;
const questionsChoicesHistoryURL: string = `${historyURL}/history-of-passed-answers/`;

const authAppURL: string = `${API_URL}/authapp`;

const signInURL: string = `${authAppURL}/login/`;
const signOutURL: string = `${authAppURL}/logout/`;
const currentUserURL: string = `${authAppURL}/current-user/`;

const standardConfig: AxiosRequestConfig = {
    params: {
        format: 'json'
    }
};



async function getEntity(URL: string, id: number): Promise<any> {
    return (await axios.get(`${URL}${id}/`, standardConfig)).data;
}

export const userApp = {
    async student(id: number): Promise<Student> {
        return await getEntity(studentsURL, id);
    },
    async studentCourses(id: number): Promise<Course[]> {
        const enrollments: Enrollment[] = await this.studentEnrollments(id);
        const courses: Course[] = [];
        for (const enrollment of enrollments) {
            courses.push(await courseApp.course(enrollment.course));
        }
        return courses;
    },
    async studentHasCourse(studentId: number, courseId: number): Promise<boolean> {
        const courses: Course[] = await this.studentCourses(studentId);
        return courses.some(course => course.id === courseId);
    },
    async studentEnrollments(id: number): Promise<Enrollment[]> {
        const config: AxiosRequestConfig = structuredClone(standardConfig);
        config.params.student = id;
        return (await axios.get(enrollmentsURL, config)).data;
    },
    async studentGradesInCourse(studentId: number, courseId: number) {
        const checkpoints: Checkpoint[] = await courseApp.courseCheckpoints(courseId);
        const grades = [];
        for (const cp of checkpoints) {
            const grade = {
                number: cp.checkpoint_number,
                name: cp.name,
                grade: await this.getStudentGradeOnCheckpoint(studentId, cp.id)
            };
            grades.push(grade);
        }
        return grades;
    },
    async studentPassedCheckpoints(id: number): Promise<PassedCheckpoint[]> {
        const config: AxiosRequestConfig = structuredClone(standardConfig);
        config.params.student = id;
        return (await axios.get(passedCheckpointsURL, config)).data;
    },
    async getStudentGradeOnCheckpoint(studentId: number, checkpointId: number): Promise<number | '-'> {
        let passedCheckpoints: PassedCheckpoint[] = await this.studentPassedCheckpoints(studentId);
        passedCheckpoints = passedCheckpoints.filter(cp => cp.checkpoint === checkpointId);

        if (!passedCheckpoints.length) {
            return '-';
        }

        const passedCheckpoint: PassedCheckpoint = passedCheckpoints[0];
        const checkpoint: Checkpoint = await checkpointApp.checkpoint(checkpointId);
        let maxPoints: number = 0;
        for (const question of checkpoint.questions) {
            maxPoints += question.max_points;
        }
        let grade: number = passedCheckpoint.points / maxPoints;

        if (grade > .8) {
            return 5;
        } else if (grade > .6) {
            return 4;
        } else if (grade > .4) {
            return 3;
        } else {
            return 2;
        }
    },
    async teacher(id: number): Promise<Teacher> {
        return await getEntity(teachersURL, id);
    },
    async teacherCourses(id: number): Promise<Course[]> {
        const config: AxiosRequestConfig = structuredClone(standardConfig);
        config.params.teacher_profile = id;
        return (await axios.get(coursesURL, config)).data;
    }
};

export const courseApp = {
    async course(id: number): Promise<Course> {
        return await getEntity(coursesURL, id);
    },
    async courseStudents(id: number): Promise<Student[]> {
        const enrollments: Enrollment[] = await this.courseEnrollments(id);
        const students: Student[] = [];
        for (const enrollment of enrollments) {
            students.push(await userApp.student(enrollment.student));
        }
        return students;
    },
    async courseModules(id: number): Promise<Module[]> {
        const config: AxiosRequestConfig = structuredClone(standardConfig);
        config.params.course = id;
        return (await axios.get(modulesURL, config)).data;
    },
    async courseEnrollments(id: number): Promise<Enrollment[]> {
        const config: AxiosRequestConfig = structuredClone(standardConfig);
        config.params.course = id;
        return (await axios.get(enrollmentsURL, config)).data;
    },
    async courseCheckpoints(id: number): Promise<Checkpoint[]> {
        const modules: Module[] = await this.courseModules(id);
        const checkpoints: Checkpoint[] = [];
        for (const module of modules) {
            const moduleCheckpoints: Checkpoint[] = await this.moduleCheckpoints(module.id);
            for (const cp of moduleCheckpoints) {
                checkpoints.push(cp);
            }
        }
        return checkpoints;
    },
    async addCourse(course_name: string, description: string, teacher_profile: number, password: string): Promise<Course> {
        return (await axios.postForm(coursesURL, {
            course_name,
            description,
            status: true,
            teacher_profile,
            image: '',
            password,
            csrfmiddlewaretoken: getCSRF_token()
        })).data;
    },
    async moduleLessons(id: number): Promise<Lesson[]> {
        const config: AxiosRequestConfig = structuredClone(standardConfig);
        config.params.module = id;
        return (await axios.get(lessonsURL, config)).data;
    },
    async moduleCheckpoints(id: number): Promise<Checkpoint[]> {
        const config: AxiosRequestConfig = structuredClone(standardConfig);
        config.params.module = id;
        return (await axios.get(checkpointsURL, config)).data;
    },
    async lesson(id: number): Promise<Lesson> {
        return await getEntity(lessonsURL, id);
    },
    async lessonFiles(id: number): Promise<LessonFile[]> {
        const config: AxiosRequestConfig = structuredClone(standardConfig);
        config.params.lesson = id;
        return (await axios.get(lessonsFilesURL, config)).data;
    }
};

export const checkpointApp = {
    async checkpoint(id: number): Promise<Checkpoint> {
        return await getEntity(checkpointsURL, id);
    },
    async sendResult(student: number, checkpoint: number): Promise<PassedCheckpoint> {
        return (await axios.postForm(passedCheckpointsURL, {
            student,
            checkpoint,
            points: 0,
            csrfmiddlewaretoken: getCSRF_token()
        })).data;
    }
};

export const history = {
    async sendQuestionChoice(student: number, question: number, selected_answer: number, checkpoint: number): Promise<QuestionChoice> {
        return (await axios.postForm(questionsChoicesHistoryURL, {
            student,
            question,
            selected_answer,
            checkpoint,
            csrfmiddlewaretoken: getCSRF_token()
        })).data;
    }
};

export const authApp = {
    async userSignedIn(): Promise<boolean> {
        const currentUser: CurrentUser = await this.currentUser();
        return !!currentUser.id;
    },
    async signIn(email: string, password: string): Promise<void> {
        await axios.postForm(signInURL, {
            username: email,
            password,
            csrfmiddlewaretoken: getCSRF_token()
        });
    },
    async signOut(): Promise<void> {
        await axios.get(signOutURL);
    },
    async currentUser(): Promise<CurrentUser> {
        return (await axios.get(currentUserURL)).data;
    }
};