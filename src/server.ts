import "dotenv/config"
import express from 'express';
import cors from 'cors';
import http from 'http';
import https from 'https';
import fs from 'fs';
import router from './routes/router';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

const runServer = (port: number, server: http.Server) => {
  server.listen(port, () => {
    console.log(`🚀 Server is runing at PORT ${port}`);
  });
}

const regularServer = http.createServer(app);

if(process.env.NODE_ENV === 'production') {
  //TODO: configurar SSL
  const options = {
    key: fs.readFileSync(process.env.SSL_KEY as string),
    cert: fs.readFileSync(process.env.SSL_CERT as string)
  }

  const secServer = https.createServer(options, app);
  //TODO: rodar server na porta 80 e na 443
  runServer(80, regularServer);
  runServer(443, secServer);
}
else {
  const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
  runServer(serverPort, regularServer);
}