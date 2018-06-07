const redis = require("redis")
const client = redis.createClient();

client.on("error", function (error) {
  console.log(error);
});
var set=function(key,value,time){
  client.set(key,value,redis.print())
  if(!isNaN(time)&&expire > 0){
    client.expire(key,parseInt(time))
  }
  redis.quit()
};
var get=function(key) {
  client.get(key, function (err, reply) {
    // reply is null when the key is missing
    console.log(reply);
  })
  return reply;
}

module.exports = {
  set,
  get
}