require('../module');
// from here all the routing will handle and provide proper controller and models to them
exports.apply = function (app){	
    var apiBaseUrl = '/';
    app.all('*',$.setMyViews);
    app.get('/',$.controller('users').index); 
    app.post('/',$.controller('users').index); 
    app.get('/listing',$.controller('users').listing); 
};
