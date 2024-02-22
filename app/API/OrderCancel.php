<?php namespace LinkExpress\API;

class OrderCancel extends Api
{
    protected string $endpoint = 'order/cancel';

    protected ?array $requiredParams = [
        'trackingCode'
    ];

    public function setResponseMessages(): void
    {
        $this->responseMessages = [
            0 => 'درخواست با موفقیت لغو شد.',
            1 => 'کد پیگیری وارد نشده است.',
            2 => 'درخواست مورد نظر یافت نشد.',
            3 => 'خطای نامشخصی رخ داده است.',
            4 => 'بدلیل وضعیت درخواست، امکان لغو آن وجود ندارد'
        ];
    }
}