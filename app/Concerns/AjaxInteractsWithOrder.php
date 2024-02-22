<?php

namespace LinkExpress\Concerns;

use LinkExpress\Objects\Order;

trait AjaxInteractsWithOrder
{
    public function getOrder()
    {
        $orderId = !empty($_POST['orderId']) ? esc_attr($_POST['orderId']) : false;
        if (!$orderId) {
            wp_send_json_error('خطایی در دریافت اطلاعات رخ داده است!');
        }

        if (!$order = wc_get_order($orderId)) {
            wp_send_json_error('خطایی در دریافت اطلاعات رخ داده است!');
        }


        return Order::make($order);
    }
}