<?php namespace LinkExpress\API;

class UpdateBasicUserInfo extends Api
{
    protected string $endpoint = 'account/UpdateBasicUserInfo';

    public function setResponseMessages(): void
    {
        $this->responseMessages = [
            0 => 'ویرایش اطلاعات شما با موفقیت انجام شد.',
            1 => 'خطای ناشناخته ای رخ داده است.',
            2 => 'حساب کاربری نامعتبر است.',
            3 => 'مقادیر ورودی نامعتبر است.',
        ];
    }
}