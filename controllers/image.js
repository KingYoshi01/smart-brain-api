const Clarifai = require('clarifai');

const app = new Clarifai.App({
  // enter free API key after signing up on Clarifai
  apiKey: ''
});

const handleApiCall = () => (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    // If above .predict does not work comment it out and
    // uncomment below .predict out as server may be down
    // .predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Unable To Connect With API'))
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable To Get Entries'))
};

module.exports = {
  handleImage,
  handleApiCall
};
