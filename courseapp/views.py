from django.http import HttpResponse
from django.http import HttpRequest

from django.shortcuts import render



def main_page(request: HttpRequest) -> HttpResponse:
    return render(request, 'courseapp/main-page.html')