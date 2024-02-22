<?php namespace LinkExpress\API;

class OrderEdit extends Api
{
    protected string $endpoint = 'order/edit';

    protected ?array $requiredParams = [
        'trackingCode'
    ];

    protected ?array $optionalParams = [
        'companyTrackingCode',
        'address',
        'fullName',
        'deliveryType',
        'shift',
        'parcelType',
        'city',
        'sendDate',
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
        'ptype',
    ];

    public function setResponseMessages(): void
    {
        $this->responseMessages = [
            0 => 'درخواست با موفقیت ویرایش شد',
            2 => 'نوع ماموریت ضروری است.',
            3 => 'تاریخ ارسال ضروری است.',
            4 => 'شیفت ارسال ضروری است.',
            5 => 'نوع مرسوله ضروری است.',
            6 => 'درخواست انجام نشد، خطای نامشخصی رخ داده است.',
            7 => 'تاریخ ارسال باید بعد از تاریخ درخواست باشد.',
            8 => 'کد رهگیری ارسال نشده است.',
            9 => 'درخواست یافت نشد.',
            10 => 'بدلیل تغییر وضعیت درخواست، امکان ویرایش آن وجود ندارد.',
            11 => 'در این تاریخ امکان ثبت درخواست وجود ندارد.',
            12 => 'شهر نامعتبر است.',
            13 => 'درخواست سرویس برای روز جاری فقط برای شهر تهران امکان پذیر است.',
            14 => 'درخواست روز جاری فقط برای شیفت عصر امکان پذیر است.',
            15 => 'درخواست در حال پردازش است و نمیتوانید آنرا ویرایش کنید.',
            16 => 'بدلیل تغییر وضعیت درخواست، اجازه ویرایش آنرا ندارید.',
            17 => 'ظرفیت تاریه و شیفت مورد درخواست تکمیل شده است.'
        ];
    }
}