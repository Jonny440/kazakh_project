from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CVViewSet, VacancyViewSet, ApplicationViewSet, LoginView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'cvs', CVViewSet)
router.register(r'vacancies', VacancyViewSet)
router.register(r'applications', ApplicationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
]
