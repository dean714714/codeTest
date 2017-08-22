<?php

/**
 * Description of luckyapp
 *
 * @author QinXue
 */
class LuckyApp {

    private static $MONKEY_TRACE = 'IAMAMONKEY';
    private static $MONKEY_SUMMARY ='IAMSUMMARY';
    private static $AUTH_SERVER = 'http://192.168.23.55:8082/musServer/musServer.svr'; //市民卡统一验证平台访问地址
    private static $APP_CODE = '0049';
    private static $BIZLOGIC_SERVER = 'http://192.168.23.149:9880';
    private static $SMK_APP_SENDCLIENT = 'hellohzsmk';
    private static $SMK_APP_SENDCHL = 'hzsmk.test';
    private static $SMK_APP_AUTHURL = 'http://192.168.23.211:8082/smkpay/ext/1.0.0/getUserId';
    private $lastErrCode;
    private $lastErrTxt;
    

    public function hook() {
        session_start();
    }

    public function getBizLogicServer() {
        return self::$BIZLOGIC_SERVER;
    }

    public function isReady() {
        if (empty($_SESSION[self::$MONKEY_TRACE])) {
            return false;
        } else if ($_SESSION[self::$MONKEY_TRACE] == 'unknown') {
            return false;
        } else if (strlen($_SESSION[self::$MONKEY_TRACE]) > 2) {
            return true;
        } else {
            return false;
        }
    }

    public function getUserSummary() {
        $responseJson = json_decode('{"userid":"","userlevel":"2"}');
        $responseJson->userid = $this->getAccount();
        
        $summary = json_decode($_SESSION[self::$MONKEY_SUMMARY]);
        $responseJson->userlevel = $summary->userLevel;
        $responseJson->username = $summary->userName;
        
        //$responseJson->msg = $this->userMsg;
        return json_encode($responseJson);
    }

    public function getLastErrCode() {
        return $this->lastErrCode;
    }

    public function getLastErrTxt() {
        return $this->lastErrTxt;
    }

    public function getAccount() {
        return $_SESSION[self::$MONKEY_TRACE];
    }

    public function applyVerifyCodeByMobile($mobile) {
        $contentType = 'application/json';
        $ch = curl_init(self::$AUTH_SERVER);

        //检查账户是否存在
        $requestJson = json_decode('{"user_name":"","user_name_type":"1","status":"1","pageNum":"1","pageLength":"5"}');
        $requestJson->user_name = $mobile;
        $content = json_encode($requestJson);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: ' . $contentType,
            'Content-Length: ' . strlen($content),
            '_si: ' . 'TRA003010128',
            '_cn: ' . 'IFSP01',
            '_tn: ' . '1EE5C59F0A1700100057306C855BFBB0'
        ));
        $result = curl_exec($ch);
        $resultJson = json_decode($result);

        if ($resultJson->code === '0000') {
            //用户存在, Do nothing
        } else if ($resultJson->code === '0004') {
            //用户不存在, 创建用户
            $requestJson = json_decode('{"user_name":"","user_type":"0", "user_system":"","status":"1","pageNum":"1","pageLength":"5"}');
            $requestJson->user_name = $mobile;
            $requestJson->user_system = self::$APP_CODE;

            $content = json_encode($requestJson);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
            curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: ' . $contentType,
                'Content-Length: ' . strlen($content),
                '_si: ' . 'TRA003010146',
                '_cn: ' . 'IFSP01',
                '_tn: ' . '1EE5C59F0A1700100057306C855BFBB0'
            ));
            $tmp = curl_exec($ch);
            $tmpJson = json_decode($tmp);
            if ($tmpJson->code != "0000") {
                $this->lastErrCode = $tmpJson->code;
                $this->lastErrTxt = "" . json_encode($tmpJson);
                return FALSE;
            }
        } else {
            $this->lastErrCode = $resultJson->code;
            $this->lastErrTxt = "" . json_encode($resultJson);
            return FALSE;
        }

        $requestJson = json_decode('{"mobile":"","status":"1","pageNum":"1","pageLength":"5"}');
        $requestJson->mobile = $mobile;

        $content = json_encode($requestJson);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: ' . $contentType,
            'Content-Length: ' . strlen($content),
            '_si: ' . 'TRA003010147',
            '_cn: ' . 'IFSP01',
            '_tn: ' . '1EE5C59F0A1700100057306C855BFBB0'
        ));
        $result = curl_exec($ch);
        $resultJson = json_decode($result);
        if ($resultJson->code === '0000') {
            return TRUE;
        } else {
            $this->lastErrCode = $resultJson->code;
            $this->lastErrTxt = json_encode($resultJson);
            return FALSE;
        }
    }

    public function signInByMobile($mobile, $verfiyCode) {
        $_SESSION[self::$MONKEY_TRACE] = 'unknown';
        $contentType = 'application/json';
        $ch = curl_init(self::$AUTH_SERVER);

        $requestJson = json_decode('{"mobile":"","veri_code":"", "res_id":"app", "op":"0","status":"1","pageNum":"1","pageLength":"5"}');
        $requestJson->mobile = $mobile;
        $requestJson->veri_code = $verfiyCode;

        $content = json_encode($requestJson);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: ' . $contentType,
            'Content-Length: ' . strlen($content),
            '_si: ' . 'TRA003010148',
            '_cn: ' . 'IFSP01',
            '_tn: ' . '1EE5C59F0A1700100057306C855BFBB0'
        ));
        $result = curl_exec($ch);
        $resultJson = json_decode($result);
        if ($resultJson->code === '0000') {
            $_SESSION[self::$MONKEY_TRACE] = $resultJson->user_id;
            $this->freshUserInfo($resultJson->user_id);
            return TRUE;
        } else {
            $this->lastErrCode = $resultJson->code;
            $this->lastErrTxt = "" . json_encode($resultJson);
            return FALSE;
        }
    }

    public function signInByAccessCode($account, $accessCode) {
        $_SESSION[self::$MONKEY_TRACE] = 'unknown';
        if ($accessCode === 'biginsight') {
            $_SESSION[self::$MONKEY_TRACE] = $account;
            $this->freshUserInfo($account);
            return true;
        } else {
            return false;
        }
    }

    private function freshUserInfo($account) {
        //$this->userMsg = $account;
        $contentType = 'application/json';
        
        $ch = curl_init(self::$AUTH_SERVER);
        $requestJson = json_decode('{"user_id":"","user_system":"", "op":"0","status":"1","pageNum":"1","pageLength":"5"}');
        $requestJson->user_id = $account;
        $requestJson->user_system = self::$APP_CODE;
        

        $content = json_encode($requestJson);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: ' . $contentType,
            'Content-Length: ' . strlen($content),
            '_si: ' . 'TRA003010105',
            '_cn: ' . 'IFSP01',
            '_tn: ' . '1EE5C59F0A1700100057306C855BFBB0'
        ));
        $result = curl_exec($ch);
       
        $resultJson = json_decode($result);
        
        
        $summary = json_decode('{"isRealName":"false","userLevel":"-1","userName":""}');
        
        if ($resultJson->code === '0000') {
            $summary->userLevel = $resultJson->list[0]->user_level;
            
            if ($summary->userLevel >= '2') {
                $summary->isRealName = true;
                $summary->userName = $resultJson->list[0]->name;
            } else {
                $summary->isRealName = false;
                $summary->userName = 'unknown';
            }
            $summary->userMsg = 'normal user';//.  json_encode($resultJson);
        } else {
            $summary->userLevel = '1';
            $summary->userMsg = ''.$result;
        }
        $_SESSION[self::$MONKEY_SUMMARY] = json_encode($summary);        
    }
    
    

    public function signInByAppAccessToken($accessToken) {
        $_SESSION[self::$MONKEY_TRACE] = 'unknown';
        $contentType = 'application/json';
        $ch = curl_init(self::$SMK_APP_AUTHURL);
        $requestJson = json_decode('{"accessToken":""}');

        $requestJson->accessToken = $accessToken;
        $content = json_encode($requestJson);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: ' . $contentType,
            'Content-Length: ' . strlen($content),
            'sendClient: ' . 'hellohzsmk',
            'sendChl: ' . 'hzsmk.test'
                )
        );
        $result = curl_exec($ch);
        $resultJson = json_decode($result);
        //$this->lastErrTxt = json_encode($resultJson);
        if ($resultJson->code == 'PY0000') {
            $_SESSION[self::$MONKEY_TRACE] = $resultJson->response->userId;
            if ($resultJson->response->lev >= '3') {
                $this->userName = $resultJson->response->name;
                $this->isRealName = true;
            } else {
                $this->userName = 'Unknown';
                $this->isRealName = false;
            }

            return true;
        } else {
            return false;
        }
    }

}
