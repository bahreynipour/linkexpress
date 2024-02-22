<?php namespace LinkExpress\API;

class OrderAdd extends Api
{
    protected string $endpoint = 'order/add';
    protected ?array $requiredParams = [
        'companyTrackingCode',
        'address',
        'fullName',
        'deliveryType',
        'shift',
        'parcelType',
        'city',
        'sendDate',
    ];

    protected ?array $optionalParams = [
        'cellPhone',
        'companyName',
        'phone',
        'postalCode',
        'amount',
        'parcelValue',
        'weight',
        'latitude',
        'longitude',
        'return' => '',
        'description',
        'senderAddress',
        'generateBarcode',
        'ptype',
    ];

    protected ?array $requiredParamValues;

    public function setResponseMessages(): void
    {
        $this->responseMessages = [
            0 => 'درخواست با موفقیت ثبت شد',
            1 => 'کد مرسوله، آدرس گیرنده و نام و نام خانوادگی گیرنده ضروری هستند.',
            2 => 'نوع ماموریت ضروری است.',
            3 => 'تاریخ ارسال ضروری است.',
            4 => 'شیفت ارسال ضروری است.',
            5 => 'نوع مرسوله ضروری است.',
            6 => 'درخواست انجام نشد، خطای نامشخصی رخ داده است.',
            7 => 'تاریخ ارسال باید بعد از تاریخ درخواست باشد.',
            8 => 'درخواست روز جاری فقط برای شیفت عصر امکان پذیر است.',
            9 => 'در این تاریخ امکان ثبت درخواست وجود ندارد.',
            10 => 'مهلت درخواست سرویس امروز به اتمام رسیده است.',
            11 => 'شهر ارسال ضروری است.',
            12 => 'درخواست سرویس برای روز جاری فقط برای شهر تهران امکان پذیر است.',
            13 => 'شما میتوانید شیفت عصر را برای درخواست امروز استفاده کنید.',
            14 => 'اعتبار اکانت شما کافی نمیباشد.',
            15 => 'برای تاریخ و شیفت مشخص شده، ظرفیت ارسالی وجود ندارد.',
        ];
    }
}