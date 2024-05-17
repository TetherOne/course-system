import { AxiosError } from 'axios';



type Model = {
    id: number
    created_at: string
}

type User = Omit<Model, 'created_at'> & {
    email: string
    username: string
    is_teacher: boolean
}

export type Teacher = Model & {
    name: string
    surname: string
    father_name: string | null
    faculty: string
    avatar: string | null
    is_teacher: boolean
    user: number
}

export type Student = Teacher & {
    group: string
}

export type Course = Model & {
    course_name: string
    description: string
    status: boolean
    image: string | null
    teacher_profile: number
    teacherShortName?: string
    studentHasIt?: boolean
}

export type Module = Model & {
    name: string
    course: number
    status: boolean
}

export type Lesson = Model & {
    name: string
    description: string
    module: number
    video: string | null
    status: true
}

export type LessonFile = Model & {
    lesson: number
    other_file: string
    name?: string
}

export type Enrollment = Omit<Model, 'created_at'> & {
    enrollment_date: string
    student: number
    course: number
}

export type Checkpoint = Model & {
    questions: Question[]
    checkpoint_number: number
    name: string
    module: number
}

export type PassedCheckpoint = Model & {
    student: number
    checkpoint: number
    points: number
    percent: number
    status: 'Зачёт' | 'Незачёт'
    grade: string
}

export type Summary = Model & {
    student: number
    course: number
    current_points: number
    total: number
    grade: string
}

export type Question = Model & {
    answers: Answer[]
    question_text: string
    max_points: number
    checkpoint: number
    chosenAnswer?: number
}

export type Answer = Model & {
    answer_text: string
    question: number
}

export type QuestionChoice = Model & {
    student: number
    checkpoint: number
    question: number
    selected_answer: number
    is_correct: boolean
    points: number
}

export type CurrentUser = Omit<User, 'is_teacher'> & {
    data_joined: string
    user_profile: Student | Teacher
}

export type Notice = (message: string, title?: string) => void

export type ErrorHandler = (error: AxiosError) => Promise<void>