<?php

use LinkExpress\Helper;

$orderId = $order->get_id();
$first_name = !empty($order->get_shipping_first_name()) ? $order->get_shipping_first_name() : $order->get_billing_first_name();
$last_name = !empty($order->get_shipping_last_name()) ? $order->get_shipping_last_name() : $order->get_billing_last_name();
$reciever_full_name = $first_name . ' ' . $last_name;

$reciever_output[] = $reciever_full_name;
$order_phone = !empty($order->get_shipping_phone()) ? $order->get_shipping_phone() : $order->get_billing_phone();
if ($order_phone) $reciever_output[] = $order_phone;
$address = !empty($order->get_formatted_shipping_address()) ? $order->get_formatted_shipping_address() : $order->get_formatted_billing_address();
$address = str_replace('<br/>', '، ', $address);
$reciever_output[] = 'آدرس';
$reciever_output[] = $address;
$barcode = get_post_meta($orderId, LinkExpress()->get_barcode_image_meta_name(), true);

?>

<div class="link-express-label pishtaz">
    <div class="head justify-between">
        <div class="right">
            <div class="label">تهیه توسط :</div>
            <div class="value">لینک</div>
        </div>
        <div class="left">
            <div class="label">کد سفارش :‌</div>
            <div class="value"><?php echo $data['companyTrackingCode']; ?></div>
        </div>
    </div>
    <div class="sender flex-item">
        <div class="label">فرستنده :</div>
        <div class="value">لینک اسکپرس آدرس : تهران فرخی یزدی آجرپز پلاک ۱۱</div>
    </div>
    <div class="code flex-item justify-between">
        <div class="right">
            <div class="label">نوع ارسال:</div>
            <div class="value">پست پیشتاز</div>
        </div>

        <div class="left barcode">
            <?php if (!empty($barcode)): ?>
                <img src="data:image/png;base64, <?php echo $barcode; ?>"/>
            <?php endif;
            if (!empty($tracking_code)):
                echo Helper::generateQrCode($tracking_code);
            endif; ?>

        </div>

    </div>
    <div class="foot flex-item justify-between">
        <div class="right">
            <div class="label">گیرنده:‌</div>
            <div class="value"><?php echo implode(' - ', $reciever_output); ?></div>
        </div>
    </div>
</div>