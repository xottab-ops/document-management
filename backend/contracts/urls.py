from rest_framework.routers import SimpleRouter

from contracts.views import ContractsView, ContractViewSet


router = SimpleRouter()

router.register("contracts", ContractsView)
router.register("generate_document", ContractViewSet)

urlpatterns = router.urls
