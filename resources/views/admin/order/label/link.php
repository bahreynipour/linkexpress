<?php
/**
 * @var Order $order
 */

use LinkExpress\Helper;
use LinkExpress\Objects\Order;
use function LinkExpress\parcelTypes;

$sendDataArray = [$order->getSendDate(), $order->getShift()];

if ($order->getAmount()) {
	$sendDataArray[] = 'دارای مبلغ';

}
?>
<table>
    <tbody>
    <tr>
        <td>گیرنده</td>
        <td><?php echo $order->getCustomerName(); ?></td>

        <td rowspan="4" class="qrcode">
			<?php
			if ($barcode = $order->getBarcodeData()):
				echo '<img src="data:image/png;base64, ' . $barcode . '"';
			else:
				echo Helper::generateQrCode($order->getTrackingCode());
			endif;
			?>
        </td>
    </tr>
    <tr>
        <td>کد رهگیری</td>
        <td><?php echo $order->getTrackingCode(); ?></td>
    </tr>
    <tr>
        <td>فرستنده</td>
        <td>
			<?php printf(
				'لینک%s',
				$order->getOrderLinkData('parcelType')
					? ' - ' . parcelTypes()[$order->getOrderLinkData('parcelType')]
					: ''
			);
			?>
        </td>
    </tr>
    <tr>
        <td>تاریخ تحویل</td>
        <td><?php echo implode(' - ', $sendDataArray); ?></td>
    </tr>
    </tbody>
</table>

<table class="foot">
    <tfoot>
    <tr>
        <th style="text-align: right">ارسال شده توسط لینک اکسپرس</th>
        <th style="text-align: left">
            www.LinkExpress.ir
        </th>
    </tr>
    </tfoot>
</table>