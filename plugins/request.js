import Vue from 'vue'
import axios from 'axios'
import https from 'https';

// urlQuery: ?id=2&name=tam
// urlRegex: /v1/category/:id

const makeRequestAPI = ({ url, method, data, headers, hasAuth = false } = {}) => {
  if (!url) return false;

  const { urlQuery = {}, urlRegex = {}, ...rest } = data;
  // url = objectToUrlRegex(url, urlRegex);

  const headerFormData = {
    'Content-Type': 'multipart/form-data'
  };
  const token = getToken();
  if (token && hasAuth) headerFormData['Authorization'] = token;

  if (method && method !== 'GET' && process.client) {
    return axios({
      url,
      method,
      data: objectToFormData(rest),
      headers: headers || headerFormData
    });
  }

  const hasUrlQuery = url.split("&").length == 2;

  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  // const httpsAgent = new https.Agent({ ca: MY_CA_BUNDLE });
  return axios({ url: url + objectToUrlQuery(urlQuery, hasUrlQuery), method: 'GET', headers: headers || headerFormData, httpsAgent });
}

const getToken = (ipToken) => {
  if (process.client) {
    const token = localStorage.getItem("token");
    if (ipToken) return `Bearer ${ipToken}`;
    return token ? `Bearer ${token}` : '';
  }
}

const objectToFormData = (obj, form, namespace) => {
  let fd = form || new FormData();
  let formKey;

  for (let property in obj) {
    if (obj.hasOwnProperty(property) && obj[property]) {
      if (namespace) {
        formKey = namespace + "[" + property + "]";
      } else {
        formKey = property;
      }

      // if the property is an object, but not a File, use recursivity.
      if (obj[property] instanceof Date) {
        fd.append(formKey, obj[property].toISOString());
      } else if (
        typeof obj[property] === "object" &&
        !(obj[property] instanceof File)
      ) {
        objectToFormData(obj[property], fd, formKey);
      } else {
        // if it's a string or a File object
        fd.append(formKey, obj[property]);
      }
    }
  }

  return fd;
}

const objectToUrlQuery = (obj, hasUrlQuery = false) => {
  if (obj && Object.keys(obj).length < 1) return '';
  let arr = [];
  Object.keys(obj).forEach(key => {
    if (obj[key]) {
      arr.push(`${key}=${Array.isArray(obj[key]) ? obj[key].join(',') : obj[key]}`);
    }
  });
  return `${hasUrlQuery ? '&' : '?'}` + arr.join('&');
}

function objectToUrlRegex(url, obj) {
  if (typeof url !== 'string') return;
  const urlArr = url.split("://");
  if (urlArr.length < 2) return url;

  const segments = urlArr[1].split('/');
  return urlArr[0] + "://" + segments.map((segment) => {
    const offset = segment.indexOf(':');
    if (offset == -1) return segment;

    const key = segment.slice(1);
    return obj[key];
  }).join('/');
}

Vue.prototype.$request = {
  makeRequestAPI,
  getToken
}
