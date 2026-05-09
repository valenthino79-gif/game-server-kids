# 🎮 Game Server Kids

Un serveur de jeux éducatifs et amusants pour enfants avec plusieurs mini-jeux!

## 🎮 Jeux disponibles

### 1. 🧩 Memory Puzzle
- Trouvez les paires d'images identiques
- Testez votre mémoire
- Système de score basé sur le nombre de mouvements

### 2. 🚶 Platformer Jump
- Saute et évite les obstacles
- Utilise les flèches directionnelles et la barre d'espace
- Gagne des points en évitant les obstacles

### 3. 🧠 Quiz Smart
- Questions éducatives variées
- Quiz sur les mathématiques et la logique
- 10 questions pour tester vos connaissances

## 🚀 Comment démarrer

1. **Clonez le dépôt**
```bash
git clone https://github.com/valenthino79-gif/game-server-kids.git
cd game-server-kids
```

2. **Ouvrez `index.html` dans votre navigateur**
```bash
open index.html
# ou
start index.html
```

3. **Ou utilisez un serveur local**
```bash
python -m http.server 8000
# Puis visitez http://localhost:8000
```

## 📁 Structure du projet

```
game-server-kids/
├── index.html           # Page principale
├── styles/
│   └── main.css         # Styles globaux
└── js/
    ├── main.js          # Logique principale
    ├── puzzle.js        # Jeu Memory Puzzle
    ├── platformer.js    # Jeu Platformer
    └── quiz.js          # Jeu Quiz
```

## 🎯 Fonctionnalités

- ✅ Interface colorée et ludique
- ✅ Animations fluides
- ✅ Sauvegarde des scores (localStorage)
- ✅ Responsive et adapté aux enfants
- ✅ Pas de dépendances externes
- ✅ Compatible tous navigateurs modernes

## 🎨 Personnalisation

Vous pouvez facilement:
- Ajouter de nouveaux jeux
- Modifier les questions du quiz
- Changer les couleurs et les thèmes
- Ajouter des sons et des animations

## 📱 Contrôles

### Memory Puzzle
- Clic sur les cartes pour les retourner
- Trouvez les paires identiques

### Platformer Jump
- `← →` : Se déplacer
- `ESPACE` : Sauter
- Évitez les obstacles rouges 🔥

### Quiz Smart
- Clic sur la bonne réponse
- Répondez à 10 questions

## 📊 Scores

Tous les scores sont sauvegardés localement dans votre navigateur.
Consultez la section "Scores" pour voir vos meilleures performances.

## 🔒 Sécurité

Les données sont stockées localement sur votre machine (localStorage).
Aucune donnée n'est envoyée à des serveurs externes.

## 📄 Licence

MIT License - Libre d'utilisation

---

**Amusez-vous en apprenant ! 🎉**