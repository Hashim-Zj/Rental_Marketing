import axios from 'axios';

const commonApi = (reqMethod, reqData, reqUrl, reqHeader) => {
  const config = {
    method: reqMethod,
    data: reqData,
    url: reqUrl,
    headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
  };
  return axios(config);
}

export default commonApi;
