FROM python:3.11.4-slim

COPY requirements.txt /temp/requirements.txt

RUN pip install -r /temp/requirements.txt

COPY course_system /course_system

WORKDIR /course_system

EXPOSE 8000