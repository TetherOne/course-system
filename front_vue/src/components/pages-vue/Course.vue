<!Doctype html>

<template>
    <header>
        <div class="tittle-container">
            <span class="back-container">
                <a @click="goBack" class="back-link">
                  <img src="/src/assets/arrow.png" alt="Arrow" class="arrow-image">
                  <span class="back-text">Назад</span>
                </a>
            </span>
            <span class="profile-container">
                <span class="profile-link">Профиль</span>
            </span>
        </div>
    </header>

    <body>
        <div class="description-container">
            <span>Курс</span>
            <span class="course-name">Название курса</span>
            <span class="course-description">{{ info.description }}</span>
        </div>

        <div class="course-help-container">
            <span class="course-help-tittle">Телеграм помощь</span>
            <span class="course-help-text">Сообщить о проблеме с курсом можно по ссылке в Telegram</span>
        </div>
    </body>
</template>


<script src="../pages-scripts/course.js">

</script>


<style src="../pages-css/course.css">

</style>