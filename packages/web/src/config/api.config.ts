const API_URL = process.env.REACT_APP_API_URL;

export const API_URLS = {
   LOGIN: "/AuthAPI/UserLogin",
   BUCKET: "/bucket",
   BUCKET_VIEWFILE: "/bucket/viewfile",
   REGISTER: "/user/register",
   UPDATEUSER: "/user/updateUser",
   CREATECUSTOMER: "/stripe/create-customer",
   GETUSERDATA: "/user/getUserData",
   GETUSER_BY_EMAIL: "/user/getUserByEmail",
   GETCARDINFO: "/stripe/getCardinfo",
   GETPAYMENTS: "/payment/getPayments",
   UPDATECARD: "/stripe/updateCard",
   CANCELSUBSCRIPTION: "/stripe/cancelSubscription",
   GET_PREFIX: "/organization/getBucketPrefix",
};

export const getApiUrl = (key) => {
   return API_URL + key;
};
