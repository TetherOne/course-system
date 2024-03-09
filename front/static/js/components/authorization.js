export const authorization = {
    template: `
        <div id="log-in-form">
            <div @click="logIn = true; register = false;">Войти</div>
            <div @click="register = true; logIn = false;">Зарегистрироваться</div>
            <div v-if="logIn" id="log-in">
                <label for="">Логин</label>
                <input><br>
                <label for="">Пароль</label>
                <input>
            </div>
            <div id="register-form" v-if="register">
                <label for="">Логин</label>
                <input><br>
                <label for="">Электронная почта</label>
                <input><br>
                <label for="">Пароль</label>
                <input>
            </div>
        </div>
    `,
    data() {
        return {
            logIn: true,
            register: false
        }
    }
};