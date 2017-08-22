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
$account = $app->getAccount();

$remote_server = $app->getBizLogicServer().'/ubus/services/MonthBill/jsonPerformer';
$content = file_get_contents("php://input");//content
$contentType = 'application/json';
$requestJson = json_decode('{"appid":"SMK01","ts":"","searchkey":""}');
$requestJson->ts = strval(time());
$requestJson->searchkey = $app->getAccount()."$".$_POST["monthcode"];
$content = json_encode($requestJson);
$ch = curl_init($remote_server);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  'Content-Type: '.$contentType,
  'Content-Length: ' . strlen($content))
);
$result = curl_exec($ch);

$tmpJson = json_decode($result);

if($tmpJson->status === 'ok') {
    $responseJson = json_decode('{"status":"ok","cardInfo":{}}');
    $responseJson->cardInfo = $tmpJson->result;
    echo json_encode($responseJson);
    exit();
} else {
    $responseJson = json_decode('{"status":"fail","errcode":""}');    
    $responseJson->errcode = $tmpJson->errcode;
    echo json_encode($responseJson);
    exit();
}
/**
$responseJson = json_decode('{"status":"ok","msg":""}');
$responseJson->msg = $account . '-  ' . $_POST["monthcode"];

$responseJson->cardInfo = json_decode('{"bus_count": 100,	
		"subway_count":40,	
		"park_count":10,
		"ride_time":86,	
		"ride_km":1412,	
		"westlake_round":6,
		"fitness_count":32,	
		"fitness_time":242,
		"save_electricity":56.31,	
		"online_recharge_count":4,
		"online_recharge_money":350,
		"medical_count":2,
		"inter_room_settlement":5,
		"save_wait_time":0,
		"cost_money":12318.12,
		"save_money":412.76,
		"bus_cost":100.54,
		"subway_cost":45.20,
		"park_cost":10.15,
		"save_co2":6524,
		"save_rank":86}');


echo json_encode($responseJson);
 
exit();
*/