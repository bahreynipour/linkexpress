<?php namespace LinkExpress;

use Automattic\WooCommerce\Internal\DataStores\Orders\CustomOrdersTableController;
use LinkExpress\API\GetCreditBalance;
use LinkExpress\Services\Ajax;
use LinkExpress\Services\OrderAction;
use WC_Order;
use WP_Admin_Bar;
use WP_Post;

class Order
{
	public function __construct()
	{

		$this->apiHooks();
		$this->labelHooks();

		add_action('admin_bar_menu', [$this, 'adminBar'], 100);

		add_action('add_meta_boxes', [$this, 'setupLinkMetaBox']);

		add_filter('manage_edit-shop_order_columns', [$this, 'addLinkOrderColumn']);
		add_filter('manage_woocommerce_page_wc-orders_columns', [$this, 'addLinkOrderColumn']);

		add_action('manage_shop_order_posts_custom_column', [$this, 'addLinkOrderColumnContent'], 10, 2);
		add_action('manage_woocommerce_page_wc-orders_custom_column', [$this, 'addLinkOrderColumnContent'], 10, 2);

		new OrderAction();
	}

	protected function apiHooks(): void
	{
		add_filter('link_express_api_body_data', function ($data) {
			if (empty($data['state']))
				return $data;

			$state = Helper::getStateTitle($data['state']);

			if (!empty($state))
				$data['state'] = $state;

			return $data;
		});
	}

	protected function labelHooks()
	{
		add_action('current_screen', function () {
			if (!current_user_can('manage_woocommerce')) {
				return;
			}

			add_filter('bulk_actions-edit-shop_order', [$this, 'bulkActions']);
			add_filter('bulk_actions-woocommerce_page_wc-orders', [$this, 'bulkActions']);
		});

		Ajax::make('generateLinkLabel')->do(function (Ajax $ajax) {
			$ajax->errorIf(
				empty($_REQUEST['order_ids']),
				'سفارشی یافت نشد'
			)->view('admin.order.label.print', [
				'ids' => $_REQUEST['order_ids']
			]);
		});

	}

	public function bulkActions($actions)
	{
		$actions['link-bulk-print-labels'] = 'پرینت برچسب لینک';

		return $actions;
	}

	public function adminBar(WP_Admin_Bar $wp_admin_bar)
	{
		if (!is_admin()) {
			return;
		}

		if (!current_user_can('manage_woocommerce')) {
			return;
		}

		$accountGuid = getOption('accountGuid');

		if (!$accountGuid) {
			return;
		}

//		$t = GetCreditBalance::make(['accountGuid' => $accountGuid])->request();

		$wp_admin_bar->add_menu(
			array(
				'id' => app()->getName() . '-balance',
				'parent' => null,
				'title' => sprintf('اعتبار لینک: %s', 'نامشخص'),
			)
		);
	}

	function addLinkOrderColumn(array $columns): array
	{
		return array_merge(
			$columns,
			['link_express' => view('components.group', ['components' =>
				[
					[
						'components.button',
						[
							'class' => 'transparent',
							'label' => 'لینک اکسپرس'
						]
					],
					[
						'components.button',
						[
							'action' => 'TraceOrders',
							'class' => ['success', 'small'],
							'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rotate-cw"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>'
						]
					]
				]
			])]
		);
	}

	public function addLinkOrderColumnContent(string $column_name, WC_Order|WP_Post|int $order): void
	{
		$order = is_int($order)
			? wc_get_order($order)
			: ($order instanceof WP_Post ? wc_get_order($order->ID) : $order);

		if ('link_express' !== $column_name)
			return;

		echo self::getActionsHtml(Objects\Order::make($order));
	}

	public function setupLinkMetaBox(): void
	{
		$screen = wc_get_container()->get(CustomOrdersTableController::class)->custom_orders_table_usage_is_enabled()
			? wc_get_page_screen_id('shop-order')
			: 'shop_order';

		add_meta_box(
			'link_express_actions',
			'عملیات لینک اکسپرس',
			[$this, 'addLinkActions'],
			$screen,
			'side',
			'core'
		);
	}

	public function addLinkActions(WP_Post|WC_Order $order): void
	{
		$order = ($order instanceof WP_Post) ? wc_get_order($order->ID) : $order;

		echo self::getActionsHtml(Objects\Order::make($order));
	}

	public static function getActionsHtml(Objects\Order $order): string
	{
		/**
		 * add to link if order status meet the settings
		 */
		if (!$order->getTrackingCode()) {
			$canAdd = in_array('wc-' . $order->get_status(), getOption('link-statuses', ['wc-processing']));
			return $canAdd
				? view('components.button', [
					'action' => 'add',
					'class' => 'success',
					'order' => $order,
					'label' => 'آماده ارسال'
				])
				: view('components.button', [
					'class' => 'gray',
					'label' => 'غیرفعال'
				]);
		}

		/**
		 * cancelled actions
		 */
		if ($order->isCancelled()) {
			return view('components.group', [
				'components' => [
					[
						'components.button',
						[
							'class' => 'danger',
							'label' => 'لغو شده'
						]
					],
					[
						'components.button',
						[
							'action' => 'resend',
							'class' => ['success', 'small'],
							'order' => $order,
							'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rotate-cw"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>'
						]
					]
				]
			]);
		}


		/**
		 * operations
		 */
		$operations = [
			['components.button',
				[
					'action' => 'edit',
					'order' => $order,
					'label' => 'ویرایش مرسوله',
					'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>'
				],
			],
			['components.button',
				[
					'action' => 'track',
					'order' => $order,
					'label' => 'رهگیری مرسوله',
					'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-compass"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>'
				],
			],
			['components.button',
				[
					'action' => 'cancel',
					'order' => $order,
					'label' => 'لغو درخواست',
					'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>'
				],
			]
		];
		return view('components.group', [
			'class' => 'group-dropdown',
			'components' => [
				['components.button', [
					'order' => $order,
					'class' => ['info', 'between'],
					'label' => $order->getStateName() ?? 'عملیات',
					'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>'
				],
				],
				['components.group', ['class' => 'dropdown-items', 'components' => $operations]],
			]
		]);
	}
}