document.addEventListener("DOMContentLoaded", () => {
  console.log("Connexion réussie plugin filtrePays");

  let filtreBoutons = document.querySelectorAll(".filtre__bouton button");

  for (const element of filtreBoutons) {
    element.addEventListener("click", (evnt) => {
      const pays = evnt.target.dataset.pays;
      extraireListeDestinations(pays);

      function extraireListeDestinations(pays) {
        const url = `${
          window.location.origin
        }/31w/wp-json/wp/v2/posts?search=${encodeURIComponent(
          pays
        )}&per_page=30`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            // Filtrer les données pour exclure l'ID 196 (la galerie d'image)
            const filteredData = data.filter((post) => post.id !== 196);
            afficherDestinations(filteredData);
          })
          .catch((error) =>
            console.error(
              "Erreur lors de l'extraction des destinations:",
              error
            )
          );
      }

      function afficherDestinations(destinations) {
        const conteneur = document.querySelector(".contenu__restapi");
        conteneur.innerHTML = "";

        destinations.forEach((destination) => {
          const item = document.createElement("div");
          item.className = "destination-item";

          const titre = document.createElement("h3");
          titre.className = "destination-titre";
          titre.textContent = "> " + destination.title.rendered;

          const description = document.createElement("div");
          description.className = "destination-description";
          description.innerHTML = destination.excerpt.rendered;
          description.style.display = "none";

          titre.addEventListener("click", () => {
            if (description.style.display === "none") {
              description.style.display = "block";
            } else {
              description.style.display = "none";
            }
          });

          item.appendChild(titre);
          item.appendChild(description);
          conteneur.appendChild(item);
        });
      }
    });
  }
});
