let baseURL = ''
let ssoAuthsServer = ''
if (import.meta.env.VITE_APP_API_MODE === 'development') {
  baseURL = 'https://ims.hkust-gz.edu.cn'
  // baseURL = ''
  ssoAuthsServer = 'https://192.168.10.27:9000'
} else if (import.meta.env.VITE_APP_API_MODE === 'production') {
  baseURL = 'https://ims.hkust-gz.edu.cn/'
  // baseURL = 'https://nc.fytri.cn'
  ssoAuthsServer = 'https://sso.hkust-gz.edu.cn/'
} else if (import.meta.env.VITE_APP_API_MODE === 'test') {
  baseURL = ''
  ssoAuthsServer = ''
}

export const apiConfig = {
  baseURL,
  ssoAuthsServer,
}
