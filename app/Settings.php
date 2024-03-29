<?php

namespace LinkExpress;

use LinkExpress\Actions\ValidateApiCredentials;
use LinkExpress\API\Register;
use LinkExpress\API\UpdateBasicUserInfo;
use LinkExpress\Integrations\DeliveryTime;

if (!defined('ABSPATH')) {
	exit;
}

class Settings
{
	public array $options = [];

	public function __construct()
	{
		$this->get_settings();
		$this->options = getOption() ?? [];

		if (empty($this->options)) {
			update_option(Constants::settingsSlug(), []);
		}


		add_action('admin_menu', [$this, 'registerMenu'], 11);

		$isGetSettings = isset($_GET['page']) && $_GET['page'] === Constants::settingsSlug();
		$isPostSettings = isset($_POST['option_page']) && $_POST['option_page'] == Constants::settingsSlug();
		if ($isGetSettings || $isPostSettings)
			add_action('admin_init', [$this, 'registerSettings']);


		add_filter('link_express_authentication_settings', [$this, 'apiCredentialsSettings'], 10, 1);
	}

	public function apiCredentialsSettings(array $fields): array
	{
		$loginFields = [
			'login_title' => [
				'id' => 'login_title',
				'name' => 'اطلاعات api',
				'type' => 'header',
				'desc' => '<button type="button" id="showRegistrationForm" class="auth-button">حساب لینک ندارید؟ عضو شوید!</button>'
			],
			'api_username' => [
				'id' => 'api_username',
				'name' => 'نام کاربری',
				'type' => 'text',
				'desc' => 'نام کاربری پنل لینک اکسپرس'
			],
			'api_password' => [
				'id' => 'api_password',
				'name' => 'کلمه عبور',
				'type' => 'password',
				'desc' => 'کلمه عبور پنل لینک اکسپرس'
			],
		];

		$registrationFields = [
			'registration_title' => [
				'id' => 'registration_title',
				'name' => 'عضویت و احراز هویت در لینک اکسپرس',
				'type' => 'header',
				'class' => 'hidden',
				'desc' => '<button type="button" id="hideRegistrationForm" class="auth-button">حساب لینک دارید؟ وارد شوید!</button>'

			],
			'register_notice' => [
				'id' => 'register_notice',
				'options' => 'در صورتی که تا کنون عضو لینک اکسپرس نشده اید، میتوانید از فرم زیر برای عضویت استفاده کنید. در غیر این صورت میتوانید در بخش اطلاعات api، اطلاعات کاربری خود را برای احراز هویت وارد کنید.',
				'type' => 'html',
				'class' => 'hidden'
			],
			'Username' => [
				'id' => 'Username',
				'name' => 'نام کاربری',
				'type' => 'text',
				'required' => true,
				'class' => 'hidden',
				'disabled' => true
			],
			'Password' => [
				'id' => 'Password',
				'name' => 'کلمه عبور',
				'type' => 'text',
				'required' => true,
				'class' => 'hidden',
				'disabled' => true
			],
			'Email' => [
				'id' => 'Email',
				'name' => 'ایمیل',
				'type' => 'text',
				'required' => true,
				'std' => get_option('admin_email'),
				'class' => 'hidden',
				'disabled' => true
			],
			'FirstName' => [
				'id' => 'FirstName',
				'name' => 'نام مدیریت',
				'type' => 'text',
				'required' => true,
				'class' => 'hidden',
				'disabled' => true
			],
			'LastName' => [
				'id' => 'LastName',
				'name' => 'نام خانوادگی مدیریت',
				'type' => 'text',
				'required' => true,
				'class' => 'hidden',
				'disabled' => true
			],
			'CompanyName' => [
				'id' => 'CompanyName',
				'name' => 'نام شرکت',
				'type' => 'text',
				'desc' => '(در لیبل و پیامک درج می شود)',
				'required' => true,
				'class' => 'hidden',
				'disabled' => true
			],
			'CellPhone' => [
				'id' => 'CellPhone',
				'name' => 'شماره همراه',
				'type' => 'text',
				'required' => true,
				'class' => 'hidden',
				'disabled' => true
			],
			'Address' => [
				'id' => 'Address',
				'name' => 'آدرس محل جمع آوری مرسولات',
				'type' => 'text',
				'required' => true,
				'class' => 'hidden',
				'disabled' => true
			],
			'ShebaNumber' => [
				'id' => 'ShebaNumber',
				'name' => 'شماره شبا',
				'type' => 'text',
				'desc' => '(جهت تسویه مبالغ پرداخت در محل -  این فیلد اختیاری است)',
				'class' => 'hidden',
				'disabled' => true
			],
			'CompanyRegistrationNumber' => [
				'id' => 'CompanyRegistrationNumber',
				'name' => 'شناسه ملی شرکت / کد ملی مدیریت',
				'type' => 'text',
				'desc' => 'این فیلد اختیاری است',
				'class' => 'hidden',
				'disabled' => true
			],
			'CompanyEconomicCode' => [
				'id' => 'CompanyEconomicCode',
				'name' => 'کد اقتصادی شرکت',
				'type' => 'text',
				'desc' => 'این فیلد اختیاری است',
				'class' => 'hidden',
				'disabled' => true
			],
			'AddressFullName' => [
				'id' => 'AddressFullName',
				'name' => 'نام انباردار',
				'type' => 'text',
				'desc' => 'یا فردی که سفارشات را تحویل نماینده لینک میدهد',
				'required' => true,
				'class' => 'hidden',
				'disabled' => true
			],
			'AddressCellPhone' => [
				'id' => 'AddressCellPhone',
				'name' => 'شماره همراه انباردار',
				'type' => 'text',
				'desc' => 'یا فردی که سفارشات را تحویل نماینده لینک میدهد',
				'required' => true,
				'class' => 'hidden',
				'disabled' => true
			],
		];
		$editProfileFields = [
			'admin_title' => [
				'id' => 'admin_title',
				'name' => 'ویرایش اطلاعات',
				'type' => 'header',
				'desc' => '<button type="submit" name="logout" class="auth-button logout">خروج</button>'
			],
			'api_username' => [
				'id' => 'api_username',
				'name' => 'نام کاربری',
				'type' => 'text',
				'disabled' => true
			],
			'FirstName' => [
				'id' => 'FirstName',
				'name' => 'نام مدیریت',
				'type' => 'text',
			],
			'LastName' => [
				'id' => 'LastName',
				'name' => 'نام خانوادگی مدیریت',
				'type' => 'text',
			],
			'CellPhone' => [
				'id' => 'CellPhone',
				'name' => 'شماره همراه',
				'type' => 'text',
			],
			'Email' => [
				'id' => 'Email',
				'name' => 'ایمیل',
				'type' => 'text',
			],
			'Address' => [
				'id' => 'Address',
				'name' => 'آدرس محل جمع آوری مرسولات',
				'type' => 'text',
			],
			'CompanyRegistrationNumber' => [
				'id' => 'CompanyRegistrationNumber',
				'name' => 'شناسه ملی شرکت / کد ملی مدیریت',
				'type' => 'text',
				'desc' => 'این فیلد اختیاری است',
			],
			'CompanyEconomicCode' => [
				'id' => 'CompanyEconomicCode',
				'name' => 'کد اقتصادی شرکت',
				'type' => 'text',
				'desc' => 'این فیلد اختیاری است',
			],
			'AddressFullName' => [
				'id' => 'AddressFullName',
				'name' => 'نام انباردار',
				'type' => 'text',
				'desc' => 'یا فردی که سفارشات را تحویل نماینده لینک میدهد'
			],
			'AddressCellPhone' => [
				'id' => 'AddressCellPhone',
				'name' => 'شماره همراه انباردار',
				'type' => 'text',
				'desc' => 'یا فردی که سفارشات را تحویل نماینده لینک میدهد'
			],
		];


		return Helper::isApiEntered() ? $editProfileFields : array_merge($loginFields, $registrationFields);
	}

	public function registerMenu(): void
	{
		add_menu_page(
			'لینک اکسپرس',
			'لینک اکسپرس',
			'manage_options',
			Constants::settingsSlug(),
			[
				$this,
				'render_settings'
			],
			app()::getFileUrl('resources/images/dashicon.svg')
		);
	}

	public function get_settings(): ?array
	{
		$settings = get_option(Constants::settingsSlug()) ?? null;
		if (!$settings) {
			update_option(Constants::settingsSlug(), []);
		}

		return apply_filters('link_express_get_settings', $settings);
	}

	public function registerSettings(): void
	{
		if (!get_option(Constants::settingsSlug()))
			add_option(Constants::settingsSlug());


		foreach ($this->get_registered_settings() as $tab => $settings) {
			add_settings_section(
				Constants::settingsSlug() . '_' . $tab,
				__return_null(),
				'__return_false',
				Constants::settingsSlug() . '_' . $tab,
			);

			if (empty($settings)) {
				return;
			}

			foreach ($settings as $option) {
				$name = $option['name'] ?? '';

				add_settings_field(
					Constants::settingsSlug() . '[' . $option['id'] . ']',
					$name,
					[$this, $option['type'] . '_callback'],
					Constants::settingsSlug() . '_' . $tab,
					Constants::settingsSlug() . '_' . $tab,
					[
						'id' => $option['id'] ?? null,
						'desc' => !empty($option['desc']) ? $option['desc'] : '',
						'name' => $option['name'] ?? null,
						'after_input' => $option['after_input'] ?? null,
						'section' => $tab,
						'class' => $option['class'] ?? null,
						'size' => $option['size'] ?? null,
						'options' => $option['options'] ?? '',
						'std' => $option['std'] ?? '',
						'disabled' => $option['disabled'] ?? false
					]
				);

				register_setting(Constants::settingsSlug(), Constants::settingsSlug(), [$this, 'settings_sanitize']);
			}
		}
	}

	public function getTabs(): array
	{
		return [
			'general' => 'عمومی',
			'woocommerce' => 'ووکامرس',
			'authentication' => 'اطلاعات api',
			'other' => 'سایر',
		];
	}

	public function getTabIcons(): array
	{
		return [
			'general' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sliders"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>',
			'woocommerce' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>',
			'authentication' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-key"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>',
			'other' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
		];
	}

	public function settings_sanitize(array $input = []): false|array|null
	{

		if (empty($_POST['_wp_http_referer'])) {
			return $input;
		}

		parse_str($_POST['_wp_http_referer'], $referrer);

		$settings = $this->get_registered_settings();
		$tab = $referrer['tab'] ?? 'wp';

		$input = $input ? $input : array();
		$input = apply_filters('link_express_settings_' . $tab . '_sanitize', $input);

		// Loop through each setting being saved and pass it through a sanitization filter
		foreach ($input as $key => $value) {

			// Get the setting type (checkbox, select, etc)
			$type = $settings[$tab][$key]['type'] ?? false;

			if ($type) {
				// Field type specific filter
				$input[$key] = apply_filters('link_express_settings_sanitize_' . $type, $value, $key);
			}

			// General filter
			$input[$key] = apply_filters('link_express_settings_sanitize', $value, $key);
		}

		// Loop through the whitelist and unset any that are empty for the tab being saved
		if (!empty($settings[$tab])) {
			foreach ($settings[$tab] as $key => $value) {

				// settings used to have numeric keys, now they have keys that match the option ID. This ensures both methods work
				if (is_numeric($key)) {
					$key = $value['id'];
				}

				if (empty($input[$key])) {
					unset($this->options[$key]);
				}
			}
		}


		// Merge our new settings with the existing
		$output = array_merge($this->options, $input);

		if ($tab === 'authentication') {
			$output = $this->check_auth($output, $input);
		} else {
			add_settings_error('link_express-notices', '', 'تنظیمات ذخیره شد.', 'updated');
		}


		return $output;
	}

	public function check_auth($output, $input)
	{
        if(isset($_POST['logout'])) {
            return [];
        }
		$fields = $this->get_registered_settings();
		$isRegistering = isset($input['api_username']) || isset($input['api_password']);
		if ($isRegistering) {
			$fields = array_intersect_key($fields['authentication'], $input);
		}
		$has_error = false;
		foreach ($fields as $field) {
			if (!empty($field['required']) and (!isset($input[$field['id']]) or empty($input[$field['id']]))) {
				$message = 'فیلد ' . $field['name'] . ' ضروری است';
				add_settings_error('link_express-notices', '', $message, 'error');
				$has_error = true;
				break;
			}
		}

		if ($isRegistering && $has_error = !ValidateApiCredentials::run($input['api_username'], $input['api_password'])) {
			add_settings_error('link_express-notices', '', 'اطلاعات api بدرستی وارد نشده است.', 'error');
			unset($output['api_username']);
			unset($output['api_password']);
		}

		if ($has_error || $isRegistering) {
			return $output;
		}

		if (!Helper::isApiEntered()) {
			$request = Register::make($input);
			$result = $request->request();
			if (!empty($result['status']) and $result['status'] == 'success') {
				$output['api_username'] = $input['Username'];
				$output['api_password'] = $input['Password'];
				$output['guid'] = $result['body']['guid'];
				$output['accountGuid'] = $result['body']['accountGuid'];
				unset($output['Username']);
				unset($output['Password']);
				unset($output['CompanyName']);
				add_settings_error('link_express-notices', '', $result['message'], 'updated');
			} else {
				add_settings_error('link_express-notices', '', $result['message'], 'error');
			}

		} else {
			$output['api_username'] = getOption('api_username');
			$output['api_password'] = getOption('api_password');
			$request = UpdateBasicUserInfo::make($input);
			$result = $request->request();
			if (!empty($result['status']) and $result['status'] == 'success') {
				add_settings_error('link_express-notices', '', $result['message'], 'updated');
			} else {
				add_settings_error('link_express-notices', '', $result['message'], 'error');
			}
		}
		return $output;
	}

	public function get_registered_settings()
	{
		return apply_filters('link_express_registered_settings', [
			'general' => apply_filters('link_express_general_settings', [
				'admin_title' => [
					'id' => 'admin_title',
					'name' => 'مقادیر پیشفرض',
					'type' => 'header'
				],
				'companyTrackingCode' => [
					'id' => 'companyTrackingCode',
					'name' => 'کد مرسوله',
					'type' => 'text',
					'desc' => 'میتوانید از ترکیب کد کوتاه {order_id} با حروف و اعداد دیگر استفاده کنید.',
					'std' => '{order_id}'
				],
				'deliveryType' => [
					'id' => 'deliveryType',
					'name' => 'نوع ماموریت',
					'type' => 'select',
					'options' => link_express_delivery_types()
				],
				'parcelType' => [
					'id' => 'parcelType',
					'name' => 'نوع مرسوله',
					'type' => 'select',
					'options' => parcelTypes()
				],
				'parcelValue' => [
					'id' => 'parcelValue',
					'name' => 'بیمه مرسوله',
					'type' => 'select',
					'options' => [
						0 => 'غیرفعال',
						1 => 'فعال'
					],
					'desc' => 'اگر بیمه حمل فعال باشد مرسولاتی که ارزششان بیشتر از ۵ میلیون ریال هست ۱ هزارم ارزش مرسوله به عنوان کارمزد بیمه دریافت خواهد شد'
				],
				'generateBarcode' => [
					'id' => 'generateBarcode',
					'name' => 'چاپ برچسب سفارش',
					'type' => 'select',
					'options' => [
						0 => 'غیرفعال',
						1 => 'فعال'
					],
					'desc' => 'در صورت فعال بودن، درخواست بارکد به لینک اکسپرس ارسال میشود.'
				],
			]),
			'woocommerce' => apply_filters('link_express_woocommerce_settings', [
				'link-statuses' => [
					'id' => 'link-statuses',
					'name' => 'وضعیت‌های ارسال به لینک',
					'type' => 'multiselect',
					'options' => wc_get_order_statuses(),
					'std' => ['wc-processing'],
					'class' => 'searchable right',
					'desc' => 'گزینه ارسال به لینک، در وضعیت های انتخابی نمایش داده میشود. در صورت غیر فعال بودن، در تمام وضعیت های سفارش، گزینه ارسال با لینک نمایش داده میشود.'
				],
				'status-after-link' => [
					'id' => 'status-after-link',
					'name' => 'وضعیت سفارش بعد از ارسال به لینک',
					'type' => 'select',
					'class' => 'searchable right',
					'options' => wc_get_order_statuses(),
					'desc' => 'بعد از ارسال به لینک، وضعیت سفارش به وضعیت انتخابی تغییر میکند. در صورت غیر فعال بودن، وضعیت سفارش تغییری نمیکند.'
				],
			]),
			'authentication' => apply_filters('link_express_authentication_settings', []),
			'other' => apply_filters('link_express_link_settings', [
				'link_express' => [
					'id' => 'link_express',
					'name' => 'لینک اکسپرس',
					'type' => 'header'
				],
				'required_forms' => [
					'id' => 'required_forms',
					'name' => 'فرم‌های مورد نیاز',
					'type' => 'html',
					'options' => sprintf('<a href="https://linkexpress.ir/woocommerce/?u=%s" class="auth-button required-forms" target="_blank">مشاهده</a>', getOption('api_username'))
				],
				'admin_title' => [
					'id' => 'admin_title',
					'name' => 'هماهنگی با افزونه های دیگر',
					'type' => 'header'
				],
				'woocommerce_delivery_time' => [
					'id' => 'woocommerce_delivery_time',
					'name' => 'زمان ارسال کالا',
					'type' => 'html',
					'options' => DeliveryTime::getStructure()
				],
			]),

		]);
	}

	private function isCurrentTab(string $tab): bool
	{
		return isset($_REQUEST['page']) && $_REQUEST['page'] == Constants::settingsSlug() && isset($_REQUEST['tab']) && $_REQUEST['tab'] == $tab;
	}

	public function header_callback(array $args): void
	{
		echo sprintf(
			'<div style="display: flex; align-items: center; gap: 10px;">%s<hr style="width: 100%%"/></div>',
			$args['desc']
		);
	}

	public function html_callback(array $args): void
	{
		echo wp_kses_post($args['options']);
	}

	public function notice_callback(array $args): void
	{
		echo wp_kses_post($args['options']);
	}

	public function checkbox_callback(array $args): void
	{
		$checked = isset($this->options[$args['id']]) ? checked(1, $this->options[$args['id']], false) : '';
		$html = sprintf('<input type="checkbox" id="linkExpress-settings[%1$s]" name="linkExpress-settings[%1$s]" value="1" %2$s /><label for="linkExpress-settings[%1$s]"> ' . __('Active', 'link-express') . '</label><p class="description">%3$s</p>', esc_attr($args['id']), esc_attr($checked), wp_kses_post($args['desc']));
		echo $html;
	}

	public function multicheck_callback(array $args): void
	{
		$html = '';
		foreach ($args['options'] as $key => $value) {
			$option_name = $args['id'] . '-' . $key;
			$this->checkbox_callback([
				'id' => $option_name,
				'desc' => $value
			]);
			echo '<br>';
		}

		echo $html;
	}

	public function radio_callback(array $args): void
	{
		$html = '';
		foreach ($args['options'] as $key => $option) :
			$checked = false;

			if (isset($this->options[$args['id']]) && $this->options[$args['id']] == $key) {
				$checked = true;
			} elseif (isset($args['std']) && $args['std'] == $key && !isset($this->options[$args['id']])) {
				$checked = true;
			}
			$html .= sprintf('<input name="linkExpress-settings[%1$s]" id="linkExpress-settings[%1$s][%2$s]" type="radio" value="%2$s" %3$s /><label for="linkExpress-settings[%1$s][%2$s]">%4$s</label>&nbsp;&nbsp;', esc_attr($args['id']), esc_attr($key), checked(true, $checked, false), $option);
		endforeach;
		$html .= sprintf('<p class="description">%1$s</p>', wp_kses_post($args['desc']));
		echo $html;
	}

	public function text_callback(array $args): void
	{
		if (isset($this->options[$args['id']]) and $this->options[$args['id']]) {
			$value = $this->options[$args['id']];
		} else {
			$value = $args['std'] ?? '';
		}

		$after_input = $args['after_input'] ?? '';
		$size = $args['size'] ?? 'regular';
		$html = sprintf(
			'<input type="text" class="%1$s-text" id="linkExpress-settings[%2$s]" name="linkExpress-settings[%2$s]" value="%3$s" %6$s/>%4$s<p class="description">%5$s</p>',
			esc_attr($size),
			esc_attr($args['id']),
			esc_attr(stripslashes($value)),
			$after_input,
			wp_kses_post($args['desc']),
			$args['disabled'] ? 'disabled' : ''
		);
		echo $html;
	}

	public function number_callback(array $args): void
	{
		if (isset($this->options[$args['id']])) {
			$value = $this->options[$args['id']];
		} else {
			$value = isset($args['std']) ? $args['std'] : '';
		}

		$max = $args['max'] ?? 999999;
		$min = $args['min'] ?? 0;
		$step = $args['step'] ?? 1;
		$size = $args['size'] ?? 'regular';

		$html = sprintf('<input type="number" step="%1$s" max="%2$s" min="%3$s" class="%4$s-text" id="linkExpress-settings[%5$s]" name="linkExpress-settings[%5$s]" value="%6$s"/><p class="description"> %7$s</p>', esc_attr($step), esc_attr($max), esc_attr($min), esc_attr($size), esc_attr($args['id']), esc_attr(stripslashes($value)), wp_kses_post($args['desc']));
		echo $html;
	}

	public function textarea_callback(array $args)
	{
		if (isset($this->options[$args['id']])) {
			$value = $this->options[$args['id']];
		} else {
			$value = isset($args['std']) ? $args['std'] : '';
		}

		$html = sprintf('<textarea class="large-text" cols="50" rows="5" id="linkExpress-settings[%1$s]" name="linkExpress-settings[%1$s]">%2$s</textarea><p class="description"> %3$s</p>', esc_attr($args['id']), esc_textarea(stripslashes($value)), wp_kses_post($args['desc']));
		echo $html;
	}

	public function password_callback(array $args): void
	{
		if (isset($this->options[$args['id']])) {
			$value = $this->options[$args['id']];
		} else {
			$value = $args['std'] ?? '';
		}

		$size = $args['size'] ?? 'regular';
		$html = sprintf('<input type="password" class="%1$s-text" id="linkExpress-settings[%2$s]" name="linkExpress-settings[%2$s]" value="%3$s"/><p class="description"> %4$s</p>', esc_attr($size), esc_attr($args['id']), esc_attr($value), wp_kses_post($args['desc']));

		echo $html;
	}

	public function missing_callback(array $args): bool
	{
		echo '&ndash;';

		return false;
	}

	public function select_callback(array $args): void
	{
		if (isset($this->options[$args['id']])) {
			$value = $this->options[$args['id']];
		} else {
			$value = $args['std'] ?? '';
		}

		$class = $args['class'] ?? '';
		$class .= ' wc-enhanced-select right';
		$html = sprintf('<select id="linkExpress-settings[%1$s]" name="linkExpress-settings[%1$s]" class="%2$s">', esc_attr($args['id']), $class);

		foreach ($args['options'] as $option => $name) {
			$selected = selected($option, $value, false);
			$html .= sprintf('<option value="%1$s" %2$s>%3$s</option>', esc_attr($option), esc_attr($selected), $name);
		}

		$html .= sprintf('</select><p class="description"> %1$s</p>', wp_kses_post($args['desc']));

		echo $html;
	}

	public function multiselect_callback(array $args): void
	{
		if (isset($this->options[$args['id']])) {
			$value = $this->options[$args['id']];
		} else {
			$value = $args['std'] ?? '';
		}

		$class = $args['class'] ?? '';
		$class .= ' wc-enhanced-select';
		$html = sprintf('<select id="linkExpress-settings[%1$s]" name="linkExpress-settings[%1$s][]" multiple class="%2$s"/>', esc_attr($args['id']), $class);
		$selected = '';

		foreach ($args['options'] as $option => $name) :
			if (isset($value) and is_array($value)) {
				if (in_array($option, $value)) {
					$selected = " selected='selected'";
				} else {
					$selected = '';
				}
			}
			$html .= sprintf('<option value="%1$s" %2$s>%3$s</option>', esc_attr($option), esc_attr($selected), $name);
		endforeach;

		$html .= sprintf('</select><p class="description"> %1$s</p>', wp_kses_post($args['desc']));

		echo $html;
	}

	public function color_select_callback(array $args): void
	{
		if (isset($this->options[$args['id']])) {
			$value = $this->options[$args['id']];
		} else {
			$value = isset($args['std']) ? $args['std'] : '';
		}

		$html = sprintf('<select id="linkExpress-settings[%1$s]" name="linkExpress-settings[%1$s]">', esc_attr($args['id']));

		foreach ($args['options'] as $option => $color) :
			$selected = selected($option, $value, false);
			$html .= esc_attr('<option value="%1$s" %2$s>%3$s</option>', esc_attr($option), esc_attr($selected), $color['label']);
		endforeach;

		$html .= sprintf('</select><p class="description"> %1$s</p>', wp_kses_post($args['desc']));

		echo $html;
	}

	public function upload_callback(array $args): void
	{
		if (isset($this->options[$args['id']])) {
			$value = $this->options[$args['id']];
		} else {
			$value = $args['std'] ?? '';
		}

		$size = (isset($args['size']) && !is_null($args['size'])) ? $args['size'] : 'regular';
		$html = sprintf('<input type="text" class="%1$s-text link_express_upload_field" id="linkExpress-settings[%2$s]" name="linkExpress-settings[%2$s]" value="%3$s"/><span>&nbsp;<input type="button" class="linkExpress-settings_upload_button button-secondary" value="%4$s"/></span><p class="description"> %5$s</p>', esc_attr($size), esc_attr($args['id']), esc_attr(stripslashes($value)), __('Upload File', 'link_express'), wp_kses_post($args['desc']));

		echo $html;
	}

	public function color_callback(array $args): void
	{
		if (isset($this->options[$args['id']])) {
			$value = $this->options[$args['id']];
		} else {
			$value = $args['std'] ?? '';
		}

		$default = $args['std'] ?? '';
		$html = sprintf('<input type="text" class="link_express-color-picker" id="linkExpress-settings[%1$s]" name="linkExpress-settings[%1$s]" value="%2$s" data-default-color="%3$s" /><p class="description"> %4$s</p>', esc_attr($args['id']), esc_attr($value), esc_attr($default), wp_kses_post($args['desc']));

		echo $html;
	}

	public function render_settings(): void
	{
		$active_tab = isset($_GET['tab']) && array_key_exists($_GET['tab'], $this->getTabs()) ? sanitize_text_field($_GET['tab']) : 'general';

		ob_start();
		?>

        <div class="link-express-head">
            <div class="div-txt-top w-clearfix">
                <h1>لینک اکسپرس
                    <span class="txt-white">توزیع و تحویل هوشمند مرسولات</span>
                </h1>
                <div class="div-hl-mini">
                    <h2 class="txt-hl-mini">Intelligent dispatch &amp; deliver</h2>
                </div>
            </div>
            <img src="<?php echo app()::getFileUrl('resources/images/logo.svg'); ?>" alt="">
        </div>
        <div class="wrap link-express-notices">
			<?php settings_errors('link_express-notices'); ?>
        </div>
        <div class="wrap link_express-wrap link_express-settings-wrap">

			<?php do_action('link_express_settings_page'); ?>
            <div class="link_express-tab-group">
                <ul class="link_express-tab">
					<?php
					foreach ($this->getTabs() as $tab_id => $tab_name) {

						$tab_url = add_query_arg([
							'settings-updated' => false,
							'tab' => $tab_id
						]);

						$active = $active_tab == $tab_id ? 'active' : '';

						echo sprintf(
							'<li><a href="%s" title="%s" class="%s">%s%s</a></li>',
							esc_url($tab_url),
							esc_attr($tab_name),
							$active,
							array_key_exists($tab_id, $this->getTabIcons()) ? $this->getTabIcons()[$tab_id] : '',
							$tab_name
						);
					}
					?>
                </ul>
                <div class="link_express-tab-content">
                    <form method="post" action="options.php">
                        <table class="form-table">
							<?php
							settings_fields(Constants::settingsSlug());
							do_settings_fields(Constants::settingsSlug() . '_' . $active_tab, Constants::settingsSlug() . '_' . $active_tab);
							?>
                        </table>
						<?php submit_button(); ?>
                    </form>
                </div>
            </div>
        </div>
		<?php
		echo ob_get_clean();
	}
}