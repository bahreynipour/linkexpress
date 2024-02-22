<?php namespace LinkExpress\API;

class OrderResend extends Api
{
    protected string $endpoint = 'order/add';
    protected ?array $requiredParams = [
        'trackingCode',
        'sendDate',
	    'shift'
    ];

    protected ?array $optionalParams = [];

    protected ?array $requiredParamValues;

	/**
	 * @TODO: get these messages from OrderAdd endpoint
	 */
    public function setResponseMessages(): void
    {
        $this->responseMessages = [
            0 => 'درخواست با موفقیت ثبت شد',
            3 => 'تاریخ ارسال ضروری است.',
            4 => 'شیفت ارسال ضروری است.',
            8 => 'درخواست روز جاری فقط برای شیفت عصر امکان پذیر است.',
            9 => 'در این تاریخ امکان ثبت درخواست وجود ندارد.',
            10 => 'مهلت درخواست سرویس امروز به اتمام رسیده است.',
            14 => 'اعتبار اکانت شما کافی نمیباشد.',
            15 => 'برای تاریخ و شیفت مشخص شده، ظرفیت ارسالی وجود ندارد.',
        ];
    }
}