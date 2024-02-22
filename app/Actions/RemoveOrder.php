<?php

namespace LinkExpress\Actions;

use Exception;
use LinkExpress\API\OrderCancel;
use LinkExpress\API\OrderRemove;
use LinkExpress\Concerns\Action;
use LinkExpress\Exceptions\NotFoundTrackingCodeException;
use LinkExpress\Objects\Order;

class RemoveOrder
{
    use Action;

    /**
     * @throws Exception
     */
    public function handle(Order $order)
    {
        if(!$trackingCode = $order->getTrackingCode())
            throw new NotFoundTrackingCodeException();

        $args['trackingCode'] = $trackingCode;
        $request = new OrderRemove($args);
        $result = $request->request();

        if($result['status'] !== 'success')
            throw new Exception($result['message']);

        /**
         * make sure that order is cancelled
         */
        if(!$order->isCancelled()) {
            $order->cancel();
        }

        $order->remove();


        return $result['message'];
    }
}