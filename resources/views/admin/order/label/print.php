<?php

use LinkExpress\Objects\Order;
use function LinkExpress\getOption;
use function LinkExpress\view;

/**
 * @var string $ids
 */

$orders = array_map(
	fn($id) => Order::make($id),
	explode(',', $ids)
);

?>

<!DOCTYPE html>
<html dir="rtl" lang="fa-IR">
<head>
    <title>LinkExpress Label</title>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap');

        @page {
            margin-top: 1cm;
            margin-bottom: 3cm;
            margin-left: 2cm;
            margin-right: 2cm;
        }

        body {
            font-family: "Vazirmatn", sans-serif;
            font-optical-sizing: auto;
            font-weight: 200;
            font-style: normal;
            background: #fff;
            color: #000;
            margin: 0;
            font-size: 9pt;
            line-height: 100%; /* fixes inherit dompdf bug */
            overflow-wrap: anywhere;
        }

        /* Basic Table Styling */
        table {
            border-collapse: collapse;
            border-spacing: 0;
            page-break-inside: always;
            margin: 0;
            padding: 0;
            width: 100%;
        }

        table, td, th {
            border: 1px solid #000;
        }

        table:not(.heading, .foot) td:not(.qrcode, .barcode) {
            padding: 10px;
        }

        table.heading {
            border-bottom: none;
        }

        table.foot {
            border-top: none;
        }

        @media print {

            body {-webkit-print-color-adjust: exact;}

            .print {
                display: none !important;
            }

        }

        table.heading thead th,
        table.foot tfoot th {
            color: white;
            background-color: black !important;
            border-color: black;
        }

        table.heading th,
        table.foot th{
            border: none;
            padding: 10px;
        }

        table td.qrcode,
        table td.barcode {
            vertical-align: middle;
            text-align: center;
            width: 4cm;
            height: 4cm;
            padding: 10px;
        }

        table td.qrcode img,
        table td.barcode img {
            max-width: 4cm;
        }

        div.bottom-spacer {
            clear: both;
            height: 8mm;
        }

        .link-label {
            margin-bottom: 50px;
        }

        table:not(.heading) td:first-child {
            text-align: center;
            background-color: #f3f3f3;
            font-weight: bold;
        }

        .print {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .print .button {
            background: #000;
            color: #FFF;
            text-decoration: none;
            padding: 10px;
            margin-top: 100px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
<div class="container">
	<?php
	foreach ($orders as $order):
		if (!$order->getTrackingCode()) {
			continue;
		}
		$data = $order->getOrderLinkData();
		$pType = intval($data['ptype'] ?? 1);
		$template = $pType === 1 ? 'link' : 'pishtaz';

		echo '<div class="link-label">';

		echo view('admin.order.label.' . $template, [
			'order' => $order,
			'senderAddress' => getOption('Address')
		]);

		echo '<div class="bottom-spacer"></div>';
		echo '<div style="page-break-before: always;"></div>';
		echo '</div>';
	endforeach;
	?>
</div>
<div class="print">
    <a href="#" class="button" onclick="window.print()">چاپ این برگه</a>
</div>

</body>
</html>