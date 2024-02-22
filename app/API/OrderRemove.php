<?php namespace LinkExpress\API;

class OrderRemove extends Api
{
    protected string $endpoint = 'order/cancel';

    protected ?array $requiredParams = [
        'trackingCode'
    ];

    public function setResponseMessages(): void
    {
        $this->responseMessages = [
            0 => 'درخواست با موفقیت حذف شد.',
            1 => 'کد پیگیری وارد نشده است.',
            2 => 'درخواست یافت نشد.',
            3 => 'بدلیل تغییر وضعیت درخواست، امکان حذف آن وجود ندارد',
            4 => 'خطای نامشخصی رخ داده است.',
        ];
    }
}