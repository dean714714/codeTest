<?php

include_once '../classes/luckyapp.php';
header("Content-type: text/json; charset=utf-8");
$app = new LuckyApp();
$app->hook();

if (!$app->isReady()) {
    $responseJson = json_decode('{"status":"fail","errcode":"-1","errtxt":"monkey is not ready"}');
    echo json_encode($responseJson);
    exit;
}

/**
 * Query
 */
$cmd = $_POST["cmd"];
if ($cmd === 'query') {
    $remote_server = $app->getBizLogicServer() . '/ubus/services/OwnerCards/jsonPerformer';
    $content = file_get_contents("php://input"); //content
    $contentType = 'application/json';
    $requestJson = json_decode('{"cmd":"query","ts":"","mappingtype":"TYU2HZT","searchkey":""}');
    $requestJson->ts = strval(time());
    $requestJson->searchkey = $app->getAccount();
    $content = json_encode($requestJson);
    $ch = curl_init($remote_server);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: ' . $contentType,
        'Content-Length: ' . strlen($content))
    );
    $result = curl_exec($ch);

    $tmpJson = json_decode($result);

    echo json_encode($tmpJson);
    exit;    
} else if ($cmd === "add" || $cmd === "remove" ) {
    $remote_server = $app->getBizLogicServer() . '/ubus/services/BindRelation/jsonPerformer';
    $content = file_get_contents("php://input"); //content
    $contentType = 'application/json';
    if($cmd === "add") {
       $requestJson = json_decode('{"cmd":"bind",'
            . '"ts":"","mappingtype":"TYU2HZT",'
            . '"searchkey":"", "cards":[]}'); 
    } else {
        $requestJson = json_decode('{"cmd":"unbind",'
            . '"ts":"","mappingtype":"TYU2HZT",'
            . '"searchkey":"", "cards":[]}');
    }
    
    
    $requestJson->ts = strval(time());
    $requestJson->searchkey = $app->getAccount();
    $requestJson->cards[0] = json_decode('{"cardtype":"hzt", "cardno":""}');
    $requestJson->cards[0]->cardno = $_POST["cardno"];
    $content = json_encode($requestJson);
    $ch = curl_init($remote_server);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: ' . $contentType,
        'Content-Length: ' . strlen($content))
    );
    $result = curl_exec($ch);
    $tmpJson = json_decode($result);
    echo json_encode($tmpJson);    
    exit;
} else {
    $responseJson = json_decode('{"status":"fail","errcode":"-1","errtxt":"illegal parameters"}');
    echo json_encode($responseJson);
    exit;
}
