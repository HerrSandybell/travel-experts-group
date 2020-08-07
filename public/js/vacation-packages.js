const vacPackages = document.querySelector('.vac-packages');

fetch('http://localhost:3000/api/packages')
	.then((response) => {
		if (!response.ok) throw new Error('No data found');
		return response.json();
  })
  .then((packages) => {
		for (let packagesList of packages) {
      vacPackages.innerHTML += `
        <figure class="package-container" id="${packagesList.Id}"> 
          <div style="background-image: url('http://localhost:3000/images/${packagesList.imageFile}')"><img src="" width="300" height="300"></div>
          <figcaption>
            <h2>${packagesList.packageName}</h2>
            <p class="description">${packagesList.packagedDescription}</p> 
            <p class="duration-price">${packagesList.duration} nights for <span class="price">$${packagesList.packagePrice}.</span></p>
            <p><span>Book By:</span> ${packagesList.packageStartDate}</p>
            <p><span>Valid Until:</span> ${packagesList.packageEndDate}</p>
            <button class="button">BOOK NOW!</button>
          </figcaption>
      	</figure>`;  
    }
	})
	.catch(console.log(' error due to connection'));
  
  