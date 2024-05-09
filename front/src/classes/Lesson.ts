import {
    Lesson as LessonModel,
    LessonFile as LessonFileModel
} from '#models';

import Model from '#classes/Model';
import LessonFile from '#classes/LessonFile';

import { getLessonFiles } from '#requests';



export default class Lesson extends Model {
    name: string;
    description?: string;
    video?: string;
    files: LessonFile[] = [];

    constructor({ id, lesson_name, description, video }: LessonModel) {
        super(id);

        this.name = lesson_name;
        this.description = description ?? undefined;
        this.video = video ?? undefined;
    }

    async loadFiles(): Promise<void> {
        const rawFiles: LessonFileModel[] = await getLessonFiles(this.id);

        for (const rawFile of rawFiles) {
            this.files.push(new LessonFile(rawFile));
        }
    }
}