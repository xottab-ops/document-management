from rest_framework.routers import SimpleRouter

from customers.views import CustomerView

router = SimpleRouter()

router.register("customers", CustomerView)

urlpatterns = router.urls
