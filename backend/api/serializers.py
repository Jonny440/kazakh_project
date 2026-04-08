from rest_framework import serializers
from .models import User, CV, Vacancy, Application


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'role']


class CVSerializer(serializers.ModelSerializer):
    class Meta:
        model = CV
        fields = ['id', 'full_name', 'expected_salary', 'about_me', 'university_name',
                  'gpa', 'skills', 'experience', 'phone', 'email']


class VacancySerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.username', read_only=True)

    class Meta:
        model = Vacancy
        fields = ['id', 'title', 'salary', 'city', 'employment_type', 'work_format',
                  'description', 'requirements', 'company_name', 'created_at']


class ApplicationSerializer(serializers.ModelSerializer):
    vacancy_title = serializers.CharField(source='vacancy.title', read_only=True)
    applicant_username = serializers.CharField(source='applicant.username', read_only=True)

    class Meta:
        model = Application
        fields = ['id', 'vacancy', 'vacancy_title', 'applicant', 'applicant_username', 'status', 'applied_at']
