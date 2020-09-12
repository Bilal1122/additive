import { CreateRequest } from 'actions/requestCreator';

export function GetDirectSubordinates(employeeName, callback=null) {
  const request = CreateRequest('GET', `employees/${employeeName}`)
  return request.then((response) => {
    return callback(true, response)
  })
  .catch((error) => {
    // errorHandler(error, callback, true)
  })
}