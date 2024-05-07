import { Answer as AnswerModel } from '#models';

import Model from '#classes/Model';



export default class Answer extends Model {
    text: string;

    constructor({ id, answer_text }: AnswerModel) {
        super(id);
        this.text = answer_text;
    }
}