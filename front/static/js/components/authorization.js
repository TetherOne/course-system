import {djangoURL, frontPort, frontURL} from "../server.js";

export const authorization = {
    template: `
        <div id="sign-in-up-form">
            <div class="flex-row" id="sign-switch">
                <div @click="currentForm = 'signIn';">Вход</div>
                <div @click="currentForm = 'signUp';">Регистрация</div>
            </div>
            <div id="sign-in-form" class="flex-column" v-if="currentForm === 'signIn'">
                <input type="text" placeholder="Логин" v-model="login">            
                <input type="password" placeholder="Пароль" v-model="password">
                <button @click="signIn">Войти</button>            
            </div>
            <div id="sign-up-form" class="flex-column" v-if="currentForm === 'signUp'">
                <input type="text" placeholder="Логин" v-model="login">            
                <input type="email" placeholder="Почта" v-model="email">            
                <input type="password" placeholder="Пароль" v-model="password">
                <div class="flex-row">
                    <input type="checkbox" v-model="isTeacher">
                    <label>Я преподаватель</label>
                </div>
                <button @click="signUp">Зарегистрироваться</button>   
            </div>
        </div>
    `,
    data() {
        return {
            login: '',
            email: '',
            password: '',
            isTeacher: false,

            currentForm: 'signIn'
        }
    },

    methods: {
        signIn() {
            const userInfo = this.getUserInfo(this.login, this.password);
            switch (userInfo.role) {
                case 'none':
                    alert('Fuck you');
                    break;
                default:
                    sessionStorage.id = userInfo.id;
                    sessionStorage.role = userInfo.role;
                    window.location.href = userInfo.role === 'student' ? '/student' : `/teacher/${userInfo.id}`;
            }
        },

        signUp() {
            const login = encodeURIComponent(this.login);
            const email = encodeURIComponent(this.email);
            const password = encodeURIComponent(this.password);
            console.log(this.isTeacher)
            fetch(`${frontURL}/signUp?login=${login}&email=${email}&password=${password}&isTeacher=${this.isTeacher}`, {
                method: 'POST'
            }).then(

            )
        },

        getUserInfo(login, password) {
            login = encodeURIComponent(login);
            password = encodeURIComponent(password);
            return fetch(`${frontURL}/getUserInfo?login=${login}&password=${password}`).then(
                response => response.json()
            );
        }
    }
};