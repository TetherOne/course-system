[![Python 3.6](https://img.shields.io/badge/python-3.11-green.svg)](https://www.python.org/downloads/release/python-360/)
![Django 3.0](https://img.shields.io/badge/Django-4.2.7-green.svg)



# Система для ведения курсов
## Описание проекта

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
        
#### Ргеистрация и аутентификация
        При регистрации будет использоваться username, password и роль:
        преподаватель или студент. Все курсы будут заблокированы для посещения студентом,
        но доступны по коду, который может передать перподаватель группе студентов. Также
        преподаватель сможет удалять лишних участников с курсов.

## Технологии

  - Vue.js
  - Django + DRF
  - Redis

## Источники
  - https://django.fun/docs/
  - https://www.django-rest-framework.org/
  - https://www.youtube.com/@SeniorPomidorDeveloper
