/**
 * Created by shivendra on 6/9/16.
 */

const config = require('./config');
const Hapi = require('hapi');


var server = new Hapi.Server();

server.connection({
    host: config.get("server:host"),
    port: Number(config.get("server:port"))
});

server.register(require('./plugins/bird-repository-apis'),function(err){
      if(err){
          console.error("Error in loading plugins aborting Launch!",err)
      }else{
          server.start(function () {
              console.log("server started at  ", server.info);
          });
      }
  }
);




