const packageCards = document.querySelector('.package-cards-gallery');
let packageCardsGallery = '';

packagesList.forEach((item => {
  packageCardsGallery += `
  <i href="">
    <figure style="background-image: url('http://localhost:3000/images/${item.imageFile}')">
      <img src="" alt="Image of ${item.packageName}">
      <figcaption>
        <div>${item.country}<span class="price">$${item.packagePrice}+</span></div>
      </figcaption> 
    </figure>
  </i>`;
}));

packageCards.innerHTML = packageCardsGallery;
console.log(packageCards);