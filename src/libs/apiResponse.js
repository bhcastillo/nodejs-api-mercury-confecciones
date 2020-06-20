const apiResponse = (req, res, err, data) => {
  if (err) {
    res.status(500).json({
      error: err.message,
    });
  } else {
    if (data) {
      res.status(200).send({data});
    } else {
      res.status(404).send({
        message: `No existen datos en el API con tus parámetros de búsqueda.`,
      });
    }
  }
};

module.exports = apiResponse;
