<?php
/**
 * @var Order $order
 */

use LinkExpress\Helper;
use LinkExpress\Objects\Order;
use function LinkExpress\getLinkExpressCompanyAddress;

?>

<table class="heading">
    <thead>
    <tr>
        <th style="text-align: right">تهیه شده توسط لینک</th>
        <th style="text-align: left">
			<?php printf('کد سفارش: #%s', $order->getOrderLinkData('companyTrackingCode')); ?>
        </th>
    </tr>
    </thead>
</table>
<table>
    <tbody>
    <tr>
        <td>فرستنده</td>
        <td><?php echo getLinkExpressCompanyAddress(); ?></td>

		<?php if ($barcode = $order->getBarcodeData()): ?>
            <td rowspan="3" class="barcode">
                <img src="data:image/png;base64, <?php echo $barcode; ?>"
            </td>
		<?php else: ?>
            <td rowspan="3" class="qrcode">
				<?php echo Helper::generateQrCode($order->getTrackingCode()); ?>
            </td>
		<?php endif; ?>
    </tr>
    <tr>
        <td>نوع ارسال</td>
        <td>پیشتاز</td>
    </tr>
    <tr>
        <td>گیرنده</td>
        <td><?php echo $order->getFormattedReceiverAddress(); ?></td>
    </tr>
    </tbody>
</table>