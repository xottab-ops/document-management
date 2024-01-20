from rest_framework.routers import SimpleRouter

from university.views import StudentView

router = SimpleRouter()

router.register("students", StudentView)

urlpatterns = router.urls
