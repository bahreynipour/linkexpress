<?php
use LinkExpress\API\OrderTrack;
use LinkExpress\Order;
?>

<h3>آخرین وضعیت درخواست:</h3>

<div class="row">

<?php
$history = Order::getTraceData($orderId);
$trackingCode = Order::getTrackingCode($orderId);
if(!empty($data)):
    $latestTrackData = end($history);
    $args['trackingCode'] = $trackingCode;
    $request = new OrderTrack($args);
    ?>
        <div class="col-md-6">
            تاریخ آخرین بررسی:
        </div>
        <div class="col-md-6 ltr">
            <?php echo date_i18n('Y/m/d H:i', $latestTrackData['last_tracking_date']); ?>
        </div>
        <div class="col-md-6">
            آخرین بررسی:
        </div>
        <div class="col-md-6">
            <?php echo $request->getTrackingState($latestTrackData['state']); ?>
        </div>
        <?php if(!LinkExpress()->is_cancelled_request($orderId)): ?>
        <div class="col-md-12">
            <span class="status-notice">
                اطلاعات بالا ممکن است بروز نباشند. برای بروزرسانی اطلاعات و یا دریافت اطلاعات بیشتر از دکمه رهگیری سفارش استفاده کنید.
            </span>
        </div>
        <?php endif; ?>
<?php else: ?>
    <div class="col-md-12">
        <p>اطلاعاتی یافت نشد. برای دریافت اطلاعات میتوانید از رهگیری مرسوله استفاده کنید.</p>
    </div>
<?php endif; ?>
</div>

