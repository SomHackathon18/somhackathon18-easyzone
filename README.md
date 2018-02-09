# Easy Zone

Gestor de zones d'estacionament i càrrega i descàrrega.

Projecte realitzat a la hackathon del Tecnocampus 2018.

Encoratjem a TOT ajuntament a usar aquest software per tal de millorar l'orgnització de Zones Blaves i de Carrega i Descarrega. També tot pull request és benvingut i qualsevol problema es pot postejar a l'apartat de 'Issues'.

## Com usar l'aplicació

Primer de tot hem de descarregar els arxius del projecte, ho podem fer amb la següent línea:
```
git clone https://github.com/SomHackathon18/somhackathon18-easyzone.git
```
Ara hem d'entrar a la carpeta: 
```
cd somhackathon18-easyzone
```

Ja tenim els fitxers i estem a la carpeta, ara necesitem instal·lar les dependencies, només cal fer:
```
npm install
```
Ja tenim l'aplicació llesta per a ser usada, però abans hem d'instal·lar el software 'MongoDB', el següent link explica com fer-ho: [Instal·lar per a Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/).

Ara hem d'obrir el software MongoDB, podem deixar-ho com a servei amb la comanda:
```
sudo service mongod start
```
Només ens queda demanar una clau al servei OpenAlpr per tenir-ho tot llest. Ho podem fer creant-nos un compte al següent [enllaç](http://www.openalpr.com/).

La clau hauria de començar per el prefix 'sk_'.

Aquesta clau la hem de posar en el fitxer index.js, en la línea #161#. S'haura de veure així: 'curl -X POST -F image=@matricula.png "https://api.openalpr.com/v2/recognize?recognize_vehicle=1&country=eu&secret_key=sk_CLAU-SECRETA"',

Molt bé!! Ja ho tenim tot llest per a començar a fer servir el sistema, només cal executar la següent comanda:
```
node index.js
```
(EXTRA) En cas que volguem tenir el servei de segon pla, podem executar la següent sentencia de comandes:
```
sudo apt-get install screen -y
screen -S easyzone
node index.js
(Teclejem Ctrl+A+D)
```

#Llicència MIT
