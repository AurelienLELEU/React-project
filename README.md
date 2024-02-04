# React-project
Projet de Aurelien LELEU. Objectif du projet, recréer un site de vente en ligne en utilisant react, et supabase pour les bases de données.


Pour exécuter le projet en local, suivez ces étapes :


Clonez le dépôt sur votre machine locale :

    git clone https://github.com/AurelienLELEU/React-project


Placez-vous dans le sous-dossier React.


Installez les dépendances :

    npm install


Démarrez le serveur React :

    npm start


Structure du projet: 

- Navbar.js : Le composant de la barre de navigation, responsable de l'affichage du logo de l'application, d'un menu déroulant pour la sélection de la devise, d'une barre de recherche et de la liste des articles.
- Items.js : Contient deux composants : ItemList et Items. ItemList récupère et affiche une liste d'articles depuis la base de données Supabase. Items est un composant réutilisable représentant une carte individuelle d'article.
- Modal.js : Le composant de la fenêtre modale pour afficher des informations détaillées sur un article sélectionné (la modale est la petite fenetre qui s'ouvre quand vous cliquez sur un article).


Dépendances:

- React : Une bibliothèque JavaScript pour la construction d'interfaces utilisateur.
- Bootstrap : Utilisé pour le stylisme et la mise en page.
- Supabase JS : Un client JavaScript pour interagir avec la base de données Supabase.
- ExchangeRate-API : Utilisé pour récupérer les taux de change pour la conversion de devises.


Fonctionnalités:

- L'utilisateur peut filtrer les articles (de naniere reactive grace a react) à l'aide de la barre de recherche.
- Le menu déroulant de la devise permet à l'utilisateur de sélectionner sa devise préférée, et les prix des articles sont convertis en conséquence.
- En cliquant sur une carte d'article, une fenêtre modale s'ouvre avec des informations détaillées sur l'article sélectionné.


Améliorations Futures:

- Authentification des utilisateurs pour activer des fonctionnalités personnalisées.
- Posibilité d'ajouter des articles/supprimer des articles en base de données via une fenetre/modale
- Création d'un panier
