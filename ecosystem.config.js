module.exports = {
    apps : [{
        name   : "autumn-farm-wx",
        script : "app.js",
        watch  : true,
        env_production : {
            PORT : 80
        }
    }]
};