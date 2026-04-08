from django.core.management.base import BaseCommand
from api.models import User, Vacancy


class Command(BaseCommand):
    def handle(self, *args, **options):
        # Create sample company
        company1, _ = User.objects.get_or_create(
            username='KazakhTech',
            defaults={'role': 'company'}
        )
        company2, _ = User.objects.get_or_create(
            username='AstanaDigital',
            defaults={'role': 'company'}
        )
        company3, _ = User.objects.get_or_create(
            username='AlmatyInnovations',
            defaults={'role': 'company'}
        )

        # Create sample vacancies
        vacancies_data = [
            {
                'company': company1,
                'title': 'Python Әзірлеуші',
                'salary': 500000,
                'city': 'Алматы',
                'employment_type': 'full_time',
                'work_format': 'remote',
                'description': 'Біз қуатты веб-қосымшаларды әзірлеуді іздейтін тәжірибелі Python әзірлеушісін іздейміз.',
                'requirements': 'Python, Django, PostgreSQL, REST API білімі'
            },
            {
                'company': company1,
                'title': 'UI/UX Дизайнер',
                'salary': 400000,
                'city': 'Астана',
                'employment_type': 'full_time',
                'work_format': 'onsite',
                'description': 'Заманауи интерфейстерді жобалау және пайдаланушы тәжірибесін жақсарту.',
                'requirements': 'Figma, Adobe XD, UX принциптері'
            },
            {
                'company': company2,
                'title': 'JavaScript Әзірлеуші',
                'salary': 450000,
                'city': 'Алматы',
                'employment_type': 'full_time',
                'work_format': 'hybrid',
                'description': 'Интерактивті веб-беттерді әзірлеу.',
                'requirements': 'JavaScript, TypeScript, React, Angular'
            },
            {
                'company': company2,
                'title': 'Маркетинг Менеджері',
                'salary': 350000,
                'city': 'Астана',
                'employment_type': 'full_time',
                'work_format': 'onsite',
                'description': 'Маркетинг стратегияларын әзірлеу және жүзеге асыру.',
                'requirements': 'Маркетинг тәжірибесі, SMM, аналитика'
            },
            {
                'company': company3,
                'title': 'Стажировка - IT',
                'salary': 150000,
                'city': 'Шымкент',
                'employment_type': 'part_time',
                'work_format': 'remote',
                'description': 'Студенттер үшін IT саласында стажировка.',
                'requirements': 'Бағдарламалау негіздері'
            },
            {
                'company': company3,
                'title': 'Мәліметтер Әкімшісі',
                'salary': 300000,
                'city': 'Алматы',
                'employment_type': 'full_time',
                'work_format': 'onsite',
                'description': 'Мәліметтер базасын басқару және оптимизациялау.',
                'requirements': 'SQL, MongoDB, PostgreSQL'
            },
        ]

        for vac_data in vacancies_data:
            Vacancy.objects.get_or_create(
                title=vac_data['title'],
                company=vac_data['company'],
                defaults=vac_data
            )
            self.stdout.write(f"Created vacancy: {vac_data['title']}")

        self.stdout.write(self.style.SUCCESS('Seed data created successfully!'))
