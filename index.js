$(() => {
  // Fonction de positionnement aléatoire des cartes
  const randomCards = () => {
    $(".card").each(function () {
      let randomPos = Math.floor(Math.random() * 12);
      $(this).css("order", randomPos);
    });
  };

  randomCards();

  // Initialisation des variables
  let currentClickCpt = 0;
  let dataImageShowed = "";
  let findedCard = 0;
  let strokeCpt = 0;

  // Ajout de l'event 'onclick' sur chaque carte
  $(".card").click((event) => {
    // J'empêche de comptabiliser le clic sur une carte déjà trouvée
    if ($(event.currentTarget).hasClass("finded")) {
      return;
    }
    currentClickCpt++; // J'incrémente le compteur de clic de 1
    // Premier clic :
    if (currentClickCpt === 1) {
      // je cache les images visibles (et non trouvées)
      $(".card").each(function () {
        if (!$(this).hasClass("finded")) {
          $(this).addClass("hide").removeClass("clicked");
        }
      });
      // je stocke la data-image de la carte retournée dans la variable 'dataImageShowed'
      dataImageShowed = $(event.currentTarget).attr("data-image");
      // et je retourne la carte cliquée + je la marque 'clicked'
      $(event.currentTarget).removeClass("hide").addClass("clicked");
      // Deuxième clic :
    } else if (currentClickCpt === 2) {
      // j'empêche de pouvoir cliquer sur une carte marquée 'clicked'
      if ($(event.currentTarget).hasClass("clicked")) {
        currentClickCpt = 1; // si c'est le cas, je laisse mon compteur à 1
      } else {
        // je retourne la carte cliquée + je la marque 'clicked'
        $(event.currentTarget).removeClass("hide").addClass("clicked");
        // et je vérifie si l'image a été trouvée en comparant la data-image et 'dataImageShowed'
        if (dataImageShowed === $(event.currentTarget).attr("data-image")) {
          // si c'est le cas
          $(".card").each(function () {
            if (!$(this).hasClass("hide")) {
              // et si les cartes sont retournées, je les marque 'finded'
              $(this).addClass("finded");
            }
          });
          findedCard++; // J'incrémente le nombre de paires trouvées
          if (findedCard === 10) {
            endOfGame();
          }
        }
        // Après 2 clics, j'incrémente le nombre de coups
        strokeCpt++;
        $("#stroke-number").text(strokeCpt);
        // et je remets mes variables à zéro pour le prochain tour
        currentClickCpt = 0;
        dataImageShowed = "";
      }
    }
  });

  // Fin de jeu
  const endOfGame = () => {
    setTimeout(() => {
      // J'affiche le message de fin de jeu au bout de 0.5s
      $("#win-text").css("visibility", "visible");
    }, "500");
  };
});
