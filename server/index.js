import express from 'express';
import bodyParser from 'body-parser'
import {Server} from 'http'
import webpack from 'webpack'
import webpackConfig from '../webpack.config'
import WebpackMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'
import socketIo from 'socket.io'

const app = express();
const server = Server(app);

const compiler = webpack(webpackConfig);
app.use(
    WebpackMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath
    })
);
app.use(WebpackHotMiddleware(compiler));
app.use(bodyParser.json());

app.post('/sensor', async function(req, res) {
    try {
        if (!req.query.sesor) {
            res.send(500,"Invalid post");
            return;
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({status: "error", error: err.toString()})
    }
})

app.use(express.static('public'));

const io = socketIo(server);
server.listen(3080, () => {
    console.log('listening on port 3080!');
});

