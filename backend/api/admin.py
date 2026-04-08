from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, CV, Vacancy, Application


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'role', 'email']
    list_filter = ['role']
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Роль', {'fields': ('role',)}),
    )


@admin.register(CV)
class CVAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'user', 'university_name', 'expected_salary']
    search_fields = ['full_name', 'university_name']


@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = ['title', 'company', 'city', 'salary', 'employment_type', 'work_format']
    list_filter = ['city', 'employment_type', 'work_format']
    search_fields = ['title', 'company__username']


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['applicant', 'vacancy', 'status', 'applied_at']
    list_filter = ['status']
