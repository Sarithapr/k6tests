import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '5s',
  cloud: {
    // Project: Default project
    projectID: 4716120,
    // Test runs with the same name groups test runs together.
    name: 'clodtest'
  }
};

export default function() {
  http.get('https://quickpizza.grafana.com');
  sleep(1);
}