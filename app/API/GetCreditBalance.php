<?php

namespace LinkExpress\API;

use function LinkExpress\getPaymentMethodName;
use function LinkExpress\getStateName;

class GetCreditBalance extends Api
{
    protected string $endpoint = 'account/GetCreditBalance';

	protected string $method = 'get';

	public function setArgs(array $data)
	{
		$this->endpoint .= '/' . ($data['accountGuid'] ?? '');
		return parent::setArgs($data);
	}

    public function handleResponseMessages($response)
    {
        if($response['code'] != 0 and array_key_exists($response['code'], $this->responseMessages))
            return $this->responseMessages[$response['code']] ;

        return $response['result'];
    }



	public function handleResponse($response): array
	{
		if(is_wp_error($response)) {
			return ['code' => -1, 'message' => 'خطایی رخ داده است'];
		}

		$responseCode = $response['response']['code'] ?? null;

		if($responseCode === 401) {
			return ['code' => 401, 'message' => 'اطلاعات api بدرستی وارد نشده است.'];
		}

		$body = json_decode($response['body'] ?? '', true);
		if( !is_array($body) ) {
			$body = json_decode($body, true);
		}
		return [
			'code' => $responseCode,
			'status' => $responseCode === 200 ? 'success' : 'error',
			'message' => '',
			'body' => $body
		];
	}

    public function setResponseMessages(): void
    {
        $this->responseMessages = [
            1 => 'خطایی رخ داده است و امکان دریافت اعتبار وجود ندارد.'
        ];
    }
}