type Model = {
    id: number,
    created_at?: string
}

export type Teacher = Model & {
    surname: string,
    name: string,
    father_name: string | null,
    faculty: string,
    avatar: string | null,
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
    module_name: string,
    course: number,
    status: boolean
}

export type Lesson = Model & {
    lesson_name: string,
    description: string | null,
    module: number,
    video: string | null,
    status: boolean
}

export type LessonFile = Model & {
    lesson: number,
    other_file: string
}

export type Enrollment = Model & {
    enrollment_date: string,
    student: number,
    course: number
}

export type Checkpoint = Model & {
    questions: Question[],
    checkpoint_number: number,
    title: string,
    module: number
}

export type Question = Model & {
    answers: Answer[],
    question_text: string,
    max_points: number,
    checkpoint: number
}

export type Answer = Model & {
    answer_text: string,
    question: number
}

export type Summary = Model & {
    student: number,
    course: number,
    current_points: number,
    total: number,
    grade: string | null
}

export type PassedCheckpoint = Model & {
    student: number,
    checkpoint: number,
    points: number,
    percent: number | null,
    status: string | null,
    grade: string | null
}

export type AnyModel =
    Student |
    Teacher |
    Course |
    Module |
    Lesson |
    LessonFile |
    Enrollment |
    Checkpoint |
    Question |
    Answer |
    Summary |
    PassedCheckpoint