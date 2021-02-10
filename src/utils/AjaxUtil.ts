import Axios from 'axios';
import { getLocalToken } from 'src/components/auth/module/AuthModule';
import { installStubRequestIfNeeded, uninstallStubRequestIfNeeded } from 'src/test/apimock';


export interface IAjaxParam {
  url: string,
  method?: string,
  data?: any,
  params?: any,
}

const defaultParam: IAjaxParam = {
  url: '',
  method: 'get',
}

function ajax(param: IAjaxParam) {
  const p: IAjaxParam = Object.assign({}, defaultParam, param);
  if (param.url) {
    p.url = param.url;
  }
  const data = (param.data) ? param.data : '';
  const params = (param.params) ? param.params : '';
  const url = `${process.env.REACT_APP_API_URL}${p.url}`;

  const headers: any = {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: `Bearer ${getLocalToken()}`,
  }

  const method = p.method!
  const config = { url, method, headers, data, params }

  // for mock
  installStubRequestIfNeeded(url)

  return new Promise((resolve, reject) => {
    Axios.create().request(config)
      .then((resp: any) => {
        resolve(resp.data);
        uninstallStubRequestIfNeeded()
      })
      .catch((err: any) => {
        console.log(err);
        reject(err);
      })
  })
}

export default ajax;