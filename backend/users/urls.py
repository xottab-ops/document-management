from rest_framework.routers import SimpleRouter

from users.views import UserIDViewSet

router = SimpleRouter()

router.register("users", UserIDViewSet)

urlpatterns = router.urls
