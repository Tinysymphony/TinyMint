var redisPassword = "Tiny270412";
var redisOptions = {auth_pass: redisPassword};
var redis = require('redis');
var bcrypt = require('bcrypt');
var db = redis.createClient(6379, "127.0.0.1", redisOptions);

module.exports = User;

db.on('error', function(err){
    console.log('Error from Redis: ' + err);
});

function User(obj) {
    for (var key in obj){
        this[key] = obj[key];
    }
}

User.prototype.save = function (fn) {
    var user = this;
    db.get('name:' + user.name, function(err, id){
        if(err) return fn(err);
        if(id==null) {
            db.incr('user:ids', function(err, id){
                if (err) return fn(err);
                user.id = id;
                user.hashPassword(function(err){
                    if(err) return fn(err);
                    user.update(fn);
                });
            });
        } else {
            return fn(err);
        }
    });
};

User.prototype.update = function (fn) {
    var user = this;
    var id = user.id;
    db.set('name:' + user.name, id, function(err){
        if (err) return fn(err);
        db.hmset('user:' + id, user, function (err) {
            fn(err);
        });
    });
};

User.prototype.hashPassword = function(fn) {
    var user = this;
    bcrypt.genSalt(10, function(err, salt){
        if (err) return fn(err);
        user.salt = salt;
        bcrypt.hash(user.pass, salt, function(err, hash){
            if(err) return fn(err);
            user.pass = hash;
            fn(err);
        });
    });
};

User.getByName = function(name, fn){
    User.getId(name, function(err, id){
        if(err) return fn(err);
        User.get(id, fn);
    });
};

User.getId = function(name, fn) {
    db.get('name:' + name, fn);
};

User.get = function (id, fn) {
    db.hgetall('user:' + id, function(err, user){
        if(err) return fn(err);
        fn(null, new User(user));
    });
};

User.authenticate = function(name, pass, fn){
    User.getByName(name, function(err, user){
        if(err) return fn(err);
        if(!user.name) return fn();
        bcrypt.hash(pass, user.salt, function (err, hash) {
            if(err) return fn(err);
            if(hash == user.pass)
                return fn(null, user);
            fn();
        });
    });
};



