type Model = {
    id: number
}

export type Student = Model & {
    surname: string,
    name: string,
    father_name: string | null,
    faculty: string,
    group: string,
    avatar: string | null
}

export type Checkpoint = {
    id: number,
    title: string,
    questions: Question[]
}

export type Question = {
    id: number,
    question_text: string,
    answers: Answer[]
}

export type Answer = {
    id: number,
    answer_text: string
}