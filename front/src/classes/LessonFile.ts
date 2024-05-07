import { LessonFile as LessonFileModel } from '#models';

import Model from '#classes/Model';
import Path from '#classes/Path';



export default class LessonFile extends Model {
    path: string;
    name: string;

    constructor({ id, other_file }: LessonFileModel) {
        super(id);
        this.path = other_file;
        this.name = Path.getLastElement(this.path);
    }
}