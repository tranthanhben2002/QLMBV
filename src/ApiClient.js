/*global __SERVER__*/
import superagent from 'superagent';
import config from 'config';

class ApiClient {
  constructor(req) {
    ['get', 'post', 'put', 'patch', 'del'].
      forEach((method) => {
        this[method] = (path, options) => {
          return new Promise((resolve, reject) => {
            let request = superagent[method](this.formatUrl(path));
            if (options && options.params) {
              console.log("options", options.params);
              request.query(options.params);
            }
            if (__SERVER__) {
              if (req.get('cookie')) {
                request.set('cookie', req.get('cookie'));
              }
            }
            if (options && options.data) {
              request.send(options.data);
            }
            request.end((err, res) => {
              if (err) {
                reject(res && res.body || err);
              } else {
                resolve(res && res.body);
              }
            });
          });
        };
      });
  }

  /* This was originally a standalone function outside of this class, but babel kept breaking, and this fixes it  */
  formatUrl(path) {
    let adjustedPath = path[0] !== '/' ? '/' + path : path;
    if (__SERVER__) {
      // Prepend host and port of the API server to the path.
      return 'http://localhost:' + config.apiPort + '/cp/v1' + adjustedPath;
    }
    // Prepend `/api` to relative URL, to proxy to API server.
    return '/cp/v1' + adjustedPath;
  }
}

export default ApiClient;
