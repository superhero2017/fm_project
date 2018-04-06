from django.test import TestCase
from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Meal


class ModelTestCase(TestCase):
    """This class defines the test suite for the Feedme models"""

    def setUp(self):
        """Define the test client and other test variables."""
        self.meal_name = "Greatest food ever"
        self.meal = Meal(name=self.meal_name)

    def test_model_can_create_a_meal(self):
        """Test the Meal model can create a meal."""
        old_count = Meal.objects.count()
        self.meal.save()
        new_count = Meal.objects.count()
        self.assertNotEqual(old_count, new_count)


# Define this after the ModelTestCase
class ViewTestCase(TestCase):
    """Test suite for the api views."""

    def setUp(self):
        """Define the test client and other test variables."""
        self.client = APIClient()
        self.meal_data = {'name': 'Steak n Eggs'}
        self.response = self.client.post(
            reverse('meal-list'),
            self.meal_data,
            format="json")

    def test_api_can_create_a_meal(self):
        """Test the api has meal creation capability."""
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)


    def test_api_can_get_a_meal(self):
        """Test the api can get a given meal."""
        meal = Meal.objects.get()
        print(repr(meal))
        print(meal.id)
        response = self.client.get(
            reverse('meal-detail', kwargs={'pk': meal.id}),
            format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, meal)

    def test_api_can_update_meal(self):
        """Test the api can update a given meal."""
        meal = Meal.objects.get()
        change_meal = {'name': 'New food name'}
        res = self.client.put(
            reverse('meal-detail', kwargs={'pk': meal.id}),
            change_meal, format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_api_can_delete_meal(self):
        """Test the api can delete a meal."""
        meal = Meal.objects.get()
        response = self.client.delete(
            reverse('meal-detail', kwargs={'pk': meal.id}),
            format='json',
            follow=True)

        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)


