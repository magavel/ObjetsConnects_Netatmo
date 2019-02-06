#Projet NETATMO

Récuper via une carte openstreetmap l'ensembles des 
informations publiques des stations 
netatmo presentent sur la carte et afficher ces stations sur la carte. 

A la racine créer le fichier config.php
````php

$config = array();
$config['client_id'] = 'xxxxxxxxxxxxxxx';
$config['client_secret'] = 'xxxxxxxxxxxxxx';
$config['scope'] = 'read_station read_thermostat write_thermostat';
````

Le client_id et le client_secret sont à récuper via une inscription chez netatmo.