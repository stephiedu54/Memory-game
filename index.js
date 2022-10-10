$(() => {
  // Initialisation des variables
  let currentClickCpt = 0;
  let dataImageShowed = "";

  // Ajout de l'event onclick sur la carte
  $(".card").click((event) => {
    currentClickCpt++;

    if (currentClickCpt === 1) {
      // Premier clic
      // Je cache les images retournées (et non trouvées) avant
      $(".card").each(function () {
        if (!$(this).hasClass("finded")) {
          $(this).addClass("hide");
        }
      });
      // Je stocke la data-image de la carte
      dataImageShowed = $(event.currentTarget).attr("data-image");
      // Je retourne la carte
      $(event.currentTarget).removeClass("hide");
    } else if (currentClickCpt === 2) {
      // Deuxième clic
      // Je vérifie si l'image a été trouvé
      $(event.currentTarget).removeClass("hide");
      if (dataImageShowed === $(event.currentTarget).attr("data-image")) {
        // si l'image a été trouvé
        $(".card").each(function () {
          if (!$(this).hasClass("hide")) {
            // et si les cartes sont retournées, je les marque finded
            $(this).addClass("finded");
          }
        });
      }

      currentClickCpt = 0;
      dataImageShowed = "";
    }
  });
});
