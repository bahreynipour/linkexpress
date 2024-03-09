<?php

namespace LinkExpress\Actions;

use Exception;
use LinkExpress\API\OrderEdit;
use LinkExpress\Concerns\Action;
use LinkExpress\Exceptions\NotFoundTrackingCodeException;
use LinkExpress\Objects\Order;

class EditOrder
{
    use Action;

    /**
     * @throws Exception
     */
    public function handle(Order $order)
    {
        if (!$trackingCode = $order->getTrackingCode()) {
	        throw new NotFoundTrackingCodeException();
        }

        /**
         * TODO: remove $_POST and replace it with a class to handle and organized posted data
         */
        $_POST['trackingCode'] = $trackingCode;

        $request = new OrderEdit($_POST);
        $result = $request->request();

        if ($result['status'] !== 'success')
            throw new Exception($result['message']);

        $trackingCode = $request->responseData['tracking_code'] ?? null;
        if (!$trackingCode) {
	        throw new Exception('خطایی در پردازش لینک اکسپرس رخ داده است. لطفا با پشتیبانی تماس بگیرید.');
        }

        $order->updateOrderLinkData($trackingCode, $request->getArgs());

        TrackOrder::run($order);

        return $result['message'];
    }
}