import http from 'k6/http';
import { check } from 'k6';//check is like assertion
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import faker from 'https://cdnjs.cloudflare.com/ajax/libs/react/19.1.1/cjs/react.production.min.js'; //copied link from https://cdnjs.com/libraries
export const options = {
  vus: 1,
  duration: '2s',
}; 
const params = {
  headers: {
    Authorization: 'Bearer b08928b1ca3ac18cdc38f984bc280805305a422d0c54a900d96c01c18d51fd67',
  },
}; 

const payload = {
    "name": randomString(5),
   // "email": randomString(5)+"@howe"+randomString(5)+".test",
    "email": faker.internet.email(),
    "gender": "female",
    "status": "active"
}
const url = 'https://gorest.co.in/public/v2/users';
console.log("******payload********",payload);

export default function () {
  const response = http.post(url,payload,params);
  console.log("***rsesponse body********",response.body);
  //console.log(response);
  check(response, {
    
    'status is 201': (response) => response.status === 201,
    'id is present': (response) => response.body.includes('"id":'),
  });
}