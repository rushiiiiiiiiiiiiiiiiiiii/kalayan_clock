const BASE_URL = "http://192.168.0.103:5101/api/admin";

const API_ENDPOINTS = {
  FETCH_ALL_TV: `${BASE_URL}/All_tv`,
  FETCH_STORE_NOTIFICATION: `${BASE_URL}/fetch_storenotification`,
  ADD_STORE_NOTIFICATION: `${BASE_URL}/store_notify`,
  UPLOAD_IMAGE: `${BASE_URL}/uploadbg`,
  LOGIN: `${BASE_URL}/login`,
  UPLOAD_CSV: `${BASE_URL}/uploadCSV`,
};


export { BASE_URL, API_ENDPOINTS };
