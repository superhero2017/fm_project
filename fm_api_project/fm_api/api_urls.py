from patches import routers

from meals.urls import router as meals_router
from rsvps.urls import router as rsvps_router
from chefs.urls import router as chef_router
from customers.urls import router as customers_router
# from accounts.urls import router as accounts_router

router = routers.DefaultRouter()
router.extend(meals_router)
router.extend(rsvps_router)
router.extend(chef_router)
router.extend(customers_router)
# router.extend(accounts_router)
