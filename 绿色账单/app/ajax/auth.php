<?php
include_once '../classes/luckyapp.php';
header("Content-type: text/json; charset=utf-8");
$app = new LuckyApp();
$app->hook();

if ($_POST["cmd"] === 'getValidCode') {
    $mobile = $_POST["mobile"];
    if($app->applyVerifyCodeByMobile($mobile)) {
        $responseJson = json_decode('{"status":"ok","msgtxt":""}');
        $responseJson->status = 'ok';
        $responseJson->msgtxt = '验证码已发送';
        echo json_encode($responseJson);
        exit;
    } else {
        $responseJson = json_decode('{"status":"fail","errcode":"-1", "errtxt":""}');
        $responseJson->status = 'fail';        
        $responseJson->errcode = ''.$mobile;
        $responseJson->errtxt = $app->getLastErrTxt();
        echo json_encode($responseJson);
        exit;
    }    
} else if ($_POST["cmd"] === 'getUserSummary') {
    echo $app->getUserSummary();
    exit;
} else if ($_POST["cmd"] === 'siginInByMobile') {
    $mobile = $_POST["mobile"];
    $vc = $_POST["vc"];
    if ($app->signInByMobile($mobile, $vc)) {
        $responseJson = json_decode('{"status":"ok","msgtxt":"","account":""}');
        $responseJson->status = 'ok';
        $responseJson->account = $app->getAccount();
        $responseJson->msgtxt = 'Done';
        echo json_encode($responseJson);
        exit;
    } else {
        $responseJson = json_decode('{"status":"fail","errcode":"-1","errtxt":"some issue occurs"}');
        $responseJson->errcode = $app->getLastErrCode();
        $responseJson->errtxt= $app->getLastErrTxt();
        echo json_encode($responseJson);
        exit;
    }
} else if ($_POST["cmd"] === 'siginInByAccessCode') {
    $account = $_POST["userid"];
    $ac = $_POST["ac"];
    
    if ($app->signInByAccessCode($account, $ac)) {
        
        $responseJson = json_decode('{"status":"ok","account":""}');
        $responseJson->status = 'ok';
        $responseJson->account = $app->getAccount();
        $responseJson->summary = json_decode($app->getUserSummary());
        
        echo json_encode($responseJson);
        //echo '{"status":"ok"}';
        
        exit;
    } else {
        $responseJson = json_decode('{"status":"fail","errcode":"-1","errtxt":"some issues occur"}');
        echo json_encode($responseJson);
        exit;
    }
} else if ($_POST["cmd"] === 'siginInByAppAccessToken') {
    $accessToken = $_POST["token"];
    if ($app->signInByAppAccessToken($accessToken)) {
        $responseJson = json_decode('{"status":"ok","msgtxt":"","account":""}');
        $responseJson->status = 'ok';
        $responseJson->account = $app->getAccount();
        $responseJson->msgtxt = 'Done';
        echo json_encode($responseJson);
        exit;
    } else {
        $responseJson = json_decode('{"status":"fail","errcode":"-1","errtxt":"some issues occur"}');
        $responseJson->errtxt = $app->getLastErrTxt();
        echo json_encode($responseJson);
        exit;
    }
} else {
    $responseJson = json_decode('{"status":"fail","errcode":"-1","errtxt":"unknown error"}');
    echo json_encode($responseJson);
    exit;
}
