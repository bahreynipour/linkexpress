<?php use LinkExpress\API\OrderTrack; ?>

<h3>اطلاعات درخواست</h3>

<div class="row">

<?php
$data = get_post_meta($orderId, LinkExpress()->get_submitted_data_meta_name(), true);
$tracking_code = get_post_meta($orderId, LinkExpress()->get_tracking_code_meta_name(), true);
if(!empty($data)):
    ?>
        <div class="col-md-6">
            کد رهگیری:
        </div>
        <div class="col-md-6 ltr">
            <?php echo $tracking_code; ?>
        </div>
        <div class="col-md-6">
            تاریخ ارسال:
        </div>
        <div class="col-md-6 ltr">
            <?php echo date_i18n('Y/m/d H:i', $data['sendDate']); ?>
        </div>
        <div class="col-md-6">
            شیفت ارسال:
        </div>
        <div class="col-md-6 ltr">
            <?php $city = $city == 'تهران'  ? 'tehran' : 'other'; ?>
            <?php echo getShifts()[$city][$data['shift']]; ?>
        </div>
<?php else: ?>
    <div class="col-md-12">
        <p>اطلاعاتی یافت نشد. برای دریافت اطلاعات میتوانید از رهگیری مرسوله استفاده کنید.</p>
    </div>
<?php endif; ?>
</div>

