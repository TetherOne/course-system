import {
    ref,
    computed, Ref
} from 'vue';
import {defineStore} from 'pinia';
import {Student} from '#src/types.ts';
class Model {
    id: number
}
class Teacher extends Model {
    surname: string
}


export const useUserStore = defineStore('user', () => {
    enum Role {
        Guest,
        Student,
        Teacher
    }

    const id: Ref<number> = ref(1);
    const role: Ref<Role> = ref(Role.Student);

    const surname: Ref<string> = ref('');

    const courses: any[] = ref([]);

    return {
        id,
        role
    };
});