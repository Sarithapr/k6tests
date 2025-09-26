//ramp up from 0 to 200 users and stay for 10 min in case of average load test. But in stress test stay for little longer and ramp up and ramp down periods are longer
import http from 'k6/http';
import { check } from 'k6';
export const options = {
  stages: [ 
    {duration:'1m', target:200}, //ramp up to 200 users in 1 min
    {duration:'5m', target:200}, //stay at 200 users for 5 min
    {duration:'30s', target:0} //ramp down from 200 to 0 in 30s
  ]
};

export default function () {
  const response = http.get('https://quickpizza.grafana.com/');
  check(response, {
    
    'status is 200': (r) => r.status === 200,
    'response time < 900ms': (r) => r.timings.duration < 500,
  })
}