import { defineStore } from 'pinia';
import {
    ref,
    computed
} from 'vue';


const storeName = 'user';
const userRoles = {
    guest: 0,
    student: 1,
    teacher: 2
};


export default defineStore(storeName, () => {
    const id = ref(1);
    const role = ref(userRoles.student);

    const surname = ref('');
    const name = ref('');
    const father_name = ref('');

    const faculty = ref('');
    const group = ref('');

    const avatar = ref('');
    const courses = ref([]);

    const fullName = computed(() => {
        let storeFatherName = father_name.value;
        if (storeFatherName === null) {
            storeFatherName = '';
        }
        return `${surname.value} ${name.value} ${storeFatherName}`;
    });

    return {
        id,
        role,
        surname,
        name,
        father_name,
        faculty,
        group,
        avatar,
        courses,
        fullName
    };
});