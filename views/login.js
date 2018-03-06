import queryString from 'query-string'
import api from './api'

const {ticket} = queryString.parse(window.location.search)

async function isLogin() {
    if(ticket) {
        let isLogin = await api.login({
            ticket,
            service: window.location.origin + window.location.pathname
        })
        if(isLogin) {
            return true
        }else {
            return Promise.reject()
        }
    }else {
        return false
    }
}

export default isLogin
