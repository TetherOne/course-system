import { defineStore } from 'pinia';

import { computed, ComputedRef, ref, Ref } from 'vue';

import { Role } from '#enums';
import Course from '#classes/Course';



const storeName: string = 'user';

// DEV
const userId: number = 1;
const userRole: Role = Role.Student;
// DEV

const useUserStore = defineStore(storeName, () => {
    const id: Ref<number> = ref(userId);
    const role: Ref<Role> = ref(userRole);

    const surname: Ref<string> = ref('');
    const name: Ref<string> = ref('');
    const fatherName: Ref<string | undefined> = ref('');

    const university: Ref<string> = ref('');
    const faculty: Ref<string> = ref('');
    const group: Ref<string> = ref('');

    const avatar: Ref<string | undefined> = ref('');
    const courses: Ref<Course[]> = ref([]);

    const fullName: ComputedRef<string> = computed(() => {
        return `${surname.value} ${name.value} ${fatherName.value ?? ''}`;
    });

    const isStudent: ComputedRef<boolean> = computed(() => {
        return role.value === Role.Student;
    });

    const isTeacher: ComputedRef<boolean> = computed(() => {
        return role.value === Role.Teacher;
    });

    function hasCourse(id: number): boolean {
        return courses.value.some((course) => {
            return course.id === id;
        });
    }

    return {
        id,
        role,
        surname,
        name,
        fatherName,
        university,
        faculty,
        group,
        avatar,
        courses,
        fullName,
        isStudent,
        isTeacher,
        hasCourse
    };
});



export default useUserStore;