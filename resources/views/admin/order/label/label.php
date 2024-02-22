<?php

use function LinkExpress\view;

$sender_address = LinkExpress()->option('Address');
$link_data = get_post_meta($order->get_id(), LinkExpress()->get_submitted_data_meta_name(), true);
$tracking_code = get_post_meta($order->get_id(), LinkExpress()->get_tracking_code_meta_name(), true);
$template = (!empty($link_data['ptype']) and $link_data['ptype'] != 1) ? 'pishtaz' : 'link';

?>

<!DOCTYPE html>
<html dir="rtl" lang="fa-IR">
<head>
    <title>linkexpress-label-<?php echo $order->get_id(); ?></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no">
    <meta name="fontiran.com:license" content="P8B2XP">
    <style type="text/css">
        <?php echo view('admin.order.label.style'); ?>
    </style>
</head>
<body class="label">
    <div class="container">
        <?php echo view('admin.order.label.' . $template, ['order' => $order, 'data' => $link_data, 'tracking_code' => $tracking_code]); ?>
    </div>
    <div class="print">
        <a href="#" class="button" onclick="window.print()">چاپ این برگه</a>
    </div>


</body>
</html>