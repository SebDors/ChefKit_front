# Chefkit - Frontend

Ce projet représente l'interface utilisateur (frontend) de l'application Chefkit, une plateforme dédiée aux recettes de cuisine. Il a été développé avec [Angular CLI](https://github.com/angular/angular-cli) version 19.2.17.

## Table des Matières

- [Chefkit - Frontend](#chefkit---frontend)
  - [Vue d&#39;ensemble de l&#39;application](#vue-densemble-de-lapplication)
  - [Démarrage rapide](#démarrage-rapide)
    - [Prérequis](#prérequis)
    - [Lancement du serveur de développement](#lancement-du-serveur-de-développement)
  - [Données de Test](#données-de-test)
    - [Aperçu des données](#aperçu-des-données)
    - [Utilisateurs de test](#utilisateurs-de-test)
  - [Fonctionnalités principales](#fonctionnalités-principales)
  - [Compilation](#compilation)
  - [Ressources supplémentaires](#ressources-supplémentaires)

## Vue d'ensemble de l'application

**Chefkit** est une application de recettes de cuisine qui permet aux utilisateurs de découvrir, rechercher, consulter et gérer des recettes. Le frontend se connecte à une API RESTful (le backend) pour récupérer et afficher les informations.

## Démarrage rapide

Suivez ces étapes pour lancer l'application frontend sur votre machine locale.

### Prérequis

Assurez-vous d'avoir **[Node.js](https://nodejs.org/en/download/)** et **[npm](https://www.npmjs.com/get-npm)** installés sur votre système.

### Installation

Pour installer les dépendances du projet, exécutez la commande suivante :

```bash
npm install
```

### Lancement du serveur de développement

Pour démarrer le serveur de développement local, vous avez deux options :

- **Utiliser `npm start` (recommandé) :**

  ```bash
  npm start
  ```

  Cette commande est configurée pour lancer l'application en mode développement.

- **Utiliser `ng serve` :**

  ```bash
  ng serve
  ```

Une fois le serveur démarré, ouvrez votre navigateur et accédez à **http://localhost:4200/**. L'application se rechargera automatiquement chaque fois que vous modifiez l'un des fichiers source.

## Données de Test

Pour tester l'application, la base de données du backend est pré-remplie avec un jeu de données complet.

### Aperçu des données

- **Ingrédients :** Une liste variée d'ingrédients est incluse, couvrant des catégories comme les fruits, les légumes et autres produits de base.
- **Recettes :** Plusieurs recettes sont disponibles, allant de plats simples comme l'Avocado Toast à des plats plus complexes comme les Lasagnes végétariennes.
- **Frigos Utilisateurs :** Les frigos de certains utilisateurs sont pré-remplis pour permettre de tester la fonctionnalité de suggestion de recettes.

### Utilisateurs de test

Vous pouvez utiliser les comptes suivants pour vous connecter à l'application et tester les différentes fonctionnalités.

| Nom d'utilisateur | Mot de passe | Rôle  | Description                                                          |
| ----------------- | ------------ | ----- | -------------------------------------------------------------------- |
| `seb`             | `password`   | admin | Compte administrateur avec tous les droits.                          |
| `margault`        | `password`   | admin | Compte administrateur avec tous les droits.                          |
| `camille`         | `password`   | admin | Compte administrateur avec tous les droits.                          |
| `test`            | `password`   | user  | Compte utilisateur standard pour tester les fonctionnalités de base. |

## Fonctionnalités principales

- **Recherche de recettes :** Trouvez facilement des recettes grâce à une barre de recherche intuitive.
- **Affichage détaillé des recettes :** Consultez les ingrédients, les étapes de préparation, les temps de cuisson, etc.
- **Gestion des ingrédients personnels :** L'utilisateur peut sauvegarder les ingrédients qu'il a chez lui dans une liste dédiée.
- **Suggestions de recettes personnalisées :** Basé sur les ingrédients sauvegardés par l'utilisateur, l'application suggère des recettes qu'il peut réaliser avec ce qu'il a déjà en stock.

## Ressources supplémentaires

Pour plus d'informations sur l'utilisation d'Angular CLI et le développement Angular, vous pouvez consulter :

- **[Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)**
- **[Documentation officielle d&#39;Angular](https://angular.dev/)**
