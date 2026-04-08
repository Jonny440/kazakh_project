from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from .models import User, CV, Vacancy, Application
from .serializers import (
    UserSerializer, CVSerializer, VacancySerializer, ApplicationSerializer
)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['username']


class CVViewSet(viewsets.ModelViewSet):
    queryset = CV.objects.all()
    serializer_class = CVSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def my_cv(self, request):
        try:
            cv = CV.objects.get(user=request.user)
            serializer = self.get_serializer(cv)
            return Response(serializer.data)
        except CV.DoesNotExist:
            return Response({'detail': 'CV табылмады'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def update_my_cv(self, request):
        try:
            cv = CV.objects.get(user=request.user)
            serializer = self.get_serializer(cv, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except CV.DoesNotExist:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class VacancyViewSet(viewsets.ModelViewSet):
    queryset = Vacancy.objects.all()
    serializer_class = VacancySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'city', 'company__username']
    ordering_fields = ['created_at', 'salary']

    def get_queryset(self):
        queryset = super().get_queryset()
        city = self.request.query_params.get('city', None)
        employment_type = self.request.query_params.get('employment_type', None)
        work_format = self.request.query_params.get('work_format', None)
        salary_min = self.request.query_params.get('salary_min', None)
        salary_max = self.request.query_params.get('salary_max', None)
        search = self.request.query_params.get('search', None)

        if city:
            queryset = queryset.filter(city__icontains=city)
        if employment_type:
            queryset = queryset.filter(employment_type=employment_type)
        if work_format:
            queryset = queryset.filter(work_format=work_format)
        if salary_min:
            queryset = queryset.filter(salary__gte=salary_min)
        if salary_max:
            queryset = queryset.filter(salary__lte=salary_max)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(company__username__icontains=search)
            )

        return queryset

    def perform_create(self, serializer):
        serializer.save(company=self.request.user)


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user)

    @action(detail=False, methods=['get'])
    def my_applications(self, request):
        applications = Application.objects.filter(applicant=request.user)
        serializer = self.get_serializer(applications, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def my_vacancy_applications(self, request):
        vacancies = Vacancy.objects.filter(company=request.user)
        applications = Application.objects.filter(vacancy__in=vacancies)
        serializer = self.get_serializer(applications, many=True)
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        role = request.data.get('role')
        username = request.data.get('username', f'{role}_{request.data.get("name", "user")}')

        user, created = User.objects.get_or_create(
            username=username,
            defaults={'role': role}
        )

        return Response({
            'id': user.id,
            'username': user.username,
            'role': user.role,
            'created': created
        })
