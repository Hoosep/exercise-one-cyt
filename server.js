const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/sort-numbers', (req, res) => {
  const { body } = req;
  const { numbers } = body;

  let numberSorterAsc = numbers.sort((a, b) => a - b).toString();
  let numberSorterDesc = numbers.sort((a, b) => b - a).toString();
  
  res.json({
    numberSorterAsc,
    numberSorterDesc,
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));