var logutil = require('log-util');

// declare new module to log the content type
var mimeTypes = {
    getMimeType: function (name) {
        var types = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.json': 'application/json',
            '.png': 'image/png'
        };
        var type=types[name];
        if(type) {
            console.log(type);
            logutil.debug(type);
        } else {
            logutil.debug('application/octet-stream');
        }
    }

};
// export module reference with all functions
module.exports = mimeTypes;