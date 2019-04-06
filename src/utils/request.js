import fetch from "dva/fetch";

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    console.log("fetch 失败", response);
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
*/

export default function rq(url, method,data) {
  const defaultOptions = {
    method: method || "GET",
    // body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  };
  if(method === "POST"){
    defaultOptions['method'] = "POST";
    defaultOptions['body'] = JSON.stringify(data);
  }
  return fetch(url, defaultOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
