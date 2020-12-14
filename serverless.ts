import 'zone.js/dist/zone-node';
import { join } from 'path';
import * as  fs from 'fs';
import { renderModule, AppServerModule } from './src/main.server';
import * as express from 'express';

export const app = express();

const distFolder = join(process.cwd(), 'dist/angular-lambda-ssr/browser');

app.set('view engine', 'html');
app.set('views', distFolder);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('*.*', express.static(distFolder, {
    maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
    fs.readFile(join(__dirname, '../browser/index.html'), function (err, html) {
        if (err) {
            throw err;
        }

        renderModule(AppServerModule, {
            document: html.toString(),
            url: req.url
        }).then((html) => {
            res.send(html);
        });
    });

});

export * from './src/main.server';