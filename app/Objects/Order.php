<?php

namespace LinkExpress\Objects;

use LinkExpress\Actions\TraceOrders;
use LinkExpress\Actions\TrackOrder;
use LinkExpress\Helper;
use LinkExpress\Services\Nonce;
use WC_Order;
use function LinkExpress\getRialAmount;
use function LinkExpress\getShifts;
use function LinkExpress\getStateName;

class Order
{
	public static string $trackingCodeMetaKey = '_link_tracking_code';

	public static string $stateMetaKey = '_link_state';

	public static string $submittedDataMetaKey = '_link_data';

	public static string $barcodeMetaKey = '_link_barcode_data';

	public static string $traceMetaKey = '_link_trace_data';

	public static string $trackingDataMetaKey = '_link_tracking_data';


	protected WC_Order $order;


	public function __construct(int|WC_Order $order)
	{
		$this->order = $order instanceof WC_Order ? $order : wc_get_order($order);
	}

	public static function make(int|WC_Order $order)
	{
		return new static($order);
	}

	public function getTrackingCode(): string|null
	{
		return $this->order->get_meta(self::$trackingCodeMetaKey) ?: null;
	}

	public function isCancelled(): bool
	{
		return $this->getStateId() === 3;
	}

	public function getStateId(): ?int
	{
		$state = $this->order->get_meta(self::$stateMetaKey);
		return $state ? intval($state) : null;
	}

	public function remove()
	{
		$this->order->delete_meta_data(self::$stateMetaKey);
		$this->order->delete_meta_data(self::$trackingCodeMetaKey);
		$this->order->delete_meta_data(self::$traceMetaKey);
		$this->order->delete_meta_data(self::$submittedDataMetaKey);
		$this->order->delete_meta_data(self::$barcodeMetaKey);
		$this->order->save();

		return $this;
	}

	public function get(): WC_Order
	{
		return $this->order;
	}

	/**
	 * Allow Access to WC_Order callable methods
	 *
	 * @param string $name
	 * @param array $arguments
	 * @return mixed|void
	 */
	public function __call(string $name, array $arguments)
	{
		if (is_callable([$this->order, $name]) && !method_exists($this, $name)) {
			return call_user_func([$this->order, $name], ...$arguments);
		}
	}

	public function getTraceData(?array $data = null): array
	{
		if (!$data) {
			$data = $this->order->get_meta(self::$traceMetaKey);
			$data = (empty($data) || !is_array($data))
				? []
				: $data;
		}

		usort(
			$data,
			fn($a, $b) => strtotime($a['done_date']) - strtotime($b['done_date'])
		);

		return $data;
	}

	public function getTrackingData(): array
	{
		$data = $this->order->get_meta(self::$trackingDataMetaKey);
		return (empty($data) || !is_array($data))
			? []
			: $data;
	}

	public function findLastChange(?array $traces = null)
	{
		$traces = $this->getTraceData($traces);
		if (empty($traces))
			return null;

		return $traces[array_key_last($traces)];
	}

	public function updateTrackingData(array $data): static
	{
		$this->order->update_meta_data(
			self::$trackingDataMetaKey,
			$data
		);

		$oldStateId = $this->getStateId();
		$stateId = intval($data['state']);

		$this->order->update_meta_data(
			self::$stateMetaKey,
			$stateId
		);

		$this->order->save();

		if ($stateId !== $oldStateId) {
			TraceOrders::run([$this->getTrackingCode()]);
		}

		$this->order->save();

		return $this;
	}

	public function updateTraceData(array $data): static
	{
		$this->order->update_meta_data(
			self::$traceMetaKey,
			$data
		);

		$oldStateId = $this->getStateId();
		$stateId = intval($this->findLastChange($data)['state']);;

		$this->order->update_meta_data(
			self::$stateMetaKey,
			$stateId
		);

		$this->order->save();

		if ($stateId !== $oldStateId) {
			TrackOrder::run($this);
		}

		return $this;
	}

	public function getAddress(): string
	{
		return implode(
			'،'
			, array_filter(
				[
					$this->order->get_shipping_address_1() ?: $this->order->get_billing_address_1(),
					$this->order->get_shipping_address_2() ?: $this->order->get_billing_address_2()
				]
			)
		);
	}

	public function getCustomerName(): string
	{
		return implode(
			' ',
			array_filter(
				[
					$this->order->has_shipping_address() ? $this->order->get_shipping_first_name() : $this->order->get_billing_first_name(),
					$this->order->has_shipping_address() ? $this->order->get_shipping_last_name() : $this->order->get_billing_last_name()
				]
			)
		);
	}

	public function updateOrderLinkData(string $trackingCode, array $args)
	{
		unset($args['trackingCode']);
		$state = $_POST['state'] ?? false;
		if ($state)
			$args['state'] = $state;

		$this->order->update_meta_data(self::$trackingCodeMetaKey, $trackingCode);
		$this->order->update_meta_data(self::$submittedDataMetaKey, $args);
		$this->order->save();

		return $this;
	}

	public function getOrderLinkData(?string $key = null)
	{
		$data = $this->order->get_meta(self::$submittedDataMetaKey);

		if ($key) {
			return $data[$key] ?? null;
		}

		return $data;
	}

	public function updateBarcodeData(?string $barcodeData): static
	{
		$this->order->update_meta_data(self::$barcodeMetaKey, $barcodeData);
		$this->order->save();

		return $this;
	}

	public function getBarcodeData(): string|null
	{
		return $this->order->get_meta(self::$barcodeMetaKey) ?: null;
	}

	public function getStateName(?int $state = null): ?string
	{
		return getStateName($state ?? $this->getStateId());
	}

	public function getCellPhone(): ?string
	{
		return $this->order->get_shipping_phone() ?: $this->order->get_billing_phone();
	}

	public function getPostalCode(): ?string
	{
		return $this->order->get_shipping_postcode() ?: $this->order->get_billing_postcode();
	}

	public function getAmount(): float|int
	{
		return $this->order->get_payment_method() === 'cod' ? getRialAmount($this->order->get_total()) : 0;
	}

	public function getCity(): ?string
	{
		return $this->order->get_shipping_city() ?: $this->order->get_billing_city();
	}

	public function getProvince(): ?string
	{
		return Helper::pwIntegrate(
			$this->order->get_shipping_state() ?: $this->order->get_billing_state(),
			true
		);
	}

	public function getSendDate(): bool|string|null
	{
		$date = $this->getOrderLinkData('sendDate');
		return $date
			? (wp_date('Y/m/d', strtotime($date)) ?: null)
			: null;
	}

	public function getShiftId()
	{
		return $this->getOrderLinkData('shift');
	}

	public function getShift()
	{
		return getShifts(false, false)[$this->getShiftId()] ?? null;
	}

	public function getFormattedReceiverAddress(string $separator = ' - '): string
	{
		$address[] = $this->getCustomerName();
		$address[] = $this->getCellPhone() ?? null;
		$address[] = 'آدرس';
		$address[] = $this->getAddress();

		return implode($separator, $address);
	}

	public function getPrintLabelUrl(): string
	{
		return add_query_arg([
			'nonce' => Nonce::make('linkExpress')->create(),
			'action' => 'generateLinkLabel',
			'order_ids' => $this->order->get_id()
		], admin_url('admin-ajax.php'));
	}
}