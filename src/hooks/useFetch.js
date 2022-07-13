import { useState } from "react";

export default function useFetch() {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  async function request(url, options) {
    const res = await fetch(url, options);
    const json = await res.json();
    setResponse(json);
  }

  async function get(url, token = "", publicKey = "") {
    let options = {};
    if (token && publicKey) {
      options = {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-PubKey": publicKey.replace(/(\n)/gm, "\\n"),
        },
      };
    }

    await request(url, options);
  }

  async function post(url, body) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json, charset=utf-8;",
      },
      body: JSON.stringify(body),
    };
    request(url, options);
  }

  async function put(url, body) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json, charset=utf-8;",
      },
      body: JSON.stringify(body),
    };
    request(url, options);
  }

  async function del(url) {
    const options = {
      method: "DELETE",
      headers: {
        "Access-Control-Request-Method": "DELETE",
      },
    };
    request(url, options);
  }

  return {
    response: response,
    loading: loading,
    errors: errors,
    get: get,
    post: post,
    put: put,
    del: del,
    setLoading: setLoading,
    setErrors: setErrors,
    setResponse: setResponse,
  };
}
