# Projet NETATMO

Récuper via une carte openstreetmap l'ensembles des 
informations publiques des stations 
netatmo présentent sur la carte et afficher ces stations sur la carte. 


### Préliminaires

A la racine créer le fichier config.php
````php
$config = array();
$config['client_id'] = 'xxxxxxxxxxxxxxx';
$config['client_secret'] = 'xxxxxxxxxxxxxx';
$config['scope'] = 'read_station read_thermostat write_thermostat';
````

Le ***client_id*** et le ***client_secret*** sont à récupérer via une inscription chez netatmo.


[demo](https://miw.ovh/avel/)

