import axios from 'axios';
import { viteURL } from '#config';
class API {
    static async student(id) {
        return (await axios.get(`${API.students}${id}`, API.standardConfig)).data;
    }
    static async studentEnrollments(id) {
        const config = structuredClone(API.standardConfig);
        config.params.student = id;
        return (await axios.get(API.enrollments, config)).data;
    }
    static async studentCourses(id) {
        const enrollments = await API.studentEnrollments(id);
        const courses = [];
        for (const enrollment of enrollments) {
            courses.push(await API.course(enrollment.course));
        }
        return courses;
    }
    static async teacher(id) {
        return (await axios.get(`${API.teachers}${id}`, API.standardConfig)).data;
    }
    static async teacherCourses(id) {
        const config = structuredClone(API.standardConfig);
        config.params.teacher_profile = id;
        return (await axios.get(API.courses, config)).data;
    }
    static async course(id) {
        return (await axios.get(`${API.courses}${id}`, API.standardConfig)).data;
    }
    static async courseStudents(id) {
        const config = structuredClone(API.standardConfig);
        config.params.course = id;
        const enrollments = (await axios.get(API.enrollments, config)).data;
        const students = [];
        for (const enrollment of enrollments) {
            students.push(await API.student(enrollment.student));
        }
        return students;
    }
    static async courseModules(id) {
        const config = structuredClone(API.standardConfig);
        config.params.course = id;
        return (await axios.get(API.modules, config)).data;
    }
    static async addCourse(name, description, password, teacher) {
        if (description === '') {
            description = null;
        }
        await axios.post(API.courses, {
            course_name: name,
            description: description,
            course_password: password,
            teacher_profile: teacher,
            status: true
        });
    }
    static async module(id) {
        return (await axios.get(`${API.modules}${id}`, API.standardConfig)).data;
    }
    static async moduleLessons(id) {
        const config = structuredClone(API.standardConfig);
        config.params.module = id;
        return (await axios.get(API.lessons, config)).data;
    }
    static async moduleCheckpoints(id) {
        const config = structuredClone(API.standardConfig);
        config.params.module = id;
        return (await axios.get(API.checkpoints, config)).data;
    }
    static async addModule(name, courseId) {
        await axios.post(API.modules, {
            module_name: name,
            course: courseId,
            status: true
        });
    }
    static async lesson(id) {
        return (await axios.get(`${API.lessons}${id}`, API.standardConfig)).data;
    }
    static async addLesson(name, description, moduleId) {
        if (description === '') {
            description = null;
        }
        await axios.post(API.lessons, {
            lesson_name: name,
            description: description,
            module: moduleId
        });
    }
    static async getLessonFiles(id) {
        const config = structuredClone(API.standardConfig);
        config.params.lesson = id;
        return (await axios.get(API.lessonFiles, config)).data;
    }
    static async checkpoint(id) {
        return (await axios.get(`${API.checkpoints}${id}`, API.standardConfig)).data;
    }
    static async studentPassedCheckpoints(id) {
        const config = structuredClone(API.standardConfig);
        config.params.student = id;
        return (await axios.get(API.passedCheckpoints, config)).data;
    }
    static async studentScore(studentId, checkpointId) {
        const config = structuredClone(API.standardConfig);
        config.params.student = studentId;
        config.params.checkpoint = checkpointId;
        const checkpoints = (await axios.get(API.passedCheckpoints, config)).data;
        if (checkpoints.length > 0) {
            if (checkpoints[0].grade === null) {
                return '-';
            }
            return checkpoints[0].grade;
        }
        else {
            return '-';
        }
    }
    static async sendQuestionChoice(studentId, questionId, chosenAnswerId, checkpointId) {
        await axios.post(API.historyOfPassedAnswers, {
            student: studentId,
            question: questionId,
            selected_answer: chosenAnswerId,
            checkpoint: checkpointId
        });
    }
}
Object.defineProperty(API, "API_URL", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: `${viteURL}/api`
});
Object.defineProperty(API, "userApp", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: `${API.API_URL}/userapp`
});
Object.defineProperty(API, "students", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: `${API.userApp}/students/`
});
Object.defineProperty(API, "teachers", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: `${API.userApp}/teachers/`
});
Object.defineProperty(API, "courseApp", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: `${API.API_URL}/courseapp`
});
Object.defineProperty(API, "enrollments", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: `${API.courseApp}/enrollments/`
});
Object.defineProperty(API, "courses", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: `${API.courseApp}/courses/`
});
Object.defineProperty(API, "modules", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: `${API.courseApp}/modules/`
});
Object.defineProperty(API, "lessons", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: `${API.courseApp}/lessons/`
});
Object.defineProperty(API, "lessonFiles", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: `${API.courseApp}/lesson-other-files/`
});
Object.defineProperty(API, "checkpointApp", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: `${API.API_URL}/checkpointapp`
});
Object.defineProperty(API, "checkpoints", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: `${API.checkpointApp}/checkpoints/`
});
Object.defineProperty(API, "passedCheckpoints", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: `${API.checkpointApp}/passed-checkpoints/`
});
Object.defineProperty(API, "summaries", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: `${API.checkpointApp}/summaries/`
});
Object.defineProperty(API, "history", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: `${API.API_URL}/history`
});
Object.defineProperty(API, "historyOfPassedAnswers", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: `${API.history}/history-of-passed-answers/`
});
Object.defineProperty(API, "standardConfig", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {
        params: {
            format: 'json'
        }
    }
});
export default API;
