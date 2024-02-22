<?php

$orderId = $order->get_id();
$first_name = !empty($order->get_shipping_first_name()) ? $order->get_shipping_first_name() : $order->get_billing_first_name();
$last_name = !empty($order->get_shipping_last_name()) ? $order->get_shipping_last_name() : $order->get_billing_last_name();
$reciever_full_name = $first_name . ' ' . $last_name;
$tracking_code = get_post_meta($orderId, LinkExpress()->get_tracking_code_meta_name(), true);
$send_date = !empty($data['sendDate']) ? date_i18n('Y/m/d', strtotime($data['sendDate'])) : false;
if($data['shift'] == 1) {
    $shift = 'صبح';
}
if($data['shift'] == 2) {
    $shift = 'عصر';
}
if($data['shift'] == 3) {
    $shift = 'صبح تا عصر';
}
$send_data_array = [$send_date, $shift];
$has_price = !empty($data['amount']) ? 'دارای مبلغ' : '';
if($has_price) {
    $send_data_array[] = $has_price;
}

$barcode = get_post_meta($orderId, LinkExpress()->get_barcode_image_meta_name(), true);
?>

<div class="link-express-label link">
    <div class="head justify-between">
        <div class="right">
            <div class="label">گیرنده : </div>
            <div class="value"><?php echo $reciever_full_name; ?></div>
        </div>
        <div class="left">
            <div class="label">کد رهگیری :‌ </div>
            <div class="value"><?php echo $data['companyTrackingCode']; ?></div>
        </div>
    </div>
    <div class="sender flex-item">
        <div class="label">فرستنده : </div>
        <div class="value">لینک - نامه</div>
    </div>
    <div class="date flex-item">
        <div class="label">تاریخ تحویل : </div>
        <div class="value"><?php echo implode(' - ', $send_data_array); ?></div>
    </div>
    <?php if(!empty($barcode)): ?>
        <div class="barcode">
            <img src="data:image/png;base64, <?php echo $barcode; ?>" />
        </div>
    <?php endif; ?>
    <div class="foot flex-item justify-between">
        <div class="right">
            <div class="label">ارسال شده توسط لینک اکسپرس</div>
        </div>
        <div class="left">
            <div class="label">www.LinkExpress.ir</div>
        </div>
    </div>
</div>