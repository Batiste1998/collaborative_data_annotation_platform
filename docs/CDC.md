# Plateforme collaborative d'annotation de données

## Contexte et utilité

- De nombreuses entreprises et laboratoires ont besoin de jeux de données annotés (images, textes, sons...) pour entraîner des modèles de Machine Learning.
- L'annotation est souvent fastidieuse et nécessite une plateforme où plusieurs personnes peuvent collaborer en temps réel ou asynchrone, tout en maintenant la qualité et la cohérence des données.

## Fonctionnalités possibles

1. Gestion de projets et de jeux de données
    - Création de projets (exemple: "Classification d'images de fruits", "Analyse de sentiments de tweets", etc.).
    - Import de datasets (images, fichiers audio, textes, etc.).
2. Interface d'annotation avancée
    - Outils pour dessiner des bounding boxes, polygon masks; highlights de texte, sélection de mots-clés...
    - Possibilité d'ajouter des métadonnées (labels multiples, niveaux de confiance, etc.).
3. Collaboration en équipe
    - Assignation des tâches : qui annote quel lot de données ?
    - Suivi d'avancement en temps réel (nombres d'images/textes annotés, stats de progression...).
    - Système de commentaires et de discussion (exemple : "Je pense que ce fruit est mal classé", etc).
4. Contrôle de qualité et validations
    - Double ou triple annotation (plusieurs personnes annotent la même donnée pour vérifier la cohérence).
    Statistiques de fiabilité par annotateur, mesure des écarts de label.
    - Workflow de relecture/validation pour repérer et corriger les désaccords.
5. Export et intégration ML
    - Export des annotations dans divers formats (COCO, Pascal VOC, CSV, JSON, etc.).
    - Intégration possible avec des frameworks de ML (TensorFlow, PyTorch) pour un pipeline complet.
6. Tech Stack
    - **Front-end** : React (avec des librairies de dessin pour l'annotation, exemple : fabric.js, Konva.js...).
    - **Back-end** : Node.js (Express).
    - **Base de données** : NoSQL (MongoDB avec l'ODM Mongoose) pour stocker les métadonnées et les fichiers (ou l'URL si on stock en S3).
    - **Temps réel** : Socket.IO / WebSockets pour la collaboration ou un système de notifications.
    - **Déploiement** : Docker + un hébergement cloud (VPS OVH).

## Pourquoi c'est challengeant ?

- **Complexité UI** : interface riche et réactive.
- **Collaboration & workflow** : mécanisme de répartition des tâches, contrôle de qualité, synchronisation en temps réel.
- **Evolutivité** : l'application doit supporter potentiellement plusieurs milliers de données et utilisateurs.
- **Utilité** : ce type d'outil est très recherché par les entreprises et laboratoires travaillant en data science