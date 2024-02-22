<?php

namespace LinkExpress\API;

use function LinkExpress\getPaymentMethodName;
use function LinkExpress\getStateName;

class OrderTrack extends Api
{
    protected string $endpoint = 'order/status';

    protected ?array $requiredParams = [
        'trackingCode'
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
            0 => 'درخواست با موفقیت ثبت شد.',
            1 => 'کد پیگیری وارد نشده است.',
            2 => 'درخواست مورد نظر یافت نشد.',
            3 => 'خطای نامشخصی رخ داده است.'
        ];
    }

    public function getTrackingState($stateId): string
    {
	    return getStateName($stateId) ?? 'خطا در دریافت اطلاعات';
    }

    public function getPaymentMethod($methodId): string
    {
		return getPaymentMethodName($methodId) ?? 'خطا در دریافت اطلاعات';
    }
}