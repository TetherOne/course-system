const djangoHost = '127.0.0.1';
const djangoPort = 8000;
export const djangoURL = `http://${djangoHost}:${djangoPort}`;

export const viteHost = 'localhost';
export const vitePort = 8001;
export const viteURL = `http://${viteHost}:${vitePort}`;

export const Toasts = {
    Info: 'info',
    Success: 'success',
    Warn: 'warn',
    Error: 'error'
};

export const Views = {
    StudentSelf: 0,
    TeacherSelf: 1,
    StudentAtTeacher: 2
};