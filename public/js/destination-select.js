const destinationSelect = document.querySelector('.destination-select select');
let destinationOptions = '';

packagesList.forEach((item => {
  packageCardsGallery += `
  <option value="${item.country}">${item.country}</option>`;
}));

destinationSelect.innerHTML = packageCardsGallery;
// console.log(packageCards);