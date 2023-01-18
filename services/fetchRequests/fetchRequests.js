import envs from '../../globalVariable';
export default class FetchRequest {
  static apiCall(
    path,
    method,
    options,
    headers = {Accept: 'application/json', 'Content-Type': 'application/json'},
  ) {
    let responseHeaders = null;
    let requestOptions = {
      method: method,
      headers: headers,
    };
    try {
      return fetch(envs.BASE_URL + path, requestOptions)
        .then((response) => {
          responseHeaders = response.headers;
          return response.json();
        })
        .then((responseJson) => {
          console.log(responseJson);
          return {content: responseJson.content || responseJson};
        })
        .catch((error) => {
          return {error: error};
        });
    } catch (error) {
      return {error: error};
    }
  }
  static apiCallPost(
    path,
    method,
    bodyData,
    headers = {Accept: 'application/json', 'Content-Type': 'application/json'},
  ) {
    let responseHeaders = null;
    let requestOptions = {
      method: method,
      headers: headers,
      body: bodyData,
    };
    try {
      return fetch(envs.BASE_URL + path, requestOptions)
        .then((response) => {
          responseHeaders = response.headers;
          return response.json();
        })
        .then((responseJson) => {
          console.log(responseJson);
          return {content: responseJson.content || responseJson};
        })
        .catch((error) => {
          return {error: error};
        });
    } catch (error) {
      return {error: error};
    }
  }
}
