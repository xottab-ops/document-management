from rest_framework import serializers

from university.models import Student, StudyGroup, Discipline


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["name", "phone_number"]


class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = ["name", "lessons_per_week", "lesson_time", "discipline_price"]


class StudyGroupSerializer(serializers.ModelSerializer):
    discipline = DisciplineSerializer()

    class Meta:
        model = StudyGroup
        fields = ["name", "education_date_start", "education_date_end", "discipline"]
