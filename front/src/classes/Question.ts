import {
    Question as QuestionModel
} from '#models';

import Model from '#classes/Model';
import Answer from '#classes/Answer';



export default class Question extends Model {
    text: string;
    value: number;
    answers: Answer[];
    chosenAnswer?: number;

    constructor({ id, question_text, max_points, answers }: QuestionModel) {
        super(id);

        this.text = question_text;
        this.value = max_points;

        this.answers = [];
        for (const rawAnswer of answers) {
            this.answers.push(new Answer(rawAnswer));
        }
    }
}