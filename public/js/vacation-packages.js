const vacPackages = document.querySelector('.vacpackages');

packagesList.forEach((packagesList) => {
  vacPackages.innerHTML += `
  <figure> 
        <figcaption> ${packagesList.packageName}</figcaption>
         <img src="http://localhost:3000/images/${packagesList.imageFile}" width="600" height="600">
        <figcaption> Description: ${packagesList.packagedDescription} </figcaption> 
        <figcaption> Package Starting Price($): ${packagesList.packagePrice} </figcaption>
        <figcaption> Book By: ${packagesList.packageStartDate} </figcaption>
        <figcaption> Valid Until: ${packagesList.packageEndDate} </figcaption>
	 </figure> `;
});