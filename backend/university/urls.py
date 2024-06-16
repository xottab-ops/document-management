from rest_framework.routers import SimpleRouter

from university.views import StudentView, StudyGroupView, DisciplineView

router = SimpleRouter()

router.register("students", StudentView)
router.register("disciplines", DisciplineView)
router.register("studygroups", StudyGroupView)

urlpatterns = router.urls
