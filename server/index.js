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
const io = socketIo(server);

const compiler = webpack(webpackConfig);

let sensorData = null;

app.use(bodyParser.json());

app.use(
    WebpackMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath
    })
);
app.use(WebpackHotMiddleware(compiler));

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', { sensorData: sensorData})
})


app.post('/sensor', async function(req, res) {
    try {
      if (!req.body.data) {
          res.status(500).send("Invalid post");
          return;
      }
      console.log("Received sensor data", req.body.data)
      sensorData = req.body.data
      io.emit('sensor-data', sensorData)
      res.status(200).send({status: 'OK'})
    }
    catch (err) {
        console.log(err);
        res.status(500).send({status: "error", error: err.toString()})
    }
})

app.use(express.static('public'));

server.listen(3090, () => {
    console.log('listening on port 3080!');
});

