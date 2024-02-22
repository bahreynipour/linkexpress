<?php
namespace LinkExpress\API;

use Exception;
use LinkExpress\Contracts\ApiInterface;
use function LinkExpress\getOption;

abstract class Api implements ApiInterface
{
    protected ?array $args;
    protected ?array $requiredParams;
    protected ?array $requiredParamValues;
    protected ?array $optionalParams;
    private string $username;
    private string $password;
    protected string $endpoint;
    private string $requestUrl;
    private string $baseEndpointUrl = 'http://api.linkexpress.ir/v1/';
    protected array $responseMessages = [];
    public ?array $responseData;

    public function __construct(array $data) {
        $this->setArgs($data);
        $this->setResponseMessages();
        $this->setApiCredentials();
    }

    public static function make(array $data)
    {
        return new static($data);
    }

    private function setApiCredentials(): void
    {
        try {
            if( (empty(getOption('api_username')) || empty(getOption('api_password')) ) && $this->endpoint != 'account/register') {
                throw new Exception('اطلاعات api نا معتبر است.');
            } else {

                $username = getOption('api_username');
                $password = getOption('api_password');

                $is_entered = (!empty($username) && !empty($password));
                $is_register_endpoint = $this->endpoint == 'account/register';
                $this->username = $is_entered ? $username : ($is_register_endpoint ? 'plugin' : '');
                $this->password = $is_entered ? $password : ($is_register_endpoint ? 'plugin607' : '');
            }
        } catch (Exception $e) {
            // TODO: handle error log
        }
    }

    public function setArgs(array $data): void
    {
        if(isset($this->requiredParams)) {
            $this->requiredParamValues = array_intersect_key($data, array_flip($this->requiredParams));
        }

        if(isset($this->optionalParams)) {
            $optionalParamsValues = array_intersect_key($data, array_flip($this->optionalParams));
        }

        $data = wp_parse_args($optionalParamsValues ?? [], $this->requiredParamValues);

        $this->args = $data;
    }

    public function getArgs(): array
    {
        return $this->args;
    }

    public function request(): array|string
    {
        try {

            if(isset($this->requiredParams) && count($this->requiredParamValues) !== count($this->requiredParams)) {
                throw new Exception('پارامترهای ضروری ارسال نشده است');
            }

            if(empty($this->endpoint)) {
                throw new Exception('اندپوینت وارد نشده است');
            } else {
                $this->requestUrl = $this->baseEndpointUrl . $this->endpoint;
                return $this->process();
            }
        } catch (Exception $e) {
            return $e->getMessage();
        }

    }

    public function setResponseDataObject(array $response): void
    {
        $this->responseData = $response;
    }

    public function process(): array
    {
        $body = apply_filters('link_express_api_body_data', $this->getArgs());
        $body = wp_json_encode( $body, JSON_UNESCAPED_UNICODE);

        $args = [
            'body'        => $body,
            'headers'     => [
                'Content-Type' => 'application/json; charset=utf-8',
                'Authorization' => 'Basic ' . base64_encode( $this->username . ':' . $this->password )
            ],
            'timeout'     => 45,
            'redirection' => 5,
            'blocking'    => true,
            'httpversion' => '1.0',
            'data_format' => 'body',
        ];
        return $this->handleResponse( wp_remote_post( $this->requestUrl, $args ) );
    }

    public function handleResponse($response): array
    {
        if(is_wp_error($response))
            return ['code' => -1, 'message' => 'خطایی رخ داده است'];

        $body = json_decode($response['body'], true);
        if( !is_array($body) )
	        $body = json_decode($body, true);

        $this->setResponseDataObject($body);

        $message = $this->handleResponseMessages($body);

		$response = $response['response'];

        return [
			'status' => $response['code'] === 200 ? 'success' : 'error',
	        'message' => $message
        ];
    }

    public function handleResponseMessages($response) {
        if(array_key_exists($response['code'], $this->responseMessages))
            return $this->responseMessages[$response['code']];
        return $response['message'];
    }
}