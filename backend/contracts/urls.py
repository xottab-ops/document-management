from rest_framework.routers import SimpleRouter

from contracts.views import ContractsView

router = SimpleRouter()

router.register("contracts", ContractsView)

urlpatterns = router.urls
