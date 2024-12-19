document.addEventListener("DOMContentLoaded", () => {
  console.log("Connexion reussi plugin filtrePost");
  let filtre__bouton = document.querySelectorAll(".filtre__bouton button");
  // console.log(filtre__bouton);
  for (const element of filtre__bouton) {
    element.addEventListener("click", (evnt) => {
      const categorie = evnt.target.dataset.id;
      // console.log(categorie);
      extraireListeCours();

      function stripos(haystack, needle) {
        // Convertit les deux chaînes en minuscules.
        const Haystack = haystack.toLowerCase();
        const Needle = needle.toLowerCase();

        // Recherche la position de `needle` dans `haystack`
        return Haystack.indexOf(Needle);
      }

      function extraireListeCours() {
        fetch(
          `http://localhost/31w/wp-json/wp/v2/posts?categories=${categorie}&per_page=30`
        )
          // Conversion de la réponse en JSON
          .then((response) => response.json())
          .then((data) => {
            // Affiche les articles récupérés pour déboguer
            // console.log("Articles récupérés:", data);
            afficherArticles(data); // Appel à la fonction pour afficher les articles
          })
          .catch((error) =>
            console.error("Erreur lors de l’extraction des cours:", error)
          ); // En cas d’erreur }
      }

      function afficherArticles(articles) {
        // Sélectionne le conteneur où afficher les articles
        const conteneurCours = document.querySelector(".contenu__restapi");
        // console.log(conteneurCours);

        conteneurCours.innerHTML = "";

        // Pour chaque article, crée un élément HTML pour l’afficher
        articles.forEach((article) => {
          // Crée un nouvel élément div pour chaque article
          const item = document.createElement("a");
          item.className = "destinations-item"; // Ajoute une classe pour la mise en forme
          item.href = article.link;
          const titre = article.title;
          // console.log(titre.rendered);
          item.textContent = titre.rendered;
          // Ajoute le div créé dans le conteneur des cours
          conteneurCours.appendChild(item);
        });
      }
    });
  }
});
