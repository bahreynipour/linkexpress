<?php

namespace LinkExpress\API;

class TraceOrders extends Api
{
    protected string $endpoint = 'order/trace';

    public function handleResponseMessages($response)
    {
        return $response;
    }

	public function setArgs(array $data): void
	{
		$this->args = $data;
	}

    public function setResponseMessages(): void
    {}
}