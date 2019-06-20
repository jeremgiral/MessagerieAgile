Pour lancer le projet en local : 
* Télécharger et installer docker
* Forker le repo Git
* Exécuter la commande suivante 
```
docker pull mongo && docker run -p 27017:27017 --name mongo -d mongo
```
* Lancer le server NodeJS avec la commande suivante :
```
npm start
```
