# Chefkit - Frontend

Ce projet représente l'interface utilisateur (frontend) de l'application Chefkit, une plateforme dédiée aux recettes de cuisine. Il a été développé avec [Angular CLI](https://www.google.com/url?sa=E&q=https%3A%2F%2Fgithub.com%2Fangular%2Fangular-cli) version 19.2.17.

## Vue d'ensemble de l'application

Chefkit est une application de recettes de cuisine qui permet aux utilisateurs de découvrir, rechercher, consulter et gérer des recettes. Le frontend se connecte à une API RESTful (le backend) pour récupérer et afficher les informations.

## Démarrage rapide

Suivez ces étapes pour lancer l'application frontend sur votre machine locale.

### Prérequis

Assurez-vous d'avoir [Node.js](https://www.google.com/url?sa=E&q=https%3A%2F%2Fnodejs.org%2Fen%2Fdownload%2F) et [npm](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.npmjs.com%2Fget-npm) installés sur votre système.

### Lancement du serveur de développement

Pour démarrer le serveur de développement local, vous avez deux options :

* **Utiliser npm start (recommandé) :**

  codeBash

  ```
  npm start
  ```

  Cette commande est configurée pour lancer l'application en mode développement.
* **Utiliser ng serve :**

  codeBash

  ```
  ng serve
  ```

Une fois le serveur démarré, ouvrez votre navigateur et accédez à **http://localhost:4200/**. L'application se rechargera automatiquement chaque fois que vous modifiez l'un des fichiers source.

## Fonctionnalités principales

* **Recherche de recettes :** Trouvez facilement des recettes grâce à une barre de recherche intuitive.
* **Affichage détaillé des recettes :** Consultez les ingrédients, les étapes de préparation, les temps de cuisson, etc.
* **Gestion des ingrédients personnels :** L'utilisateur peut sauvegarder les ingrédients qu'il a chez lui dans une liste dédiée.
* **Suggestions de recettes personnalisées :** Basé sur les ingrédients sauvegardés par l'utilisateur, l'application suggère des recettes qu'il peut réaliser avec ce qu'il a déjà en stock.

## Compilation

Pour compiler le projet pour le déploiement (par exemple, pour une production) :

codeBash

```
ng build
```

Ceci compilera votre application et stockera les artefacts de construction dans le répertoire dist/. Par défaut, la compilation de production optimise votre application pour la performance et la vitesse.

## Ressources supplémentaires

Pour plus d'informations sur l'utilisation d'Angular CLI et le développement Angular, vous pouvez consulter :

* [Angular CLI Overview and Command Reference](https://www.google.com/url?sa=E&q=https%3A%2F%2Fangular.dev%2Ftools%2Fcli)
* [Documentation officielle d&#39;Angular](https://www.google.com/url?sa=E&q=https%3A%2F%2Fangular.dev%2F)

---
