// Fetch package database and form package cards on the main page.
fetch('http://localhost:3000/api/packages')
	.then(response => {
		if (!response.ok) throw new Error('No data found');
		return response.json();
  })
  .then(packages => {
    let randomPackage;

    let popularDestinations = '';

    for (i=0 ; i<3 ; i++) {
      randomPackage = packages.splice(Math.floor(Math.random()*packages.length), 1)
      popularDestinations += `
        <figure style="background-image: url('/images/${randomPackage[0].imageFile}')" class="location-card">
          <img src="" alt="Image of ${randomPackage[0].packageName}">
          <div class="destination-info center flex-column">
            <figcaption figcaption>${randomPackage[0].packageName}</figcaption>
            <div>Blue water and golden sands.</div>
            <a class="button" href="/VacPack.ejs#${randomPackage[0].Id}">BOOK NOW!</a>
          </div>  
        </figure>`
    }

    document.querySelector('.popular-destinations').innerHTML = popularDestinations;
  })