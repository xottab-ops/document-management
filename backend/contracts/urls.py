from rest_framework.routers import SimpleRouter

from contracts.views import ContractsView, ContractViewSet, SendNotificationAPIView


router = SimpleRouter()

router.register("contracts", ContractsView)
router.register("generate_document", ContractViewSet)
router.register("send_notification", SendNotificationAPIView, basename="send_notification")

urlpatterns = router.urls
