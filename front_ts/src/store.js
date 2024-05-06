import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { buildFullName } from '#src/functions';
import { studentPath, teacherPath } from '#src/router';
export var Role;
(function (Role) {
    Role[Role["Student"] = 0] = "Student";
    Role[Role["Teacher"] = 1] = "Teacher";
})(Role || (Role = {}));
export const useUserStore = defineStore('user', () => {
    const id = ref(1);
    const role = ref(Role.Student);
    const surname = ref('');
    const name = ref('');
    const fatherName = ref('');
    const faculty = ref('');
    const group = ref('');
    const avatar = ref('');
    const courses = ref([]);
    const isStudent = computed(() => {
        return role.value === Role.Student;
    });
    const isTeacher = computed(() => {
        return role.value === Role.Teacher;
    });
    const hasAvatar = computed(() => {
        return avatar.value !== null;
    });
    const nameFirstLetter = computed(() => {
        return name.value.slice(0, 1);
    });
    const fullName = computed(() => {
        return buildFullName(surname.value, name.value, fatherName.value);
    });
    const profileLink = computed(() => {
        switch (role.value) {
            case Role.Student:
                return studentPath;
            case Role.Teacher:
                return teacherPath.replace(':id', id.value + '');
        }
    });
    return {
        id,
        role,
        surname,
        name,
        fatherName,
        faculty,
        group,
        avatar,
        courses,
        isStudent,
        isTeacher,
        hasAvatar,
        nameFirstLetter,
        fullName,
        profileLink
    };
});
