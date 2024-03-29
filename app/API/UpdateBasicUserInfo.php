<?php namespace LinkExpress\API;

class UpdateBasicUserInfo extends Api
{
    protected string $endpoint = 'account/UpdateBasicUserInfo';

	protected ?array $requiredParams = [
		'FirstName',
		'LastName',
		'CellPhone',
		'Email',
		'Address',
		'AddressFullName',
		'AddressCellPhone'
	];

	protected ?array $optionalParams = [
		'AddressCity',
		'CompanyRegistrationNumber',
		'CompanyEconomicCode'
	];

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