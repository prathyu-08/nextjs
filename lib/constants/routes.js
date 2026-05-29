export const ROUTES = {
  HOME: '/',

  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    VERIFY_OTP: '/auth/verify-otp',
    FORGOT_USERNAME: '/auth/forgot-username',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
  },

  JOBS: {
    LIST: '/jobs',
    DETAIL: (id) => `/jobs/${id}`,
  },

  CANDIDATE: {
    DASHBOARD: '/candidate/dashboard',
    EDIT_PROFILE: '/candidate/edit-profile',
    BUILD_RESUME: '/candidate/build-resume',
    DOWNLOAD_CV: '/candidate/download-cv',
    PUBLIC_PROFILE: '/candidate/public-profile',
    APPLICATIONS: '/candidate/my-applications',
    FAVOURITES: '/candidate/favourites',
    JOB_ALERT: '/candidate/job-alert',
    MANAGE_RESUME: '/candidate/manage-resume',
    MESSAGES: '/candidate/my-messages',
    FOLLOWINGS: '/candidate/my-followings',
    PACKAGES: '/candidate/packages',
    PAYMENT_HISTORY: '/candidate/payment-history',
  },

  EMPLOYER: {
    DASHBOARD: '/employer/dashboard',
    POST_JOB: '/employer/post-job',
    MANAGE_JOBS: '/employer/manage-jobs',
    COMPANY_PROFILE: '/employer/company-profile',
    COMPANY_SETTINGS: '/employer/company-settings',
    LIST: '/employer/list',
    DETAIL: (id) => `/employer/${id}`,
  },

  PUBLIC: {
    ABOUT: '/public/about',
    CONTACT: '/public/contact',
    FAQ: '/public/faq',
  },
};

export const AUTH_ROUTES = [
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.SIGNUP,
  ROUTES.AUTH.VERIFY_OTP,
  ROUTES.AUTH.FORGOT_USERNAME,
];
