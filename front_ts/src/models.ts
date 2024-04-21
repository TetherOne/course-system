type Model = {
    id: number,
    created_at?: string
}


export type Teacher = Model & {
    surname: string,
    name: string,
    father_name: string | null,
    avatar: string | null,
    faculty: string,
    user: number
}

export type Student = Teacher & {
    group: string
}


export type Enrollment = Model & {
    student: number,
    course: number,
    enrollment_date: string
}

export type Course = Model & {
    course_name: string,
    description: string | null,
    image: string | null,
    status: boolean,
    link: string | undefined,
    teacher_profile: number,
    teacher: Teacher | undefined,
    teacherShortName: string | undefined,
    teacherLink: string | undefined
}

export type Module = Model & {
    module_name: string,
    status: boolean,
    course: number
}

export type Lesson = Model & {
    lesson_name: string,
    description: string | null,
    video: string | null,
    status: boolean,
    module: number,
    files: LessonFile[],
    link: string
}

export type LessonFile = Model & {
    other_file: string,
    name: string,
    lesson: number
}


export type Checkpoint = Model & {
    title: string,
    questions: Question[],
    status: boolean,
    checkpoint_number: number, // Чё это вообще
    module: number,
    link: string
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
    percent: number,
    grade: string,
    status: string | null
}


export type Question = Model & {
    question_text: string,
    max_points: number,
    answers: Answer[],
    checkpoint: number,
    chosenAnswer: number | null
}

export type Answer = Model & {
    answer_text: string,
    is_correct: boolean,
    question: number
}


export type QuestionChoice = Model & {
    student: number,
    question: number,
    selected_answer: number,
    checkpoint: number
}