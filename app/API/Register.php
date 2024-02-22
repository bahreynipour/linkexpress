<?php namespace LinkExpress\API;

class Register extends Api
{
    protected string $endpoint = 'account/register';

    public function setResponseMessages(): void
    {
        $this->responseMessages = [
            0 => 'عضویت شما با موفقیت انجام شد.',
            1 => 'این اکانت در لینک اکسپرس وجود دارد.',
        ];
    }
}