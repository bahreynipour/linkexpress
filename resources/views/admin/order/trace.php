<?php

use LinkExpress\Actions\TrackOrder;
use LinkExpress\API\OrderTrack;
use LinkExpress\Objects\Order;
use function LinkExpress\getPaymentMethodName;
use function LinkExpress\getStateName;
use function LinkExpress\getTrackingAmount;
use function LinkExpress\getTrackingArrayInfo;
use function LinkExpress\linkDate;

/**
 * @var OrderTrack $request
 * @var array $traceData
 * @var Order $order
 */

$trackData = TrackOrder::run($order);
$traces = $order->getTraceData();
?>
<div class="tracking-wrapper">

    <div class="traces">
		<?php foreach ($traces as $trace) { ?>
            <div class="trace-item">
                <div class="description">
					<?php
					echo match ($trace['state']) {
						1 => 'درخواست به لینک اکسپرس ارسال شد.',
						default => sprintf('%s<span>%s</span>%s', 'وضعیت درخواست به ', getStateName($trace['state']), 'تغییر کرد.')
					};
					?>
                </div>
				<?php
				echo linkDate(
					'Y/m/d H:i',
					$trace['done_date'],
					(new DateTimeZone('Asia/Tehran'))
				);
				?>
            </div>
		<?php } ?>
    </div>

    <div class="tracking-data">
		<?php foreach (getTrackingArrayInfo($trackData) as $item) { ?>
            <div class="tracking-item">
                <div class="title"><?php echo $item[0]; ?></div>
                <div class="content"><?php echo $item[1]; ?></div>
            </div>
		<?php } ?>
    </div>
</div>
