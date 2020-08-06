const destinationSelect = document.querySelector('.destination-select select');

fetch('http://localhost:3000/api/regions')
  .then(response =>   {
    if (!response.ok) throw new Error('No data found');
    return response.json()})
  .then(regions => {
    regions.forEach(item => destinationSelect.innerHTML += `
    <option value="${item.RegionName}">${item.RegionName}</option>`)
  })