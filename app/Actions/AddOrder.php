<?php

namespace LinkExpress\Actions;

use Exception;
use LinkExpress\API\OrderAdd;
use LinkExpress\Concerns\Action;
use LinkExpress\Objects\Order;

class AddOrder
{
	use Action;

	/**
	 * @throws Exception
	 */
	public function handle(Order $order)
	{
		if ($order->getTrackingCode()) {
			throw new Exception('درخواست این سفارش قبلا ارسال شده است. میتوانید آنرا ویرایش کنید.');
		}

		/**
		 * TODO: remove $_POST and replace it with a class to handle and organized posted data
		 */
		$request = OrderAdd::make($_POST);
		$result = $request->request();

		if ($result['status'] !== 'success')
			throw new Exception($result['message']);

		$trackingCode = $request->responseData['tracking_code'] ?? null;
		if (!$trackingCode) {
			throw new Exception('خطایی در پردازش لینک اکسپرس رخ داده است. لطفا با پشتیبانی تماس بگیرید.');
		}

		$order
			->updateOrderLinkData($trackingCode, $request->getArgs())
			->updateBarcodeData(
				$request->responseData['barcode_image_data'] ?? null
			);

		TrackOrder::run($order);

		return $result['message'];
	}
}