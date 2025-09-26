import http from 'k6/http';
import { check } from 'k6';//check is like assertion
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
export const options = {
  vus: 2, // Lower VUs
  iterations: 4, // Lower iterations if needed
}; 
const params = {
  headers: {
    'Content-Type': 'application/json',
    'x-api-key':'reqres-free-v1'
    //Authorization: 'Bearer a1191e29c18e65529c9a25a3fd8a796937310b2beae14d4aefcf9cc8fe4cf83e',
  },
}; 

const url = 'https://reqres.in/api/users';
//console.log("******payload********",payload);
const input = open("./data.json");
export default function () {
  const payload = JSON.stringify({
    name: randomString(5),
    job: "QA"
  });
  const response = http.post(url,input,params);
  //console.log("***rsesponse body********",response.body);
  console.log(response.status);
  console.log(response.body);
  check(response, {
    
    'status is 201': (response) => response.status === 201,
    'id is present': (response) => response.body.includes('"id":'),
  });
}