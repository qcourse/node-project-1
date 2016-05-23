var http = require('http');
var url = require('url');
var os  = require('os');
var host = '0.0.0.0';
var port = 8080;

var srv = http.createServer(function (req, res) {
var sysinfo = {};
var arg = url.parse(req.url, true).query;
switch(arg.index){
    case 'MEM': {
        sysinfo= {'MEM': os.totalmem()};
        break;
    }
    case 'LOADAVG':{
        sysinfo = {'LOADAVG':os.loadavg()};
        break;
    }
    case 'HOSTNAME':{
        sysinfo = {'HOSTNAME':os.hostname()};
        break;
    }
    case 'UPTIME':{
        sysinfo = {'UPTIME': os.uptime()};
        break;
    }
    default:
       sysinfo = {};
}

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(sysinfo));
});

srv.listen(port, host, function() {
  console.log('listening on http://%s:%d',host,port);
});
