const url = "https://japceibal.github.io/japflix_api/movies-data.json";

document.addEventListener("DOMContentLoaded", async () => {
	const peliculas = await fetch(url).then((res) => res.json());

	document.getElementById("btnBuscar").addEventListener("click", () => {
		const search = document.getElementById("inputBuscar").value.toLowerCase();
		if (!search) return;

		const lista = document.getElementById("lista");
		let peliculasHtml = "";

		const filtrado = peliculas.filter((pelicula) => {
			if (
				pelicula.title.toLowerCase().includes(search) ||
				pelicula.overview.toLowerCase().includes(search) ||
				pelicula.tagline.toLowerCase().includes(search)
			)
				return true;

			for (let genre of pelicula.genres) {
				if (genre.name.toLowerCase().includes(search)) return true;
			}

			return false;
		});

		for (let pelicula of filtrado) {
			peliculasHtml += `
				<div class="offcanvas offcanvas-top text-black bg-dark" tabindex="-1" id="id${
					pelicula.id
				}" aria-labelledby="offcanvasExampleLabel">
					<div class="offcanvas-header">
						<h5 class="offcanvas-title" id="offcanvasExampleLabel">${pelicula.title}</h5>
						<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
					</div>
					<div class="offcanvas-body">
						<div>
							<p>${pelicula.overview}</p>
						</div>
						<hr>
						<p class="text-muted position-relative">${pelicula.genres.map((genre) => genre.name).join(" - ")}</p>
					</div>
					<div class="dropdown position-absolute bottom-0 end-0 mb-4 mx-2">
						<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
						More
						</button>
						<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
						<li><p>Year: <span class="float-end">${pelicula.release_date.split("-")[0]}</span></p></li>
						<li><p>Runtime: <span class="float-end">${pelicula.runtime} mins</span></p></li>
						<li><p>Budget: <span class="float-end">$${pelicula.budget}</span></p></li>
						<li><p>Revenue: <span class="float-end">$${pelicula.revenue}</span></p></li>
						</ul>
					</div>
				</div>
				<li class="border border-secondary position-relative px-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#id${
					pelicula.id
				}" aria-controls="offcanvasExample">
					<h5 class="text-white mt-2">${pelicula.title}</h5> 
					<div class="position-absolute top-0 end-0 mt-2 mx-2" id="${pelicula.title}"></div>
					<p class="text-muted">${pelicula.tagline}</p>
				</li>
			`;
		}

		lista.innerHTML = peliculasHtml;
		for (let pelicula of filtrado) {
			estrellas(pelicula.vote_average, pelicula.title);
		}
	});
});

function estrellas(cantidad, pelicula) {
	cantidad = Math.floor(cantidad / 2);
	for (let i = 1; i < 6; i++) {
		if (i <= cantidad) {
			document.getElementById(`${pelicula}`).innerHTML += `<span class="fa fa-star checked"></span>`;
		} else document.getElementById(`${pelicula}`).innerHTML += `<span class="fa fa-star white"></span>`;
	}
}
