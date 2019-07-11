/**
*   Auteur : Cédric Devost
*   Description : Fichier scripts.js de l'exercice 1 du TP1 de JS
*   Date : 2019-05-29
*/

//Au chargement de la page, ce code s'exécute
window.onload = function(){
    var annuler = document.getElementById('annuler');
    var sauver = document.getElementById('sauver');
    
    var prenom = document.getElementById('prenom');
    var nom = document.getElementById('nom');
    var courriel = document.getElementById('courriel');
    
    var table = document.getElementById('visiteurs');
    var lesVisiteurs = localStorage.getItem('visiteurs');
    
    //cache la table d'affichage si le contenu du localStorage est vide
    //va afficher le contenu du localStorage sinon
    if(!lesVisiteurs || JSON.parse(lesVisiteurs).length == 0){
       table.style.opacity = 0;
    }
    else{
        listerVisiteurs();
    }
    
    var modification = document.getElementById('modification');
    
    //met le formulaire de modification invisible au chargement
    modification.style.opacity = 0;
    
    var modifier = document.getElementById('modifier');
    
    //quand on clique sur le bouton annuler, on vide les champs
    annuler.addEventListener('click', function(){
        prenom.value = "";
        nom.value = "";
        courriel.value = "";
    });
    
    //quand on clique sur le bouton sauver, on exécute ce code
    sauver.addEventListener('click', function(){
        
        //vérification que les champs sont remplis
        //affichage d'un message d'erreur et focus sur le champs si ce n'est pas le cas
        if(prenom.value == ""){
            alert('Veuillez entrer un prénom SVP.');
            prenom.focus();
        }
        else if(nom.value == ""){
            alert('Veuillez entrer un nom SVP.');
            nom.focus();
        }
        else if(courriel.value == ""){
            alert('Veuillez entrer un courriel SVP.');
            courriel.focus();
        }
        
        //si tout est rempli on exécute ce code
        else{
            var visiteurExistants = JSON.parse(localStorage.getItem("visiteurs"));
            
            //si le localstorage est vide, on instancie un tableau
            if(visiteurExistants == null){
                visiteurExistants = [];
            }
            
            //sinon, on modifie la valeur de la variable leId du module pour correspondre à l'id du dernier visiteur en liste
            else if(visiteurExistants.length > 0){
                visiteursTableau.leId = visiteurExistants[visiteurExistants.length - 1].id;
            }
            
            //incrémentation de l'id
            visiteursTableau.leId++;
            
            //instanciation du nouveau visiteur
            var nouveauVisiteur = {id : visiteursTableau.leId, leNom : nom.value, lePrenom : prenom.value, leCourriel : courriel.value};

            //ajout du nouveau visiteur à la liste des visiteurs existants
            visiteurExistants.push(nouveauVisiteur);
            
            //ajout au local storage de la liste modifiée
            localStorage.setItem("visiteurs", JSON.stringify(visiteurExistants));
            
            //on lance la fonction d'affichage des visiteurs
            listerVisiteurs();
        }              
    });
    
    /**
    *   @function listerVisiteurs
    *
    *   sert à récupérer les données en localStorage pour les afficher dans une table html   
    */
    function listerVisiteurs(){
        lesVisiteurs = localStorage.getItem('visiteurs');
        
        //réinitialisation du contenu de la table html
        table.innerHTML = '<tr><th>ID</th><th>Prénom</th><th>Nom</th><th>Courriel</th><th>Actions</th><th></th></tr>';
        
        //vérifie que le localStorage n'Est pa vide
        if(lesVisiteurs){
            
            //désérialisation du contenu du localstrage
            let visiteursParse = JSON.parse(lesVisiteurs);
            
            //boucle d'affichage qui créera les éléements du dom nécessaires à l'Affichage
            for(let i = 0; i < visiteursParse.length ; i++){
                var tr = document.createElement("tr");
                
                //id
                var tdId = document.createElement("td");
                var nodeId = document.createTextNode(visiteursParse[i].id);
                tdId.appendChild(nodeId);
                
                //prenom
                var tdPrenom = document.createElement("td");
                var nodePrenom = document.createTextNode(visiteursParse[i].lePrenom);
                tdPrenom.appendChild(nodePrenom);
                
                //nom
                var tdNom = document.createElement("td");
                var nodeNom = document.createTextNode(visiteursParse[i].leNom);
                tdNom.appendChild(nodeNom);
                
                //courriel
                var tdCourriel = document.createElement("td");
                var nodeCourriel = document.createTextNode(visiteursParse[i].leCourriel);
                tdCourriel.appendChild(nodeCourriel);
                
                //lien modifier
                var tdModifier = document.createElement("td");
                
                //fait l'appel à la fonction modifier du module et lui envoie l'index a modifier, grâce au onlcick
                tdModifier.innerHTML = '<a href="#Modifier" title="Modifier" onclick="visiteursTableau.modifier(' + i + ');">Modifier</a>';
                
                //lien supprimer
                var tdSupprimer = document.createElement("td");
                
                //fait l'appel à la fonction supprimer du module et lui envoie l'index a supprimer, grâce au onlcick
                tdSupprimer.innerHTML = '<a href="#" title="Modifier" onclick="visiteursTableau.supprimer(' + i + '); this;">Supprimer</a>';
                
                //insertion dans le DOM de tout ce qui vient d'être rempli
                tr.appendChild(tdId);
                tr.appendChild(tdPrenom);
                tr.appendChild(tdNom);
                tr.appendChild(tdCourriel);
                tr.appendChild(tdModifier);
                tr.appendChild(tdSupprimer);
                
                table.appendChild(tr);
            }
            
            //on met la table html visible maintenant qu'Elle est remplie
            table.style.opacity = 1;
        }
    }
};