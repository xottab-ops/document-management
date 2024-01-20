from rest_framework.routers import SimpleRouter

from contracts.views import ContractsView, ContractStatusView

router = SimpleRouter()

router.register("contracts", ContractsView)
router.register("contract-statuses", ContractStatusView)

urlpatterns = router.urls
