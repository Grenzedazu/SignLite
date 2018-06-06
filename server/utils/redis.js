const redis = require("redis")
const client = redis.createClient();

client.on('connect',function(res){
  console.log(res)
}),

function set(key,value,time){
  client.set(key,value)
  if(!isNaN(time)&&expire > 0){
    client.expire(key,parseInt(time))
  }
},
function get(key){
  client.get(key)
}

module.exports = {
  set,
  get
}