define(['backbone'], function (Backbone) {

    var Config = new Backbone.Model({
        baseUrl: 'http://localhost:8080',
        version: '1.0.0'

    });
    return Config;
});
