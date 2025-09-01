import http from 'k6/http';
import { check } from 'k6';//check is like assertion
export const options = {
  vus: 1,
  iterations: 1,
}; 

const params = {
  headers: {
    Authorization: 'Bearer 11b08928b1ca3ac18cdc38f984bc280805305a422d0c54a900d96c01c18d51fd67',
  },
}; 
export default function () {
  const response = http.get('https://gorest.co.in/public/v2/users',params);
  //console.log(response);
  check(response, {
    
    'status is 401': (r) => r.status === 401
  });
}