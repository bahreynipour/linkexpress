<?php

namespace LinkExpress\Actions;

use Exception;
use LinkExpress\API\OrderCancel;
use LinkExpress\Concerns\Action;
use LinkExpress\Exceptions\NotFoundTrackingCodeException;
use LinkExpress\Objects\Order;

class CancelOrder
{
    use Action;

    /**
     * @throws Exception
     */
    public function handle(Order $order)
    {
        if($order->isCancelled()) {
	        throw new Exception('این درخواست از قبل لغو شده است.');
        }

        if(!$trackingCode = $order->getTrackingCode()) {
            throw new NotFoundTrackingCodeException();
			}

        $request = OrderCancel::make(['trackingCode' => $trackingCode])
	        ->request();

        if($request['status'] !== 'success') {
	        throw new Exception($request['message']);
        }

        TrackOrder::run($order);

        return $request['message'];
    }
}