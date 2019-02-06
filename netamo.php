<?php
/**
 * Created by PhpStorm.
 * User: avelferonpapel
 * Date: 2019-01-29
 * Time: 14:17
 */


require_once ('./src/Netatmo/autoload.php');
require_once ('config.php');


$client = new Netatmo\Clients\NAApiClient($config);


$username = 'miw20182019@gmail.com';
$pwd = 'Miw2019objco';
$client->setVariable('username', $username);
$client->setVariable('password', $pwd);
try
{
    $tokens = $client->getAccessToken();
    $refresh_token = $tokens['refresh_token'];
    $access_token = $tokens['access_token'];
    echo $access_token;
}
catch(Netatmo\Exceptions\NAClientException $ex)
{
    echo "An error occcured while trying to retrive your tokens \n";
}

