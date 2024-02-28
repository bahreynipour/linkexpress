<?php

namespace LinkExpress\API;

use function LinkExpress\getPaymentMethodName;
use function LinkExpress\getStateName;

class GetCreditBalance extends Api
{
    protected string $endpoint = 'account/GetCreditBalance';

	protected string $method = 'get';

    protected ?array $requiredParams = [
        'accountGuid'
    ];

    public function handleResponseMessages($response)
    {
        if($response['code'] != 0 and array_key_exists($response['code'], $this->responseMessages))
            return $this->responseMessages[$response['code']] ;

        return $response['result'];
    }

    public function setResponseMessages(): void
    {
        $this->responseMessages = [
            1 => 'خطایی رخ داده است و امکان دریافت اعتبار وجود ندارد.'
        ];
    }
}