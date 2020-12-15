const data = require('../shared/deacon-data');

module.exports = async function (context, req) {
  try {
    const deacons = data.getDeacons();
    context.res.status(200).json(deacons);
  } catch (error) {
    context.res.status(500).send(error);
  }
};