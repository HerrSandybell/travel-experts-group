const destinationSelect = document.querySelector('.destination-select select');

// Fetch regions DB and populate the region select menu
fetch('http://localhost:3000/api/regions')
  .then(response =>   {
    if (!response.ok) throw new Error('No data found');
    return response.json()})
  .then(regions => {
    regions.forEach(item => destinationSelect.innerHTML += `
    <option value="${item.RegionName}">${item.RegionName}</option>`)
  })