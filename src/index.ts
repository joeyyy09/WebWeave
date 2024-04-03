import express from 'express';
import cors from 'cors';
import {generate} from '../utils/generate';
import simpleGit from 'simple-git';
import { getAllFiles } from '../utils/getAllFiles';
import { uploadFile } from '../utils/uploadFile';


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/deploy', async (req, res) => {
    const repoUrl = req.body.repoUrl;
    console.log(repoUrl);
    const id = generate();
    await simpleGit().clone(repoUrl, `output/${id}`);
    res.json({id: id});

    const files = getAllFiles(`output/${id}`)
    files.forEach(async file => {
      console.log(file);
      await uploadFile(file.slice(__dirname.length + 1), file);
    } )  
    console.log(files);
});



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

