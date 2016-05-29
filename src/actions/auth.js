import asyncRequest from '../utils/request'


const authRequest = (url, data) => dispatch => {
  const params = { url, method: "post", data }

  return dispatch({
    types: ['LOGIN_REQUEST', 'LOGIN_SUCCESS', 'LOGIN_FAILURE'],
    callAPI: () => asyncRequest(params)
  })
}


export function auth(type, data) {
  return authRequest(`/api/auth/${type}`, data)
}


export function signup(data) {
  return authRequest("/api/auth/signup", data)
}


export function login(data) {
  return authRequest("/api/auth/login", data)
}


export function logged(username, id) {
	return {
		type: "LOGIN_SUCCESS",
		response: { username, id }
	}
}


export function logout() {
  authRequest({ url: "/api/auth/logout" })
  return { type: "LOGOUT" }
}
