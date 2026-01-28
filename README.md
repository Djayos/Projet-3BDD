# Projet Express + 3 BDD (training)

Application projet avec Node.js et Express + intéraction avec 3 base de données (PostgreSQL, MongoDB et Redis)

## BDD :

- PostgreSQL est utilisé pour stocker les utilisateurs (données structurées et relationnel) + Table avec id, email, nom, date de création
- MongoDB est utilisé pour stocker les "actions" des users (ex : connexion, creation de compte)
- Redis est utilisé pour stocker des données temporaire et y avoir acces rapidement (ex : nombre de visites sur le site)

## Architecture :

- index.js : fichier principal avec toutes les routes vers les BDD
- dossier "DB" : contient les fichiers js de connexion aux 3 bases de données
- dossier "routes" : contient les différents endpoint des API sur les différentes BDD
- dossier "public" : interface web html / css pour visualiser les différentes interactions avec les BDD

Utilisation de docker desktop pour avoir des containers des 3 BDD difféentes
