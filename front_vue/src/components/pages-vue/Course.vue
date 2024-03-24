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
        </div>
    </header>

    <body>
        <div class="description-help-container">
            <div class="description-container">
                <div>Курс</div>
                <div class="course-name">Название курса</div>
                <div class="course-description">{{ info.description }}</div>
            </div>
            <br>
            <div class="course-help-container">
                <div class="course-help-tittle">Тех-поддержка в телеграм!</div>
                <div class="course-help-text">Сообщить о проблеме с курсом можно по ссылке в Telegram</div>
            </div>
        </div>

    </body>
</template>


<script src="../pages-scripts/course.js">

</script>


<style src="../pages-css/course.css">

</style>