const data = {
    deacons: [
      {
        id: 1,
        year: 2020,
        month: 1,
        deaconId: 3,
        name: 'Van Van Lowe',
      },
      {
        id: 2,
        year: 2020,
        month: 2,
        deaconId: 4,
        name: 'Rob Jinks',
      },
      {
        id: 3,
        year: 2020,
        month: 3,
        deaconId: 2,
        name: 'Jim Niece',
      },
      {
        id: 4,
        year: 2020,
        month: 4,
        deaconId: 5,
        name: 'John Stolnis',
      },
      {
        id: 5,
        year: 2020,
        month: 5,
        deaconId: 4,
        name: 'Rob Jinks',
      },
      {
        id: 6,
        year: 2020,
        month: 6,
        deaconId: 3,
        name: 'Van Van Lowe',
      },
    ],
  };
  
  const getRandomInt = () => {
    const max = 1000;
    const min = 100;
    return Math.floor(Math.random() * Math.floor(max) + min);
  };
  
  const adddeacon = (deacon) => {
    deacon.id = getRandomInt();
    data.deacons.push(deacon);
    return deacon;
  };
  
  const updatedeacon = (deacon) => {
    const index = data.deacons.findIndex((v) => v.id === deacon.id);
    console.log(deacon);
    data.deacons.splice(index, 1, deacon);
    return deacon;
  };
  
  const deletedeacon = (id) => {
    const value = parseInt(id, 10);
    data.deacons = data.deacons.filter((v) => v.id !== value);
    return true;
  };
  
  const getDeacons = () => {
    return data.deacons;
  };
  
  module.exports = { adddeacon, updatedeacon, deletedeacon, getDeacons };
  