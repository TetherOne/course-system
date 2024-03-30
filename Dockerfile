#FROM python:3.11.8-alpine3.19
#
#COPY requirements.txt /temp/requirements.txt
#
#RUN pip install -r /temp/requirements.txt
#
#COPY course_system /course_system
#
#WORKDIR /course_system
#
#EXPOSE 8000
#
#RUN adduser --disabled-password course-system-user
#
#USER course-system-user