<<<<<<< HEAD
# n8n-nodes-blogger
=======
# Guide d'utilisation du nœud n8n pour Blogger

Ce document explique comment installer et utiliser le nœud n8n pour Blogger.com dans vos workflows d'automatisation.

## Installation

Pour installer ce nœud dans votre instance n8n, suivez ces étapes :

1. Installez le package via npm :
   ```
   npm install n8n-nodes-blogger
   ```

2. Redémarrez votre instance n8n.

## Configuration des credentials

Le nœud Blogger prend en charge deux méthodes d'authentification :

### API Key
1. Allez sur la [Console Google Cloud](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API Blogger v3 dans la bibliothèque d'API
4. Créez une clé API dans la section "Identifiants"
5. Dans n8n, créez une nouvelle credential de type "Blogger API" et sélectionnez "API Key"
6. Entrez votre clé API dans le champ correspondant

### OAuth2
1. Allez sur la [Console Google Cloud](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API Blogger v3 dans la bibliothèque d'API
4. Créez un ID client OAuth 2.0 dans la section "Identifiants"
5. Configurez les URI de redirection autorisés pour inclure l'URL de callback de votre instance n8n
6. Dans n8n, créez une nouvelle credential de type "Blogger API" et sélectionnez "OAuth2"
7. Suivez les instructions pour autoriser l'accès à votre compte Blogger

## Ressources et opérations disponibles

### Blogs
- **Get** : Récupérer un blog par son ID
- **Get by URL** : Récupérer un blog par son URL
- **List** : Lister les blogs d'un utilisateur

### Posts
- **Create** : Créer un nouveau post
- **Get** : Récupérer un post par son ID
- **List** : Lister les posts d'un blog
- **Update** : Mettre à jour un post existant
- **Delete** : Supprimer un post
- **Search** : Rechercher des posts par mots-clés
- **Publish** : Publier un post en mode brouillon

### Commentaires
- **Get** : Récupérer un commentaire par son ID
- **List** : Lister les commentaires d'un post
- **List by Blog** : Lister tous les commentaires d'un blog
- **Approve** : Approuver un commentaire
- **Mark as Spam** : Marquer un commentaire comme spam
- **Remove Content** : Supprimer le contenu d'un commentaire

## Gestion des labels

Les labels sont gérés comme des attributs des posts. Lors de la création ou de la mise à jour d'un post, vous pouvez spécifier une liste de labels séparés par des virgules dans le champ "Labels".

## Exemples d'utilisation

### Exemple 1 : Créer un nouveau post

1. Ajoutez le nœud Blogger à votre workflow
2. Sélectionnez la ressource "Post" et l'opération "Create"
3. Configurez les champs suivants :
   - Blog ID : l'ID de votre blog
   - Title : le titre du post
   - Content : le contenu du post
   - Labels : les labels séparés par des virgules (optionnel)
4. Dans les champs additionnels, vous pouvez définir le statut du post (brouillon, publié, programmé)

### Exemple 2 : Lister les derniers commentaires d'un blog

1. Ajoutez le nœud Blogger à votre workflow
2. Sélectionnez la ressource "Comment" et l'opération "List by Blog"
3. Configurez le champ "Blog ID" avec l'ID de votre blog
4. Dans les champs additionnels, vous pouvez définir le nombre maximum de résultats à retourner

## Dépannage

Si vous rencontrez des problèmes avec le nœud Blogger, vérifiez les points suivants :

1. Assurez-vous que vos credentials sont correctement configurées
2. Vérifiez que l'API Blogger v3 est activée dans votre projet Google Cloud
3. Pour les opérations nécessitant une authentification utilisateur, assurez-vous d'utiliser OAuth2
4. Consultez les logs de n8n pour plus de détails sur les erreurs éventuelles

## Ressources supplémentaires

- [Documentation de l'API Blogger v3](https://developers.google.com/blogger/docs/3.0/getting_started)
- [Console Google Cloud](https://console.cloud.google.com/)
- [Documentation n8n](https://docs.n8n.io/)
>>>>>>> 88e7311 (Initial commit)
