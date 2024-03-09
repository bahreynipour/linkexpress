<?php

namespace LinkExpress\Actions;

use LinkExpress\API\TraceOrders as ApiRequest;
use LinkExpress\Concerns\Action;
use LinkExpress\Exceptions\NotFoundTrackingCodeException;
use LinkExpress\Exceptions\OrderTraceException;
use LinkExpress\Objects\Order;
use WC_Order;
use function LinkExpress\getOrderByTrackingCode;

class TraceOrders
{
    use Action;

	/**
	 * @throws NotFoundTrackingCodeException
	 * @throws OrderTraceException
	 */
    public function handle(?array $orderTrackingCodes = null, bool $save = true, bool $withTrack = true)
    {
		$orders = $orderTrackingCodes ?? $this->getOrders();
		if(!$orders) {
			throw new NotFoundTrackingCodeException();
		}

	    $request = ApiRequest::make($orders)
			->request();

	    if ($request['status'] !== 'success') {
		    throw new OrderTraceException($request['message']);
	    }

		$traces = $request['message'];

		if(!$save) {
			return $traces;
		}

		if(!$withTrack) {
			return $traces;
		}

		foreach ($traces as $traceItem) {
			if(!$order = getOrderByTrackingCode($traceItem['tracking_code'])) {
				continue;
			}

			Order::make($order)
				->updateTraceData($traceItem['trace'], $withTrack);
		}

		return $traces;
    }

	/**
	 * @return array
	 */
	public function getOrders(): array
	{

		return array_map(
			fn(WC_Order $order) => $order->get_meta(Order::$trackingCodeMetaKey),
			wc_get_orders([
				'limit' => -1,
				'meta_key' => Order::$stateMetaKey,
				'meta_value' => [1, 4, 5],
				'meta_compare' => 'IN',
				'meta_type' => 'NUMERIC',
			])
		);
	}
}