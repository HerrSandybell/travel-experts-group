
const vacpackages = document.querySelector('.vacpackages');

fetch('http://localhost:3000/api/packages')
	.then((response) => {
		if (!response.ok) throw new Error('No data found');
		return response.json();
  })
  .then((packages) => {
		for (let packagesList of packages) {
      vacpackages.innerHTML += `
        <figure> 
              <figcaption> ${packagesList.packageName}</figcaption>
               <img src="http://localhost:3000/images/${packagesList.imageFile}" width="600" height="600">
               <figcaption> Description: ${packagesList.packagedDescription} </figcaption> 
              <figcaption> Package Starting Price($): ${packagesList.packagePrice} </figcaption>
              <figcaption> Book By: ${packagesList.packageStartDate} </figcaption>
              <figcaption> Valid Until: ${packagesList.packageEndDate} </figcaption>
              <figcaption> Region : ${packagesList.RegionID} </figcaption>
              <figcaption> Commission: ${packagesList.packageAgencyComission} </figcaption>
      	 </figure> `;  
      		}
	})
	.catch(console.log(' error due to connection'));
  
  