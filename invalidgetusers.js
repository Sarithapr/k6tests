import http from 'k6/http';
import { check } from 'k6';//check is like assertion
export const options = {
  vus: 1,
  iterations: 1,
}; 

const params = {
  headers: {
    Authorization: 'Bearer oooo1191e29c18e65529c9a25a3fd8a796937310b2beae14d4aefcf9cc8fe4cf83e',
  },
}; 
const url = 'https://gorest.co.in/public/v2/users';
export default function () {
  const response = http.get(url,params);
  console.log(response.status);
  check(response, {
    
    'status is 401': (r) => r.status === 401
  });
}