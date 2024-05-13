export type FunctionNoParamsNoReturn = () => void

export type PopUp = (title: string, detail: string) => void

export type AvatarSize = 'normal' | 'large' | 'xlarge'

type Model = {
    id: number,
    created_at: string
}

type User = Omit<Model, 'created_at'> & {
    email: string,
    username: string,
    is_teacher: boolean
}

export type Teacher = Model & {
    name: string,
    surname: string,
    father_name: string | null,
    faculty: string,
    avatar: string | null,
    is_teacher: boolean,
    user: number
}

export type Student = Teacher & {
    group: string
}

export type Course = Model & {
    course_name: string,
    description: string | null,
    status: boolean,
    image: string | null,
    teacher_profile: number
}

export type Module = Model & {
    name: string,
    course: number,
    status: true
}

export type Lesson = Model & {
    name: string,
    description: string | null,
    module: number,
    video: string | null,
    status: boolean
}

export type LessonFile = Model & {
    lesson: number,
    other_file: string
}

export type Enrollment = Omit<Model, 'created_at'> & {
    enrollment_date: string,
    student: number,
    course: number
}

export type Checkpoint = Model & {
    questions: Question[],
    checkpoint_number: number,
    name: string,
    module: number
}

export type PassedCheckpoint = Model & {
    student: number,
    checkpoint: number,
    points: number,
    percent: number,
    status: string,
    grade: string
}

export type Question = Model & {
    answers: Answer[],
    question_text: string,
    max_points: number,
    checkpoint: number,
    chosenAnswer: number | null
}

export type Answer = Model & {
    answer_text: string,
    question: number
}

export type CurrentUser = User & {
    date_joined: string,
    user_profile: Student | Teacher
}

export type StudentCourse = Course & {
    teacherShortName: string
}