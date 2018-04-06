_fm_api_

The business logic of feedme presented through a rest api

# Running in a dev environment

## Prerequisites

Make sure you have python 3.4 or greater installed along with virtualenv and virtualenvwrapper

Create a new virtual env called `fm_api` and in the project directory run `pip install -r requirements.txt`

Install postgres and set it up to work with django. The current settings in Django are:

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'feedme',
        'USER': 'django',
        'PASSWORD': 'django',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

so match those when setting up a new database user for testing.

## Running

Lastly, to run the dev server we use a wrapper around `manage.py` called `mp` that changes settings based on the environment. 

For development, after activating the virtual environment, run `$ export DJANGO=dev` in the shell. Then from that terminal you can run `./mp <command>`, where `<command>` is something you'd normally run from `manage.py`, such as `runserver`, `makemigrations`, etc.

Once this is done you can run `./mp migrate` and `./mp runserver` and the dev server should start running at `http://localhost:8010`.

# Project Layout

This section will cover the way our project is set up and peculiarities for using it.

## Settings

As mentioned earlier, `manage.py` is accessed through `mp`. This allows us to use different settings on different environments. 

These settings are defined in the `config` subdirectory in the `fm_api` folder. Where there would normally be one `settings.py`, we have split it up into `base.py` which contains settings that apply to all environments, and `dev.py`, `prod.py`, etc. which contain environment specific settings and are imported according to the `DJANGO` shell variable that has been set before calling `mp`. 

Since these settings are shared across developers, rather than modifying `dev.py` with your specific requirements it is better to simply add a new file, such as `steven_dev.py`, and export the name of this file (without the extension) as your `$DJANGO` variable.

## Apps 

In general, we prefer limited functionality per app. There should really be one main model in each app; if there need to be more, it is generally a good idea to split them up into separate apps.

We use the router and `ViewSet`s from `django-rest` where possible, but if more detailed functionality is used then that is fine too.

Currently, the user model is not extended. Any information that is tied to an individual user and is required of all users should be in the `profiles` app; if it is customer or chef specific, it can be stored in their respective models. 

## Docs

The docs are available at `http://<api url>/docs`. You must be authenticated to view them. However, these are not super descriptive and copious comments are encouraged throughout the code. Additional documentation should be added to this file as well if it is too important/verbose to be kept in the code.

## Migrations

Migrations are a crucial part of database management and it is important that they be committed. When you add/modify a model, run `./mp makemigrations` (or, if it is an entirely new app, `./mp makemigrations new_app`). Then commit these files to the repo so the servers/other devs can use them.

# Development

As mentioned earlier, lots of comments are encouraged.

We run the staging server off of the `dev` branch, so features should be coded in a feature branch, e.g. `profile-pics`, and merged into `dev` when relatively bug free. 

As we move toward production, more strict and specific guidleines will be put in place for this. 



# Authentication with Facebook

## How it works:

Sequence (diagrma can be generated here: https://bramp.github.io/js-sequence-diagrams/ ):

![FB Auth](/docs/fb_auth.svg)

Title: FeedMe Authentication with FaceBook
Frontend->FB: Auth user: fb.com/impression.php/
FB->Frontend: User is authed. Here's `accessToken`
Frontend->Backend: POST /rest-auth/facebook/: auth user with `access_token`
Backend->FB: Give me user info for `access_token`
FB->Backend: Here's info user gave permission to
Backend->DB: Save this user and profile
DB->Backend: Done
Backend->Frontend: Created: TokenModel with `token` and `user`
Backend->Frontend: User is authenticated now so save this cookie with session info


## Setting Up the Apps:

1. For development environment:
    1. Assuming that backend is accessible at: `http://127.0.0.1:9090/`
    1. Add an entry as follows to /etc/hosts
        ```
        127.0.0.1	feedmenow.io
        ```
    1. Run `sudo pkill mDNSResponder` to flush DNS cache
1. Go to Facebook for Developers: https://developers.facebook.com
1. Click `My Apps` drop down on the top right and click `Add New App`
1. Choose a display name and continue
1. Hover over `Facebook Login` and click `Setup`
1. Click `Web`
1. Enter the `Site URL`. This I believe can just be the homepage url and it's not related to any callbacks.
1. Click `Save`
1. Click `Settings` on the left hand side menu. You should now see fields for `App Id`, `App Secret`, etc.
1. Go to Django admin in a new tab: http://127.0.0.1:9090/admin/
1. Click `Sites` app
1. Click on `example.com` to modify it. Set the domain and display name appropriatley and Save.
1. Click `Add` next `Social applications`
1. Select `Facebook` as `Provider`
1. Enter a name for the app
1. Set `Client id` to the `App ID` you get from Facebook.
1. Set `Secret key` to `App Secret` you get from Facebook.
1. Select your website url and move it to `Chosen Sites` in the `Sites` field.
1. Save
1. In the Facebook for Developer app, select Facebook Login on the left hand side menu
1. Enter your url in `Valid OAuth redirect URIs` field and save changes.
    1. If you're setting up a  developer environment, add the URL followed by the port number as well. E.g. `http://feedmenow.io:9090`
    

## Setting Up Frontend and Settings:

Use `docs/fb_example.html` as a starting point for frontend integration.

Ensure `appId` and `version` match what's provided in app's dashboard in Facebook for Developers in the following code:

```
FB.init({
      appId      : '1146966058769656',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.10'
    });
```

`FB.login` takes options as a second parameter. The option we care about is `scope`.
This tells Facebook what information we're looking for from a user's profile. All options for scope can be found here: https://developers.facebook.com/docs/facebook-login/permissions

Some scopes like `user_about_me` will require your Facebook App to be reviewed by Facebook before it can be used.

Whatever you choose for scope, ensure it matches the `SOCIALACCOUNT_PROVIDERS.facebook.SCOPE` list in `settings/base.py`.
The only difference being Django setting value requires a list of strings whereas `FB.login` call requires a string with different scopes separated by commas.

Also, ensure `FB.init` call's `version` option matches `SOCIALACCOUNT_PROVIDERS.facebook.VERSION` list in `settings/base.py`

`SOCIALACCOUNT_PROVIDERS.facebook.FIELDS` in `settings/base.py` will be a list of fields that you want access to from a Facebook user.
They need to correspond with SCOPE settings as some fields are only available with certain scopes.


The fields that you list in `SOCIALACCOUNT_PROVIDERS.facebook.FIELDS` that don't belong in User model (e.g. `gender`) are saved to the User's profile.

Since Profile's model may name things differently than Facebook, you have to add fields that you want to be set in Profile to:

`profile/models.py: facebook_to_profile_map`.

For example, initially, I've set `facebook_to_profile_map` as follows:

```
facebook_to_profile_map = {
    'gender': 'gender'
}
```

That means when a new user authenticates with Facebook, their profile will get the `gender` value from Facebook and add it to their Profile.

If, in the future, we add a field to Profile called `friend_count`, we might change `facebook_to_profile_map` to reflect that:

```
facebook_to_profile_map = {
    'gender': 'gender',
    'friends': friend_count'
}
```

`FB.login` takes a callback as first argument. This call back receives a `response` argument that can be checked whether user successfully authenticated with Facebook or not.
Once it's determined that user has successfully authenticated (`response.status === "connected"`), you can call `/rest-auth/facebook/` with `access_token` which the call back gives to you as: `response.authResponse.accessToken`.


# Stripe

## Overview

We let Stripe store a customer's sensitive info (e.g. credit card number) and chef's bank account details.

The general market flow is as follows:

1. A chef signs up with FeedMe.
1. We create a Stripe Connect account for them with their banking details.
1. Chef creates a meal and sets the number of available servings
1. Customer signs up with FeedMe
1. We create a Stripe Customer account for them right away so we can charge them in future.
1. Customer purchases a Meal and is charged for the number of servings.
1. The customer receives the meal and then logs in to FeedMe to mark it complete (this may change soon)
1. The amount paid by customer minus the FeedMe fee is shown for the chef as `Pending Balance` and is tranferred to Chef's Stripe account (not to their bank yet)
1. After 7 days, the amount paid will now be a `Balance`
1. Chef can click "Pay out" to transfer the remaining balance (all customer payments that are older than 7 days) is transferred to their bank

## Terms

Here are some relevant Stripe terms you should be aware of:
- `Connect Account`: An actual Stripe account we create on behalf of the chef. They cannot login or even know about this account.
- `Customer Account`: A customer account we create on behalf of the customer. It will have the credit card information tied to it and we can charge an acccount as we see fit.
- `Transfer`: Occurs when we move money from FeedMe's Stripe account to Chef's Stripe Account. To avoid a transaction fee for these transfers, you can match them to a Charge using `transfer_group`.
- `Charge`: Occurs when a customer purchases a meal's servings. This causes FeedMe to receive the money from the customer's payment method.
- `Payout`: Occurs when chef decides to transfer their Balance to their bank account from their Stripe account (which isn't visible to them)

## Stripe Admin Interface

### Payout Made to FeedMe's Bank Account

You can find the Payouts under the [Payouts](https://dashboard.stripe.com/payouts/overview) menu item on the left hand side menu.
These are done periodically by Stripe. No action is needed on your part.
To see every payout click on Payouts tap at the top.

### Customer Payments

To see meal purchases and other customer payments, click on [Payments](https://dashboard.stripe.com/test/payments) menu item on the left hand side menu.

If you click on a Payment you can issue a partial or total refund using the `Refund` button at the top.
From this screen you can also see a few details about the payment method the customer used, customers, history, etc.

### Chef Accounts

[Connect](https://dashboard.stripe.com/test/applications/overview) menu item will reveal an overview of the chef account activities.

To see a list of the Chef accounts click Connected Accounts from the top tab.

Here you can click an indidivual chef's account to see more personal details and bank account information.

You can impersonate a chef by clicking `View dashboard as`. Ensure to open that link in a new window to avoid confusion.

To see the transfers made to a chef's bank account, you first `View dashboard as` that chef and then click the Payments menu item on the left hand side.

On the top left, Stripe tells you who you're logged in as. Don't get confused and "trapped" inside a chef account looking for other chefs.

From FeedMe's Stripe account, clicking Connect > Connect transfers will reveal all transfers made to chefs' Stripe accounts.

## Flow

Diagrams can be re-created [here](https://bramp.github.io/js-sequence-diagrams/).

### Chef Signup

![Chef payout](/docs/chef_signup.svg)

```
Title: Chef Signup
Frontend->Stripe: Create bank account with this info
Stripe->Frontend: Created: Stripe Bank Account Token
Frontend->Backend: POST /chefs/ with  Stripe Bank Account Token and other info
Backend->Stripe: Create Connect Account and tie it to  Stripe Bank Account Token bank info
Stripe->Backend: Created: Stripe Connect Account
Backend->Frontend: Created: FeedMe Chef

```


### Customer Signup

![Chef payout](/docs/customer_signup.svg)

```
Title: Customer Signup
Frontend->Stripe: Create Customer Token with thsi card info
Stripe->Frontend: Created: Stripe Customer Token
Frontend->Backend: POST /customers/ with Stripe Customer Token and other info
Backend->Stripe: Create Customer with info and tie account to Stripe Customer Token card data
Stripe->Backend: Created: Stripe Customer
Backend->Frontend: Created: FeedMe Customer

```

### Customer Meal Purchase

![Meal purchase](/docs/meal_purchase.svg)

```
Title: Meal Purchase
Frontend->Backend: POST /rsvps/ with # of servings specified
Backend->Stripe: Create Charge for Customer for specified amount
Stripe->Backend: Created: Stripe Charge
Backend->DB: Save Payment
DB->Backend: Done
Backend->Frontend: Created: RSVP
```


### Customer Satisfaction and Money Release to Chef

![Rsvp complete](/docs/rsvp_complete.svg)


```
Title: Customer Satisfaction and Money Release to Chef
Frontend->Backend: Customer is happy with meal: PATCH /rsvp/{id}/complete
Backend->Stripe: Create Transfer to Chef's Stripe Connect account for RSVP amount - fee
Stripe->Backend: Created: Stripe Transfer
Backend->DB: Create Transfer
DB->Backend: Done
Backend->Frontend: OK: Updated RSVP
```

### Chef Gets Paid Out

![Chef payout](/docs/chef_payout.svg)

```
Title: Chef Payout
Frontend->Backend: Chef wants to transfer their balance to bank account: PATCH /chefs/{id}/payout/
Backend->Stripe: Create Payout for amount that's older than 7 days
Stripe->Backend: Created: Stripe Payout
Backend->Frontend: OK

```
