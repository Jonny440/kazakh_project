from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    ROLE_CHOICES = [
        ('student', 'Студент'),
        ('company', 'Компания'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')

    class Meta:
        verbose_name = 'Пайдаланушы'
        verbose_name_plural = 'Пайдаланушылар'


class CV(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cv')
    full_name = models.CharField(max_length=255, verbose_name='Толық аты')
    expected_salary = models.IntegerField(verbose_name='Күтілетін жалақы')
    about_me = models.TextField(verbose_name='Мен туралы')
    university_name = models.CharField(max_length=255, verbose_name='Университет')
    gpa = models.DecimalField(max_digits=3, decimal_places=2, verbose_name='GPA')
    skills = models.TextField(verbose_name='Дағдылар')
    experience = models.TextField(blank=True, null=True, verbose_name='Тәжірибе')
    phone = models.CharField(max_length=20, verbose_name='Телефон')
    email = models.EmailField(verbose_name='Электрондық пошта')

    class Meta:
        verbose_name = 'CV'
        verbose_name_plural = 'CV-лер'

    def __str__(self):
        return self.full_name


class Vacancy(models.Model):
    EMPLOYMENT_TYPES = [
        ('full_time', 'Толық уақыт'),
        ('part_time', 'Жартылай уақыт'),
    ]
    WORK_FORMATS = [
        ('remote', 'Қашықтан'),
        ('onsite', 'Офисте'),
    ]
    company = models.ForeignKey(User, on_delete=models.CASCADE, related_name='vacancies')
    title = models.CharField(max_length=255, verbose_name='Жұмыс атауы')
    salary = models.IntegerField(verbose_name='Жалақы')
    city = models.CharField(max_length=100, verbose_name='Қала')
    employment_type = models.CharField(max_length=20, choices=EMPLOYMENT_TYPES, verbose_name='Жұмыс түрі')
    work_format = models.CharField(max_length=20, choices=WORK_FORMATS, verbose_name='Жұмыс форматы')
    description = models.TextField(verbose_name='Сипаттама')
    requirements = models.TextField(verbose_name='Талаптар')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Құрылған уақыты')

    class Meta:
        verbose_name = 'Бос орын'
        verbose_name_plural = 'Бос орындар'
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Application(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Күтуде'),
        ('accepted', 'Қабылданды'),
        ('rejected', 'Бас тартылды'),
    ]
    vacancy = models.ForeignKey(Vacancy, on_delete=models.CASCADE, related_name='applications')
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Өтініш'
        verbose_name_plural = 'Өтініштер'

    def __str__(self):
        return f"{self.applicant.username} - {self.vacancy.title}"
