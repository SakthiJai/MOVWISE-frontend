export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER_USER: '/auth/registeruser',
};


export const COMPONENT_ROUTES = {
  // COMPARE_QUOTES: '/components/comparequotes',
  QUOTES_DETAILS: '/components/quotesdetails',
  PERSONAL_DETAILS: '/components/personaldetails',
  PROPERTY_DETAILS: '/components/propertydetails',
  PARTNERS_PAGE: '/components/partnerspage',
  PARTNERS_CARD: '/components/partnerspagecard',
  YOUR_HISTORY: '/components/YourHistory',
  ABOUT: '/About',
};

export const MAIN_ROUTES = {
  HOME: '/',
 // ABOUT: '/about',
  NOT_FOUND: '/_not-found',
  NAVBAR: '/parts/navbar',
};


const ROUTES = {
  ...AUTH_ROUTES,
  ...COMPONENT_ROUTES,
  ...MAIN_ROUTES,
};

export default ROUTES;