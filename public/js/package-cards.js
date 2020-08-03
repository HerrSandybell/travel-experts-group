const packageCards = document.querySelector('.package-cards-gallery');
let packageCardsGallery = '';

packagesList.forEach((item => {
  packageCardsGallery += `
  <i href="">
    <figure>
      <img src="http://localhost:3000/images/${item.imageFile}" alt="Image of ${item.packageName}">
      <figcaption>
        <div>${item.country}</div>
        <div>Starting from\n${item.packagePrice}</div>
      </figcaption> 
    </figure>
  </i>`;
}));

packageCards.innerHTML = packageCardsGallery;
console.log(packageCards);