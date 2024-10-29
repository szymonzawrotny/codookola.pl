
const convert = (query) => {

  return new Promise((resolve, reject) => {

    fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(query)}&apiKey=${process.env.HERE_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.items && data.items.length > 0) {
          const location = data.items[0].position; 
          const lat = location.lat; 
          const lng = location.lng; 
          console.log(`Latitude: ${lat}, Longitude: ${lng}`);
          resolve({ lat, lng }); 
        } else {
          reject({lat:"brak",lng:"brak"});
        }
      })
      .catch(error => reject(`Błąd: ${error}`));
  });
};

export {convert}