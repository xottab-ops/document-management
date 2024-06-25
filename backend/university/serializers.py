from rest_framework import serializers

from university.models import Student, StudyGroup, Discipline


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["id", "name", "phone_number"]


class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = ["name", "lessons_per_week", "lesson_time", "discipline_price"]


class StudyGroupSerializer(serializers.ModelSerializer):
    discipline = DisciplineSerializer()
    education_date_start = serializers.DateField(format="%d.%m.%Y")
    education_date_end = serializers.DateField(format="%d.%m.%Y")

    class Meta:
        model = StudyGroup
        fields = ["id", "name", "education_date_start", "education_date_end", "discipline", "grade"]
