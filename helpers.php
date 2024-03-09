<?php

namespace LinkExpress;

use Closure;
use Exception;
use LinkExpress\Objects\Order;
use WC_Order;
use WC_Order_Item_Product;

if (!defined('ABSPATH')) {
	return;
}

function __(string $text): string
{
	return \__($text, app()->getTextDomain());
}

/**
 * @param $order WC_Order|int
 *
 * @throws Exception
 */
function getOrderAmount($order)
{
	$order = getOrder($order);
	if (!$order) {
		throw new Exception(__('provided object is not an order'));
	}

	$multiplier = function ($currency) {
		switch (strtolower($currency)) {
			case 'irt':
				return 10;
			case 'irht':
				return 10000;
			case 'irhr':
				return 1000;
			default:
				return 1;
		}
	};

	return $order->get_total() * $multiplier($order->get_currency());
}

function getSettingsUrl(): ?string
{
	return admin_url(
		sprintf(
			'admin.php?page=%s&tab=%s',
			Constants::settingsSlug(),
			'api_credentials'
		)
	);
}


function modalRequiredFields(): array
{
	return [
		[
			'id' => 'ptype',
			'type' => 'select',
			'label' => 'نوع ارسال',
			'validation' => ['required'],
			'options' => array_replace(...array_values(getPTypes()))
		],
		/**
		 * @TODO: convert unit to KG
		 */
		[
			'id' => 'weight',
			'type' => 'text',
			'label' => 'وزن بسته',
			'description' => 'به کیلوگرم تنها برای بسته های خارج از تهران',
			'default' => fn(WC_Order $order) => (1.1 * (float)array_reduce(
				$order->get_items(),
				fn($totalWeight, WC_Order_Item_Product $item) => $totalWeight + floatval($item?->get_product()?->get_weight() ?? 0),
				0
			) ?: null
			)
		],
		[
			'id' => 'companyTrackingCode',
			'type' => 'text',
			'label' => 'کد مرسوله',
			'validation' => ['required'],
		],
		[
			'id' => 'fullName',
			'type' => 'text',
			'label' => 'نام و نام خانوادگی گیرنده',
			'validation' => ['required']
		],
		[
			'id' => 'state',
			'type' => 'select',
			'label' => 'استان',
			'validation' => ['required'],
			'class' => ['col-md-6', 'searchable'],
			'attributes' => [
				'data-city_field' => 'city'
			],
			'options' => WC()->countries->get_states('IR')
		],
		[
			'id' => 'city',
			'type' => 'select',
			'label' => 'شهر',
			'validation' => ['required'],
			'class' => ['col-md-6', 'searchable'],
			'options' => []
		],
		[
			'id' => 'shift',
			'type' => 'select',
			'label' => 'شیفت ارسال',
			'validation' => ['required'],
			'default' => 1,
			'require_city' => true,
			'options' => getShifts()
		],
		[
			'id' => 'address',
			'type' => 'textarea',
			'label' => 'آدرس گیرنده',
			'validation' => ['required'],
			'class' => ['col-md-12']
		],
		[
			'id' => 'deliveryType',
			'type' => 'select',
			'label' => 'نوع ماموریت',
			'validation' => ['required'],
			'options' => link_express_delivery_types()
		],
		[
			'id' => 'parcelType',
			'type' => 'select',
			'label' => 'نوع مرسوله',
			'validation' => ['required'],
			'options' => link_express_parcel_types()
		],
		[
			'id' => 'sendDate',
			'type' => 'date',
			'label' => 'تاریخ ارسال',
			'validation' => ['required']
		],
	];
}


function modalOptionalFields(): array
{
	return [
		[
			'id' => 'cellPhone',
			'type' => 'text',
			'label' => 'شماره تلفن همراه گیرنده',
			'required' => false,
			'description' => 'پیامک رهگیری به این شماره ارسال خواهد شد.'
		],
		[
			'id' => 'companyName',
			'type' => 'text',
			'label' => 'نام شرکت گیرنده',
			'required' => false
		],
		[
			'id' => 'phone',
			'type' => 'text',
			'label' => 'شماره تلفن ثابت گیرنده',
			'required' => false
		],
		[
			'id' => 'postalCode',
			'type' => 'text',
			'label' => 'کد پستی گیرنده',
			'required' => false
		],
		[
			'id' => 'amount',
			'type' => 'number',
			'label' => 'مبلغ قابل دریافت از گیرنده بسته',
			'required' => false,
			'description' => 'به ریال وارد شود'
		],
		[
			'id' => 'parcelValue',
			'type' => 'number',
			'label' => 'ارزش مرسوله',
			'required' => false,
			'description' => 'اگر وارد شود کالا مشمول بیمه خواهد شد'
		],
		[
			'id' => 'return',
			'type' => 'select',
			'label' => 'دارای بازگشت',
			'required' => false,
			'options' => link_express_returns()
		],
		[
			'id' => 'generateBarcode',
			'type' => 'select',
			'label' => 'ایجاد دیتای تصویر بارکد بسته',
			'required' => false,
			'options' => link_express_barcodes()
		],
		[
			'id' => 'description',
			'type' => 'textarea',
			'label' => 'توضیحات',
			'required' => false,
			'class' => ['col-md-12'],
			'default' => fn(WC_Order $order) => $order->get_customer_note()
		],
		[
			'id' => 'senderAddress',
			'type' => 'textarea',
			'label' => 'آدرس فرستنده',
			'required' => false,
			'class' => ['col-md-12']
		],
	];
}


function linkCities(): array
{
	return [
		'تهران' => 'تهران',
		'احمد آباد مستوفی' => 'احمد آباد مستوفی',
		'اسلامشهر' => 'اسلامشهر',
		'اندیشه' => 'اندیشه',
		'باغستان' => 'باغستان',
		'باقرشهر' => 'باقرشهر',
		'پرند' => 'پرند',
		'چهاردانگه' => 'چهاردانگه',
		'رباطکریم' => 'رباطکریم',
		'شاهدشهر' => 'شاهدشهر',
		'شهریار' => 'شهریار',
		'صالحیه' => 'صالحیه',
		'صباشهر' => 'صباشهر',
		'صفادشت' => 'صفادشت',
		'فردوسیه' => 'فردوسیه',
		'قدس' => 'قدس',
		'کهریزک' => 'کهریزک',
		'گلستان' => 'گلستان',
		'ملارد' => 'ملارد',
		'نسیم شهر' => 'نسیم شهر',
		'نصیرشهر' => 'نصیرشهر',
		'وحیدیه' => 'وحیدیه',
		'چهارباغ' => 'چهارباغ',
		'شهرجدیدهشتگرد' => 'شهرجدیدهشتگرد',
		'فردیس1' => 'فردیس1',
		'کرج' => 'کرج',
		'کمال شهر' => 'کمال شهر',
		'کوهسار' => 'کوهسار',
		'گرمدره' => 'گرمدره',
		'گلسار' => 'گلسار',
		'ماهدشت' => 'ماهدشت',
		'محمدشهر' => 'محمدشهر',
		'مشکین دشت' => 'مشکین دشت',
		'نظرآباد' => 'نظرآباد',
		'هشتگرد' => 'هشتگرد'
	];

}


function getShifts(bool $withZone = true, bool $withPeriod = true): array
{
    $tehran = [
	    1 => sprintf('صبح%s', $withPeriod ? '(۸ تا ۱۴)' : ''),
	    2 => sprintf('عصر%s', $withPeriod ? '(۱۴ تا ۲۰)' : ''),
    ];

    $other = [
	    3 => sprintf('صبح تا عصر%s', $withPeriod ? '(۸ تا ۲۰)' : ''),
    ];

    return !$withZone
        ? $tehran + $other
        : ['tehran' => $tehran, 'other' => $other];
}


function link_express_delivery_types()
{
	return [
		1 => 'ارسال و گذاشتن مرسوله مقابل درب ساختمان',
		2 => 'ارسال و اخذ نام گیرنده و کد احراز هویت',
		3 => 'ارسال و اخذ نام گیرنده',
		4 => 'ارسال و رویت کارت شناسایی',
		5 => 'دریافت مرسوله (فاقد بسته ارسالی)',
	];
}


function link_express_parcel_types()
{
	return [
		1 => 'پاکت نامه (>500gr)',
		2 => 'بسته کوچک (>20cm)',
		3 => 'بسته متوسط (>30cm)',
		4 => 'بسته بزرگ (>40cm)',
		5 => 'بسته خیلی بزرگ (>60cm)',
	];
}


function link_express_returns()
{
	return [
		0 => 'خیر',
		1 => 'بله',
	];
}

function link_express_barcodes()
{
	return [
		0 => 'خیر',
		1 => 'بله',
	];
}

function getPTypes(): array
{
	return [
		'link' => [
			1 => 'ارسال توسط لینک اکسپرس',
		],
		'other' => [
			2 => 'ارسال توسط پست پیشتاز',
			3 => 'ارسال توسط پست ویژه'
		]
	];
}

function getModelFieldDefaultValue(array $field, \LinkExpress\Objects\Order $order)
{
	if (!isset($field['default']))
		return null;

	return $field['default'] instanceof Closure
		? call_user_func_array($field['default'], [$order->get(), $field])
		: $field['default'];
}

function modalFieldInput(array $field, \LinkExpress\Objects\Order $order): void
{
	?>
    <input type="<?php echo $field['type']; ?>"
		<?php echo !empty($field['validation']) ? 'data-validation="' . htmlspecialchars(json_encode($field['validation'])) . '"' : ''; ?>
           id="<?php echo $field['id']; ?>"
           name="<?php echo $field['id']; ?>"
           value="<?php echo esc_attr(getModelFieldDefaultValue($field, $order) ?? ''); ?>"
    >
	<?php
}

function modalFieldDate(array $field, \LinkExpress\Objects\Order $order): void
{
	$default = esc_attr(getModelFieldDefaultValue($field, $order) ?? '');
	?>
    <span class="date_field_span" data-gdate="<?php echo $default; ?>"
          data-date="<?php echo $default; ?>">انتخاب تاریخ</span>
    <input type="text"
		<?php echo !empty($field['validation']) ? 'data-validation="' . htmlspecialchars(json_encode($field['validation'])) . '"' : ''; ?>
           class="field-date"
           id="<?php echo $field['id']; ?>"
           name="<?php echo $field['id']; ?>"
           value="<?php echo $default; ?>"
    >
	<?php
}

function modalFieldTextarea(array $field, \LinkExpress\Objects\Order $order): void
{
	?>
    <textarea
            <?php
            echo !empty($field['validation'])
	            ? 'data-validation="' . htmlspecialchars(json_encode($field['validation'])) . '"'
	            : '';
            ?>
            name="<?php echo $field['id']; ?>"
            id="<?php echo $field['id']; ?>" cols="30"
            rows="10"><?php echo esc_attr(getModelFieldDefaultValue($field, $order) ?? ''); ?></textarea>
	<?php
}

function modalFieldSelect(array $field, \LinkExpress\Objects\Order $order, bool $isTehran = false): void
{
	$attributes = isset($field['attributes'])
		? implode(
			' ',
			array_map(
				fn($key, $value): string => sprintf('%s="%s"', $key, htmlspecialchars($value)),
				array_keys($field['attributes']),
				$field['attributes']
			)
		)
		: '';

	$default = esc_attr(getModelFieldDefaultValue($field, $order) ?? '');

	?>
    <select
		<?php
		echo !empty($field['validation'])
			? 'data-validation="' . htmlspecialchars(json_encode($field['validation'])) . '"'
			: '';
		echo $attributes;
		echo !empty($field['required']) ? 'required' : '';
		?>
            name="<?php echo $field['id']; ?>"
            class="wc-enhanced-select"
            data-default="<?php echo $default ?>"
            id="<?php echo $field['id']; ?>">
		<?php
		$options = $field['options'];
		if (!empty($field['require_city'])):
			if (!empty($default)):
				if ($isTehran):
					$options = ['' => 'انتخاب کنید'] + $options['tehran'];
				else:
					$options = ['' => 'انتخاب کنید'] + $options['other'];
				endif;
			else:
				$options = ['-1' => 'شهر را انتخاب کنید.'];
			endif;
		else:
			if ($field['id'] != 'ptype') {
				$options = ['' => 'انتخاب کنید'] + $options;
			}
		endif;

		foreach ($options as $k => $v): ?>
            <option value="<?php echo $k; ?>" <?php selected($default, $k, true); ?>><?php echo $v; ?></option>
		<?php endforeach; ?>
    </select>
	<?php
}

function modalDefaults(): array
{
	$return['companyTrackingCode'] = !empty(getOption('companyTrackingCode')) ? getOption('companyTrackingCode') : '{order_id}';
	$return['senderAddress'] = !empty(getOption('Address')) ? getOption('Address') : '';

	if (!empty(getOption('deliveryType')))
		$return['deliveryType'] = getOption('deliveryType');
	if (!empty(getOption('parcelType')))
		$return['parcelType'] = getOption('parcelType');

	return $return;
}

function getTrackingAmount(float|string $amount): string
{
	$amount = empty($amount) ? 0 : $amount;
	return match (get_woocommerce_currency()) {
		'IRT' => wc_price($amount / 10),
		default => wc_price($amount)
	};
}

function getRialAmount(float|int $amount): float|int
{
	$amount = empty($amount) ? 0 : $amount;
	return match (get_woocommerce_currency()) {
		'IRT' => $amount * 10,
		default => $amount
	};
}

function getOption(?string $optionKey = null, $default = null)
{
	static $options = null;

	if ($options === null) {
		$options = get_option(Constants::settingsSlug(), []);
	}

	if (!$optionKey) {
		return $options;
	}

	return $options[$optionKey] ?? $default;
}

function view($file, $data = [])
{
	$filePath = app()::getFileDirPath(
		'resources' . DIRECTORY_SEPARATOR .
		'views' . DIRECTORY_SEPARATOR .
		str_replace('.', DIRECTORY_SEPARATOR, $file) . '.php'
	);
	if (!file_exists($filePath))
		return '';

	extract($data);

	$class = empty($class)
		? []
		: (!is_array($class) ? explode(' ', $class) : $class);

	ob_start();
	require("$filePath");
	return ob_get_clean();
}

function getStateName(?int $stateId): ?string
{
	return match ($stateId) {
		1 => 'ثبت شده',
		2 => 'رد شده',
		3 => 'لغو شده',
		4 => 'تایید شده',
		5 => 'در حال حمل توسط سفیر',
		6 => 'تحویل به مشتری',
		7 => 'ناموفق',
		default => null
	};
}

function getPaymentMethodName($methodId): ?string
{
	return match ($methodId) {
		1 => 'None',
		2 => 'نقدی',
		3 => 'دستگاه کارتخوان',
		4 => 'پرداخت آنلاین',
		default => null
	};
}

function getTrackingArrayInfo(array $data): array
{
	$info = [
		'state' => ['وضعیت', getStateName($data['state'])],
		'doneDate' => ['تاریخ انجام ماموریت'],
		'actualReceiverName' => ['تحویل گیرنده'],
		'failRejectReasonTitle' => ['دلیل عدم تحویل'],
		'failRejectReasonDescription' => ['توضیح عدم تحویل'],
		'paymentMethod' => ['روش پرداخت', getPaymentMethodName($data['paymentMethod'])],
		'getTrackingAmount' => ['مبلغ دریافتی از گیرنده', getTrackingAmount($data['amount'])],
		'paidAt' => ['تاریخ تراکنش'],
		'refNumber' => ['کد رهگیری تراکنش'],
		'signatureUrl' => ['ادرس تصویر امضا'],
		'deliveryCode' => ['کد احراز هویت (کد تحویل)'],
		'ptrackingcode' => ['کد رهگیری پست'],
		'fee' => ['هزینه ارسال']
	];

	foreach ($info as $key => $value) {
		if (count($value) === 2) {
			continue;
		}

		if (empty($data[$key])) {
			unset($info[$key]);
			continue;
		}

		$info[$key][] = $data[$key];
	}

	return $info;
}

function getOrderByTrackingCode($trackingCode)
{
	return wc_get_orders([
		'limit' => -1,
		'meta_key' => Order::$trackingCodeMetaKey,
		'meta_value' => $trackingCode,
		'meta_compare' => '=',
		'meta_type' => 'NUMERIC',
	])[0] ?? null;
}

function getLinkExpressCompanyAddress(): string
{
    return 'لینک اسکپرس آدرس : تهران فرخی یزدی آجرپز پلاک ۱۱';
}