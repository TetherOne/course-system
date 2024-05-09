import {
    Module as ModuleModel,
    Lesson as LessonModel,
    Checkpoint as CheckpointModel
} from '#models';

import Model from '#classes/Model';
import Lesson from '#classes/Lesson';
import Checkpoint from '#classes/Checkpoint';

import {
    getModuleLessons,
    getModuleCheckpoints
} from '#requests';



export default class Module extends Model {
    name: string;
    available: boolean;
    lessons: Lesson[] = [];
    checkpoints: Checkpoint[] = [];

    constructor({ id, module_name, status }: ModuleModel) {
        super(id);

        this.name = module_name;
        this.available = status;
    }

    async loadLessons(): Promise<void> {
        const rawLessons: LessonModel[] = await getModuleLessons(this.id);

        for (const rawLesson of rawLessons) {
            this.lessons.push(new Lesson(rawLesson));
        }
    }

    async loadCheckpoints(): Promise<void> {
        const checkpointsModels: CheckpointModel[] = await getModuleCheckpoints(this.id);

        for (const checkpointModel of checkpointsModels) {
            this.checkpoints.push(new Checkpoint(checkpointModel));
        }
    }
}