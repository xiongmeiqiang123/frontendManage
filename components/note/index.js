import {Notification} from 'element-ui'

export function warning (message = 'hello world') {
  Notification({
    message,
    type: 'warning'
  })
}

export function error (message = 'hello world') {
  Notification({
    message,
    type: 'error'
  })
}

export function success (message = 'hello world') {
  Notification({
    message,
    type: 'success'
  })
}

export function info (message = 'hello world') {
  Notification({
    message,
    type: 'info'
  })
}

export default function note (type = 'success', message = 'hello world') {
  Notification({
    message,
    type
  })
}
