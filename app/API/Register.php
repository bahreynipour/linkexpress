<?php namespace LinkExpress\API;

class Register extends Api
{
    protected string $endpoint = 'account/register';

	protected ?array $requiredParams = [
		'Username',
		'Password',
		'FirstName',
		'LastName',
		'CompanyName',
		'CellPhone',
		'Email',
		'Address',
		'AddressFullName',
		'AddressCellPhone'
	];

	protected ?array $optionalParams = [
		'AddressCity',
		'ShebaNumber',
		'CompanyRegistrationNumber',
		'CompanyEconomicCode'
	];

    public function setResponseMessages(): void
    {
        $this->responseMessages = [
            0 => 'عضویت شما با موفقیت انجام شد.',
            1 => 'این اکانت در لینک اکسپرس وجود دارد.',
        ];
    }
}