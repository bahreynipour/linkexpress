<?php

namespace LinkExpress\Actions;

use LinkExpress\API\OrderTrack;
use LinkExpress\Concerns\Action;
use LinkExpress\Concerns\AjaxInteractsWithOrder;
use LinkExpress\Contracts\InteractsWithOrder;
use LinkExpress\Exceptions\NotFoundTrackingCodeException;
use LinkExpress\Exceptions\OrderTrackException;
use LinkExpress\Objects\Order;

class TrackOrder implements InteractsWithOrder
{
	use Action,
		AjaxInteractsWithOrder;

	/**
	 * @throws NotFoundTrackingCodeException
	 * @throws OrderTrackException
	 */
	public function handle(Order $order, bool $save = true)
	{
		if (!$trackingCode = $order->getTrackingCode()) {
			throw new NotFoundTrackingCodeException();
		}

		$request = OrderTrack::make(['trackingCode' => $trackingCode])
			->request();

		if ($request['status'] !== 'success') {
			throw new OrderTrackException($request['message']);
		}

		return $save
			? $order
				->updateTrackingData($request['message'])
				->getTrackingData()
			: $request['message'];
	}
}