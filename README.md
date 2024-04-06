[![Python 3.11](https://img.shields.io/badge/python-3.11-green.svg)](https://www.python.org/downloads/release/python-360/)
![Django 4.0](https://img.shields.io/badge/Django-5.0.2-green.svg)



# Система для ведения курсов
## 1. Описание проекта

#### Краткое описание проекта
        Идея проекта заключается в создании образовательной платформы,
        которая будет предоставлять курсы различной тематики.
        В отличие от существующих аналогов, таких как Moodle,
        этот проект имеет более удобную структуру учебных материалов
        и улучшенное взаимодействие между преподавателем и студентом.

#### Структура учебных материалов
        Структура учебных материалов будет включать в себя список курсов,
        в курсах будут содержаться модули (темы), в темах будут уроки. 
        У урока может быть: главное видео (например лекция), описание и
        раздел с дополнительными материалами (это могут быть
        дополнительные файлы или домашние задания). Таким образом преподаватель сможет
        использовать курс как дополнение к своим очным занятиям.
        
#### Структура тестов
        Преподаватель может создавать тесты с вариантами ответов, которые будут
        прикреплены к любому уроку. Тест состои из вопросов и ответов к ним.
        Преподаватель также может прикреплять файлы к вопросу и попросить ученика
        также прикрепить файлы к ответу на вопрос (например решить писмьенно задание).
        Тесты в которых нет прикрепленных файлов проверяется автоматически. 
        Теты, в которых есть прикрепленные файлы от преподавателя,
        но нет надобности добавления файлов от студента (т.е. есть варианты ответа
        на вопрос в котором прикреплен файл от преподавателя) тоже проверяются автоматически.
        Тесты в которых есть прикрепленные файл от студента к вопросу проверяются
        автоматически, но вопросы, с прикрепленными файлами от студентов, не проверяются,
        за них идет 0 баллов, в таком случае преподаватель это увидит (это будет выделено)
        и он должен будет поставить балл за этот вопрос, результат автоматически пересчитается
        во всех таблицах (ниже будет написанно в каких).
        
#### Таблица с результатами
        В курсе есть таблица с результатами всех учеников за все контрольные точки
        этого курса, также есть зачетная таблица, которая показывает максимально
        возможный балл за курс (сумма максимального балла за все котнрольные точки курса)
        и текущий бал студента за эти контрольные точки. Преподаватель не сможет изменять баллы
        за вопросы в контрольное точке, которую уже проходил какой-либо студент, но может создавать
        новую контрольную точку в этом курсе, в таком случае баллы пересчитаются.
        
#### Регистрация и аутентификация
        При регистрации пользователь должен будет указать никнейм, почту, пароль, свою роль
        (студент или преподаватель) и пройти капчу. Вход в систему будет осуществляться при
        помощи почты и пароля, если пользователь забыл пароль, то его можно будет
        восстановить через почту (на нее придет сообщение со ссылкой для сброса пароля).

## 2. Технологии

#### Linters
    - Flake8
    - Black

  - Django + DRF
  - SQLite (временно)
  - RabbitMQ
  - Celery
  - Redis
  - Vue.js

## 3. Источники
  - https://pypi.org/
  - https://django.fun/docs/
  - https://docs.djangoproject.com/en/5.0/
  - https://www.django-rest-framework.org/
  - https://www.youtube.com/playlist?list=PLyaCd9XYVI9DQhzpYCNI9PAvf3U1EunVm
  - https://www.youtube.com/playlist?list=PLA0M1Bcd0w8xO_39zZll2u1lz_Q-Mwn1F
  - https://www.youtube.com/playlist?list=PLA0M1Bcd0w8yU5h2vwZ4LO7h1xt8COUXl
  - https://www.youtube.com/playlist?list=PLOLrQ9Pn6caz-6WpcBYxV84g9gwptoN20
