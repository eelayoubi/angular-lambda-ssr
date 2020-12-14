
const path = require('path')
const serverless = require('serverless-http');
const minify = require('html-minifier').minify;

const { app } = require("./dist/angular-lambda-ssr/serverless/main");

const handle = serverless(app, {
    provider: 'aws',
    type: 'lambda-edge-origin-request'
});

const handler = async (event, context, callback) => {
    const request = event.Records[0].cf.request;


    if ((!path.extname(request.uri)) || (request.uri === '/index.html')) {
        const response = await handle(event, context);
        let minified = minify(response.body, {
            caseSensitive: true,
            collapseWhitespace: true,
            preserveLineBreaks: true,
            removeAttributeQuotes: true,
            removeComments: true
        });
        console.log('response: ', response)
        callback(null, {
            status: response.status,
            statusDescription: response.statusDescription,
            headers: {
                ...response.headers,
            },
            body: minified,
            bodyEncoding: response.bodyEncoding
        });
    } else {
        console.log(`${request.uri} directly served from S3`)
        return request;
    }

}

exports.handler = handler;