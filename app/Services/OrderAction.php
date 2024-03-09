<?php

namespace LinkExpress\Services;

use LinkExpress\Actions\ResendOrder;
use LinkExpress\Actions\traceOrders;
use LinkExpress\Actions\CancelOrder;
use LinkExpress\Actions\EditOrder;
use LinkExpress\Actions\RemoveOrder;
use LinkExpress\Actions\AddOrder;
use LinkExpress\Actions\TrackOrder;
use LinkExpress\Concerns\AjaxInteractsWithOrder;
use LinkExpress\Contracts\InteractsWithOrder;
use LinkExpress\Order;
use function LinkExpress\view;

class OrderAction implements InteractsWithOrder
{
	use AjaxInteractsWithOrder;

	public function __construct()
	{
		/**
		 * show an add order modal
		 */
		Ajax::make('showAddModal')->do(
			fn(Ajax $ajax) => $ajax->success(
				view('admin.order.modal.request_fields', ['order' => $this->getOrder()])
			)
		);

		/**
		 * show edit an order modal
		 */
		Ajax::make('showEditModal')->do(
			fn(Ajax $ajax) => $ajax
				->errorIf(
					!$this->getOrder()->getTrackingCode(),
					'کد پیگری این درخواست یافت نشد'
				)
				->errorIf(
					!$defaults = $this->getOrder()->getOrderLinkData(),
					'اطلاعات این درخواست یافت نشد'
				)
				->success(
					view(
						'admin.order.modal.request_fields',
						[
							'order' => $this->getOrder(),
							'defaults' => $defaults
						]
					)
				)
		);

		/**
		 * show resend an order modal
		 */
		Ajax::make('showResendModal')->do(
			fn(Ajax $ajax) => $ajax
				->errorIf(
					!$this->getOrder()->getTrackingCode(),
					'کد پیگری این درخواست یافت نشد'
				)
				->errorIf(
					!$defaults = $this->getOrder()->getOrderLinkData(),
					'اطلاعات این درخواست یافت نشد'
				)
				->success(
					view(
						'admin.order.modal.resend',
						[
							'order' => $this->getOrder(),
						]
					)
				)
		);

		/**
		 * show track modal
		 */
		Ajax::make('showTrackModal')->do(
			fn(Ajax $ajax) => $ajax->success(
				view('admin.order.trace', ['order' => $this->getOrder(), 'history' => TrackOrder::run($this->getOrder())])
			)
		);

		/**
		 * show cancel modal
		 */
		Ajax::make('showCancelModal')->do(
			fn(Ajax $ajax) => $ajax
				->errorIf(
					!$this->getOrder()->getTrackingCode(),
					'کد پیگری این درخواست یافت نشد'
				)
				->success(
					view('admin.order.modal.cancel', ['order' => $this->getOrder()])
				)
		);

		/**
		 * show remove modal
		 */
		Ajax::make('showRemoveModal')->do(
			fn(Ajax $ajax) => $ajax
				->errorIf(
					!$this->getOrder()->getTrackingCode(),
					'کد پیگری این درخواست یافت نشد'
				)
				->success(
					view('admin.order.modal.remove', ['order' => $this->getOrder()])
				)
		);

		/**
		 * load actions
		 */
		Ajax::make('loadActions')->do(
			fn(Ajax $ajax) => $ajax->success(
				Order::getActionsHtml($this->getOrder())
			)
		);

		/**
		 * add an order
		 */
		Ajax::make('linkAdd')->do(
			fn(Ajax $ajax) => $ajax->jsonResponse(
				message: AddOrder::run($this->getOrder()),
				withCatch: true
			)
		);

		/**
		 * edit an order
		 */
		Ajax::make('linkEdit')->do(
			fn(Ajax $ajax) => $ajax->jsonResponse(
				message: EditOrder::run($this->getOrder()),
				withCatch: true
			)
		);

		/**
		 * cancel an order
		 */
		Ajax::make('cancelOrder')->do(
			fn(Ajax $ajax) => $ajax->jsonResponse(
				message: CancelOrder::run($this->getOrder()),
				withCatch: true
			)
		);

		/**
		 * remove an order
		 */
		Ajax::make('removeOrder')->do(
			fn(Ajax $ajax) => $ajax->jsonResponse(
				message: RemoveOrder::run($this->getOrder()),
				withCatch: true
			)
		);

		/**
		 * resend an order
		 */
		Ajax::make('linkResend')->do(
			fn(Ajax $ajax) => $ajax->jsonResponse(
				message: ResendOrder::run($this->getOrder()),
				withCatch: true
			)
		);

		/**
		 * bulk track orders
		 */
		Ajax::make('traceOrders')->do(
			fn(Ajax $ajax) => $ajax->jsonResponse(
				message: is_array(traceOrders::run()) ? 'بروزرسانی انجام شد.' : '',
				withCatch: true
			)
		);

	}

	public function make()
	{
		return new static();
	}
}