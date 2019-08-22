const http = require('http');
const app = require('./app');

const port = process.env.PORT || 30001;


const apiServ = http.createServer(app);
apiServ.listen(port);
module.exports = apiServ;