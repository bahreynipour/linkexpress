<?php

namespace LinkExpress\Actions;

use LinkExpress\API\GetCreditBalance;
use LinkExpress\Concerns\Action;

class ValidateApiCredentials
{
	use Action;

	public function handle(string $username, string $password)
	{
		$request = GetCreditBalance::make([])
			->username($username)
			->password($password)
			->setArgs(['accountGuid' => '241bdfb3-abe4-4c75-b38b-67ea5c874c21'])
			->request();

		return $request['code'] !== 401;
	}
}