import axios, { AxiosRequestConfig } from 'axios';

import {
    User,
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
    CurrentUser
} from '#types';



const API: string = '/api';

const userApp: string = `${API}/userapp`;
const courseApp: string = `${API}/courseapp`;
const checkpointApp: string = `${API}/checkpointapp`;
const questionApp: string = `${API}/questionapp`;
const historyApp: string = `${API}/history`;
const authApp: string = `${API}/authapp`;

const getURL = (URL: string, id?: number): string => {
    if (id)
        URL = `${URL}${id}/`;
    return URL;
}

const users = (id?: number) => getURL(`${userApp}/users/`, id);
const students = (id?: number) => getURL(`${userApp}/students/`, id);
const teachers = (id?: number) => getURL(`${userApp}/teachers/`, id);

const courses = (id?: number) => getURL(`${courseApp}/courses/`, id);
const modules = (id?: number) => getURL(`${courseApp}/modules/`, id);
const lessons = (id?: number) => getURL(`${courseApp}/lessons/`, id);
const lessonsFiles = (id?: number) => getURL(`${courseApp}/lesson-other-files/`, id);
const enrollments = (id?: number) => getURL(`${courseApp}/enrollments/`, id);

const checkpoints = (id?: number) => getURL(`${checkpointApp}/checkpoints/`, id);
const passedCheckpoints = (id?: number) => getURL(`${checkpointApp}/passed-checkpoints/`, id);
const summaries = (id?: number) => getURL(`${checkpointApp}/summaries/`, id);

const questions = (id?: number) => getURL(`${questionApp}/questions`, id);
const answers = (id?: number) => getURL(`${questionApp}/answers`, id);

const questionsChoices = (id?: number) => getURL(`${historyApp}/history-of-passed-answers/`, id);

const signInURL: string = `${authApp}/login/`;
const signUpURL: string = `${authApp}/register/`;
const signOutURL: string = `${authApp}/logout/`;
const currentUser: string = `${authApp}/current-user/`;

const standardConfig: AxiosRequestConfig = {
    params: {
        format: 'json'
    }
};



async function getEntity(URL: string): Promise<any> {
    return (await axios.get(URL, standardConfig)).data;
}

async function getEntitiesByForeignKeys(URL: string, key: string, value: number): Promise<any[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params[key] = value;
    return (await axios.get(URL, config));
}



export async function getUser(id: number): Promise<User> {
    return await getEntity(users(id));
}

export async function getStudent(id: number): Promise<Student> {
    return await getEntity(students(id));
}

export async function getStudentByUserId(id: number): Promise<Student> {
    return (await getEntitiesByForeignKeys(students(), 'user', id))[0];
}

export async function getStudentCourses(id: number): Promise<Course[]> {
    const enrollments: Enrollment[] = await getStudentEnrollments(id);
    const courses: Course[] = [];
    for (const enrollment of enrollments) {
        courses.push(await getCourse(enrollment.course));
    }
    return courses;
}

export async function getStudentEnrollments(id: number): Promise<Enrollment[]> {
    return await getEntitiesByForeignKeys(enrollments(), 'student', id);
}

export async function getStudentGradesInCourse(studentId: number, courseId: number) {
    const checkpoints: Checkpoint[] = await getCourseCheckpoints(courseId);
    const grades = [];
    for (const cp of checkpoints) {
        const grade = {
            number: cp.checkpoint_number,
            name: cp.name,
            grade: await getStudentGradeOnCheckpoint(studentId, cp.id)
        };
        grades.push(grade);
    }
    return grades;
}

export async function doesStudentHaveCourse(studentId: number, courseId: number): Promise<boolean> {
    const courses: Course[] = await getStudentCourses(studentId);
    return courses.some(course => course.id === courseId);
}

export async function getStudentPassedCheckpoints(id: number): Promise<PassedCheckpoint[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.student = id;
    return (await axios.get(passedCheckpoints(), config)).data;
}

export async function getStudentGradeOnCheckpoint(studentId: number, checkpointId: number): Promise<number | '-'> {
    let passedCheckpoints: PassedCheckpoint[] = await getStudentPassedCheckpoints(studentId);
    passedCheckpoints = passedCheckpoints.filter(cp => cp.checkpoint === checkpointId);

    if (!passedCheckpoints.length) {
        return '-';
    }

    const passedCheckpoint: PassedCheckpoint = passedCheckpoints[0];
    const checkpoint: Checkpoint = await getCheckpoint(checkpointId);
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
}

export async function updateStudent(id: number, updated: Student): Promise<Student> {
    const URL: string = students(id);
    const response = await axios.patchForm(URL, updated);
    const data = response.data;
    return data;
}



export async function getTeacher(id: number): Promise<Teacher> {
    return await getEntity(teachers(id));
}

export async function getTeacherByUserId(id: number): Promise<Teacher> {
    return (await getEntitiesByForeignKeys(teachers(), 'user', id))[0];
}

export async function getTeacherCourses(id: number): Promise<Course[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.teacher_profile = id;
    return (await axios.get(courses(), config)).data;
}

export async function updateTeacher(id: number, updated: Teacher): Promise<Teacher> {
    const URL: string = teachers(id);
    const response = await axios.patchForm(URL, updated);
    const data = response.data;
    return data;
}



export async function getCourse(id: number): Promise<Course> {
    return await getEntity(courses(id));
}

export async function getCourseStudents(id: number): Promise<Student[]> {
    const enrollments: Enrollment[] = await getCourseEnrollments(id);
    const students: Student[] = [];
    for (const enrollment of enrollments) {
        students.push(await getStudent(enrollment.student));
    }
    return students;
}
export async function getCourseModules(id: number): Promise<Module[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.course = id;
    return (await axios.get(modules(), config)).data;
}
export async function getCourseEnrollments(id: number): Promise<Enrollment[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.course = id;
    return (await axios.get(enrollments(), config)).data;
}

export async function getCourseCheckpoints(id: number): Promise<Checkpoint[]> {
    const modules: Module[] = await getCourseModules(id);
    const checkpoints: Checkpoint[] = [];
    for (const module of modules) {
        const moduleCheckpoints: Checkpoint[] = await getModuleCheckpoints(module.id);
        for (const cp of moduleCheckpoints) {
            checkpoints.push(cp);
        }
    }
    return checkpoints;
}

export async function getNumberOfLastCheckpointInCourse(id: number): Promise<number> {
    const checkpoints: Checkpoint[] = await getCourseCheckpoints(id);
    return checkpoints.length;
}

export async function addCourse(course_name: string, description: string, teacher_profile: number, password: string): Promise<Course> {
    return (await axios.postForm(courses(), {
        course_name,
        description,
        status: true,
        teacher_profile,
        image: '',
        password
    })).data;
}

export async function deleteCourse(id: number): Promise<void> {
    await axios.delete(courses(id));
}



export async function getModule(id: number): Promise<Module> {
    return await getEntity(modules(id));
}

export async function getModuleLessons(id: number): Promise<Lesson[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.module = id;
    return (await axios.get(lessons(), config)).data;
}

export async function getModuleCheckpoints(id: number): Promise<Checkpoint[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.module = id;
    return (await axios.get(checkpoints(), config)).data;
}

export async function addModule(name: string, course: number): Promise<Module> {
    return (await axios.postForm(modules(), {
        name,
        course,
        status: true
    })).data;
}



export async function getLesson(id: number): Promise<Lesson> {
    return await getEntity(lessons(id));
}

export async function getLessonFiles(id: number): Promise<LessonFile[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.lesson = id;
    return (await axios.get(lessonsFiles(), config)).data;
}

export async function addLesson(name: string, module: number): Promise<Lesson> {
    return (await axios.postForm(lessons(), {
        name,
        description: '',
        module,
        video: '',
        status: true
    })).data;
}

export async function updateLesson(id: number, updated: Partial<Lesson>): Promise<Lesson> {
    return (await axios.patchForm(lessons(id), updated)).data;
}



export async function addEnrollment(student: number, course: number, course_password: string): Promise<Enrollment> {
    return (await axios.postForm(enrollments(), {
        student,
        course,
        course_password
    })).data;
}



export async function getCheckpoint(id: number): Promise<Checkpoint> {
    return await getEntity(checkpoints(id));
}

export async function addCheckpoint(name: string, module: number): Promise<Checkpoint> {
    return (await axios.postForm(checkpoints(), {
        name,
        module,
        checkpoint_number: await getNumberOfLastCheckpointInCourse((await getModule(module)).course) + 1
    })).data;
}



export async function sendResultOnCheckpoint(student: number, checkpoint: number): Promise<PassedCheckpoint> {
    return (await axios.postForm(passedCheckpoints(), {
        student,
        checkpoint,
        points: 0
    })).data;
}



export async function addQuestion(question_text: string, max_points: number, checkpoint: number): Promise<Question> {
    return (await axios.postForm(questions(), {
        question_text,
        max_points,
        checkpoint
    })).data;
}

export async function addAnswer(answer_text: string, is_correct: boolean, question: number): Promise<Answer> {
    return (await axios.postForm(answers(), {
        answer_text,
        is_correct,
        question
    })).data;
}



export async function sendQuestionChoice(student: number, question: number, selected_answer: number, checkpoint: number): Promise<QuestionChoice> {
    return (await axios.postForm(questionsChoices(), {
        student,
        question,
        selected_answer,
        checkpoint
    })).data;
}



export async function isUserSignedIn(): Promise<boolean> {
    const currentUser: CurrentUser = await getCurrentUser();
    return !!currentUser.id;
}

export async function signIn(email: string, password: string): Promise<void> {
    const a = await axios.post(signInURL, {
        username: email,
        password
    });
    const r = a;
    console.log(r)
}

export async function signUp(username: string, email: string, password1: string, is_teacher: boolean): Promise<any> {
    return (await axios.postForm(signUpURL, {
        username,
        email,
        password1,
        is_teacher
    })).data;
}

export async function signOut(): Promise<void> {
    await axios.get(signOutURL);
}

export async function getCurrentUser(): Promise<CurrentUser> {
    return (await axios.get(currentUser)).data;
}

export async function setCSRF_token(): Promise<void> {
    await axios.get('/api/authapp/get_csrf_token');
    const token = document.cookie.split('=')[1];
    axios.defaults.headers.common['X-CSRFTOKEN'] = token;
    axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
}