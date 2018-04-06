//////////////////////// URLs ///////////////////////////////
// export const MEALS_URL = `${process.env.REACT_APP_API_URL}/meals/`
// export const RSVPS_URL = `${process.env.REACT_APP_API_URL}/rsvps/`
// export const LOGIN_URL = `${process.env.REACT_APP_API_URL}/rest-auth/login/`
// export const SIGNUP_URL = `${process.env.REACT_APP_API_URL}/rest-auth/registration/`
//

const apiRoot = process.env.REACT_APP_API_URL
const getApiUrl = (path) => `${apiRoot}${path}`

export const getMealsPath = () => `/meals/`
export const getMealPath = (id) => `/meals/${id}/`
export const getRsvpsPath = () => `/rsvps/`
export const getLoginPath = () => `/rest-auth/login/`
export const getSignupPath = () => `/rest-auth/registration/`
export const getProfilePath = (id) => `/profiles/${id}/`
export const getDashboardPath = () => `/user/dashboard/`
export const getEditProfilePath = () => `/user/profile/`
export const getMealsCookingPath = () => `/user/cooking/`
export const getEditProfilePhotosPath = () => `/user/profile/photos`
export const getEditVerificationPath = () => `/user/profile/trust`
export const getCustomerByIdPath = (id) => `/customers/${id}/`
export const getCustomersPath = () => `/customers/`
export const getFbLoginPath = () => `/rest-auth/facebook/`
export const getChefApplicationPath = () => `/chefApplication/`


export const routerLoginPath = () => `/login`
export const routerSignupPath = () => `/signup`
export const routerBecomeChefPath = () => `/become-a-chef`

export const getLogoPath = () => './logo.png'
export const getLogoSvgPath = () => './logo.svg'
export const getWhiteLogoSvgPath = () => './logo_white.svg'
export const getDefaultProfilePhoto = () => './img/default_profile_photo.jpg'
export const getCookPageBannerPhoto = () => '/img/cook_page_banner.jpg'

export const getMealsUrl = () => getApiUrl(getMealsPath())
export const getMealUrl = (id) => getApiUrl(getMealPath(id))
export const getRsvpsUrl = () => getApiUrl(getRsvpsPath())
export const getLoginUrl = () => getApiUrl(getLoginPath())
export const getSignupUrl = () => getApiUrl(getSignupPath())
export const getProfileUrl = (id) => getApiUrl(getProfilePath(id))
export const getCustomerByIdUrl = (id) => getApiUrl(getCustomerByIdPath(id))
export const getCustomersUrl = () => getApiUrl(getCustomersPath())
export const getFbLoginUrl = () => getApiUrl(getFbLoginPath())
export const getChefApplicationUrl = () => getApiUrl(getChefApplicationPath())

export const getDefaultMealImage = () => getApiUrl('/static/img/default/meal.png')
export const getDefaultImage = () => getApiUrl('/static/img/default/meal.png')

// export const getTermsOfServiceUrl = () => getUrl('/terms-of-service.html')
// export const getPrivacyPolicyUrl = () => getUrl('/privacy-policy.html')
export const getTermsOfServiceUrl = () => 'http://www.feedme.tech/terms-of-service.html'
export const getPrivacyPolicyUrl = () => 'http://www.feedme.tech/privacy-policy.html'

export const pathIsDescendant = (path, ancestor) => {
  return path.substring(0, ancestor.length) === ancestor
}

export const fbLoginAppId = () => '126763964698459'
