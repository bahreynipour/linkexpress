<?php

namespace LinkExpress;

class Label
{
    public function __construct() {
        add_action('init', [$this, 'label_page']);
    }

    public function label_page() {
        if(empty($_GET['action']) or $_GET['action'] != 'linkexpress-label')
            return '';

        $orderId = $_GET['orderId'] ?? null;

        if($orderId) {
            $order = wc_get_order($orderId);
            if(!$order) {
                wp_redirect(admin_url());
            } else {
                echo view('admin.order.label.label', ['order' => $order]);
            }
        }
        die();
    }
}