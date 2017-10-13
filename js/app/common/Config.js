define(['backbone'], function (Backbone) {

    var Config = new Backbone.Model({
        baseUrl: 'http://localhost:8080/infoskyalp',
        version: '1.0.0'

    });
    return Config;
});
