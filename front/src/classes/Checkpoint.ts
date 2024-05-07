import {
    Checkpoint as CheckpointModel,
    Question as QuestionModel
} from '#models';

import Model from '#classes/Model';
import Question from '#classes/Question';

import { getCheckpointQuestions } from '#requests';



export default class Checkpoint extends Model {
    name: string;
    questions: Question[] = [];

    constructor({ id, title }: CheckpointModel) {
        super(id);

        this.name = title;
    }

    async loadQuestions() {
        const rawQuestions: QuestionModel[] = await getCheckpointQuestions(this.id);

        for (const rawQuestion of rawQuestions) {
            this.questions.push(new Question(rawQuestion));
        }
    }
}