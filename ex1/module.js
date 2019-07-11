/**
*   Auteur : Cédric Devost
*   Description : module de l'exercice 1 du TP1 de JS
*   Date : 2019-05-29
*/

/**
*   Module visiteursTableau
*
*   Sert pour la modification et la suppression des visiteurs dans le local storage
*
*   @return app : le module
*/
var visiteursTableau = (function(){
    app = {};
    
    app.leId = 0;
    
    /**
    *   @function modifier
    *
    *   @param int id : l'index de l'objet à modifier
    *
    *   sert à modifier le contenu d'un visiteur correspondant a un index donné
    */
    app.modifier = function(id){
        
        //récupération et désérialisation du contenu du localstaroage
        var lesVisiteurs = localStorage.getItem('visiteurs');
        lesVisiteurs = JSON.parse(lesVisiteurs);
        
        //rend le form visible
        modification.style.opacity = 1;

        //récupération des champs de saisies
        let nom = document.getElementById('modifNom');
        let prenom = document.getElementById('modifPrenom');
        let courriel = document.getElementById('modifCourriel');
        let modifId = document.getElementById('modifId');
        
        //affectation de la valeur dand les champs
        nom.value = lesVisiteurs[id].leNom;
        prenom.value = lesVisiteurs[id].lePrenom;
        courriel.value = lesVisiteurs[id].leCourriel;
        modifId.value = lesVisiteurs[id].id;
        
        let btnModifier = document.getElementById('modifier');
        
        //Si on click sur le bouton modifier, on modifie les valeurs du tableau et on le sérialise pour le renvoyer au localStorage
        btnModifier.addEventListener('click', function(){
            lesVisiteurs[id].leNom = nom.value;
            lesVisiteurs[id].lePrenom = prenom.value;
            lesVisiteurs[id].leCourriel = courriel.value;
            lesVisiteurs[id].id = modifId.value;
            
            localStorage.setItem("visiteurs", JSON.stringify(lesVisiteurs));
            
            //rafraichissement de la page pour que le tableau soit mis à jour
            location.reload();
        });
    };
    
    /**
    *   @function supprimer
    *
    *   @param int idSupprimer : l'index de l'objet à supprimer
    *
    *   sert à supprimer un visiteur correspondant a un index donné
    */
    app.supprimer = function(idSupprimer){
        var visiteurExistants = JSON.parse(localStorage.getItem("visiteurs"));
        
        delete visiteurExistants[idSupprimer];
        
        visiteurExistants.splice(idSupprimer, 1);
        
        //renvoie le tableau une fois modifier au localStorage
        localStorage.setItem("visiteurs", JSON.stringify(visiteurExistants));
        
        //rafraichissement de la page pour que le tableau soit mis à jour
        location.reload();
    };
    
    return app;
})();