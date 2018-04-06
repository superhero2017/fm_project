import AuthSaga from './sagas/auth'
import MealsSaga from './sagas/meals'
import RsvpSaga from './sagas/rsvp'
import NewMealSaga from './sagas/newMeal'
import ProfileSaga from './sagas/profiles'
import ClientSaga from './sagas/client'
import StripeSaga from './sagas/stripe'
import CustomerSaga from './sagas/customer'
import ChefApplicationSaga from './sagas/chefApplication'

export default function * IndexSaga () {
  yield [
    AuthSaga(),
    MealsSaga(),
    RsvpSaga(),
    NewMealSaga(),
    ProfileSaga(),
    ClientSaga(),
    StripeSaga(),
    CustomerSaga(),
    ChefApplicationSaga(),
  ]
}
