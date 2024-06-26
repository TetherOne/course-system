import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

import {
    Student,
    Teacher,
    Course,
    Module,
    Lesson,
    LessonFile,
    Enrollment,
    Checkpoint,
    PassedCheckpoint,
    Question,
    Answer,
    QuestionChoice,
    CurrentUser, QuestionFile
} from '#types';



const API_URL: string = '/api';

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

const questionAppURL: string = `${API_URL}/questionapp`;

const questionsURL: string = `${questionAppURL}/questions/`;
const answersURL: string = `${questionAppURL}/answers/`;
const questionsFilesURL: string = `${questionAppURL}/question-files/`;

const historyURL: string = `${API_URL}/history`;
const questionsChoicesHistoryURL: string = `${historyURL}/history-of-passed-answers/`;

const authAppURL: string = `${API_URL}/authapp`;

const CSRF_URL: string = `${authAppURL}/csrf/`;
const signInURL: string = `${authAppURL}/login/`;
const signUpURL: string = `${authAppURL}/register/`;
const signOutURL: string = `${authAppURL}/logout/`;
const currentUserURL: string = `${authAppURL}/current-user/`;
const resetPasswordURL: string = `${authAppURL}/password-reset/`;

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
    async getStudentGradeOnCheckpoint(studentId: number, checkpointId: number, onlyScore?: boolean): Promise<number | '-'> {
        let passedCheckpoints: PassedCheckpoint[] = await this.studentPassedCheckpoints(studentId);
        passedCheckpoints = passedCheckpoints.filter(cp => cp.checkpoint === checkpointId);

        if (!passedCheckpoints.length) {
            return '-';
        }

        const passedCheckpoint: PassedCheckpoint = passedCheckpoints[0];

        if (onlyScore)
            return passedCheckpoint.points;

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
    async numberOfLastCheckpointInCourse(id: number): Promise<number> {
        const checkpoints: Checkpoint[] = await this.courseCheckpoints(id);
        return checkpoints.length;
    },
    async addCourse(course_name: string, description: string, teacher_profile: number): Promise<Course> {
        return (await axios.postForm(coursesURL, {
            course_name,
            description,
            status: true,
            teacher_profile,
            image: ''
        })).data;
    },
    async updateCourse(id: number, newFields: Partial<Course>): Promise<Course> {
        const URL: string = `${coursesURL}${id}/`;
        return (await axios.patchForm(URL, newFields)).data;
    },
    async deleteCourse(id: number): Promise<void> {
        await axios.delete(`${coursesURL}${id}/`);
    },
    async module(id: number): Promise<Module> {
        return await getEntity(modulesURL, id);
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
    async addModule(name: string, course: number): Promise<Module> {
        return (await axios.postForm(modulesURL, {
            name,
            course,
            status: true
        })).data;
    },
    async deleteModule(id: number): Promise<void> {
        await axios.delete(`${modulesURL}${id}/`);
    },
    async lesson(id: number): Promise<Lesson> {
        return await getEntity(lessonsURL, id);
    },
    async lessonFiles(id: number): Promise<LessonFile[]> {
        const config: AxiosRequestConfig = structuredClone(standardConfig);
        config.params.lesson = id;
        return (await axios.get(lessonsFilesURL, config)).data;
    },
    async addLesson(name: string, module: number): Promise<Lesson> {
        return (await axios.postForm(lessonsURL, {
            name,
            description: '',
            module,
            video: '',
            status: true
        })).data;
    },
    async updateLesson(id: number, updated: Partial<Lesson>): Promise<Lesson> {
        return (await axios.patchForm(`${lessonsURL}${id}/`, updated)).data;
    },
    async enroll(student: number, course: number, course_password: string): Promise<Enrollment> {
        return (await axios.postForm(enrollmentsURL, {
            student,
            course,
            course_password
        })).data;
    }
};

export const checkpointApp = {
    async checkpoint(id: number): Promise<Checkpoint> {
        return await getEntity(checkpointsURL, id);
    },
    async addCheckpoint(name: string, module: number): Promise<Checkpoint> {
        return (await axios.postForm(checkpointsURL, {
            name,
            module,
            checkpoint_number: await courseApp.numberOfLastCheckpointInCourse((await courseApp.module(module)).course) + 1
        })).data;
    },
    async sendResult(student: number, checkpoint: number): Promise<PassedCheckpoint> {
        return (await axios.postForm(passedCheckpointsURL, {
            student,
            checkpoint,
            points: 0
        })).data;
    }
};

export const questionApp = {
    async addQuestion(question_text: string, max_points: number, checkpoint: number): Promise<Question> {
        return (await axios.postForm(questionsURL, {
            question_text,
            max_points,
            checkpoint
        })).data;
    },
    async addAnswer(answer_text: string, is_correct: boolean, question: number): Promise<Answer> {
        const createdAnswer: Answer = (await axios.post(answersURL, {
            answer_text,
            is_correct,
            question
        })).data;
        //return await this.changeAnswer(createdAnswer.id, { is_correct });
        return createdAnswer;
    },
    async changeAnswer(id: number, newProperties: Partial<Answer> & { is_correct: boolean }): Promise<Answer> {
        return (await axios.patch(`${answersURL}${id}/`, newProperties, standardConfig)).data;
    },
    async getQuestionFiles(id: number): Promise<QuestionFile[]> {
        const config: AxiosRequestConfig = structuredClone(standardConfig);
        config.params.question = id;
        return (await axios.get(questionsFilesURL, config)).data;
    },
    async addQuestionFile(file: File, question: number): Promise<QuestionFile> {
        return (await axios.postForm(questionsFilesURL, {
            question,
            file
        })).data;
    }
};

export const history = {
    async sendQuestionChoice(student: number, question: number, selected_answer: number, checkpoint: number): Promise<QuestionChoice> {
        return (await axios.postForm(questionsChoicesHistoryURL, {
            student,
            question,
            selected_answer,
            checkpoint
        })).data;
    }
};

export const authApp = {
    async setCSRF_token(): Promise<void> {
        await axios.get(CSRF_URL);
        const token: string = Cookies.get('csrftoken') as string;
        console.log(`CSRF token changed: ${token}`);
        axios.defaults.headers.common['X-CSRFTOKEN'] = token;
        axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    },
    async isUserSignedIn(): Promise<boolean> {
        const currentUser: CurrentUser = await this.currentUser();
        return currentUser.id !== null;
    },
    async signIn(email: string, password: string): Promise<void> {
        await axios.postForm(signInURL, {
            username: email,
            password
        });
    },
    async signUp(username: string, email: string, password1: string, is_teacher: boolean): Promise<any> {
        return (await axios.postForm(signUpURL, {
            username,
            email,
            password1,
            is_teacher
        })).data;
    },
    async signOut(): Promise<void> {
        await axios.get(signOutURL);
    },
    async currentUser(): Promise<CurrentUser> {
        return (await axios.get(currentUserURL)).data;
    },
    async passwordReset(email: string): Promise<any> {
        return (await axios.postForm(resetPasswordURL, { email })).data;
    }
};

export async function updateStudent(id: number, updated: Student): Promise<Student> {
    const URL: string = studentsURL + id + '/';
    const response = await axios.patchForm(URL, updated);
    const data = response.data;
    return data;
}

export async function updateTeacher(id: number, updated: Teacher): Promise<Teacher> {
    const URL: string = teachersURL + id + '/';
    const response = await axios.patchForm(URL, updated);
    const data = response.data;
    return data;
}