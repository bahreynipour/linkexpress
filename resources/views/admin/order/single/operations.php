<?php
/**
 * @var WC_Order $order
 */

use function LinkExpress\view;

$city = !empty($order->get_shipping_city())
    ? $order->get_shipping_city()
    : $order->get_billing_city();
?>

<div class="linkexpress-actions" id="linkexpress-actions-<?php echo $order->get_id(); ?>">
    <input type="hidden" class="link_express_helper-order_id" value="<?php echo $order->get_id(); ?>">

    <div class="link-express-actions-summary-list-data">
        <div class="contain">
            <div class="link-express-actions-summary">
                <?php echo view('admin.order.single.summary', ['orderId' => $order->get_id(), 'city' => $city]); ?>
            </div>
            <div class="link-express-actions-summary">
                <?php echo view('admin.order.single.tracking', ['orderId' => $order->get_id()]); ?>
            </div>
        </div>
    </div>
    <div class="buttons">
        <?php if (!LinkExpress()->is_cancelled_request($order->get_id())): ?>
            <?php $barcode = get_post_meta($order->get_id(), LinkExpress()->get_barcode_image_meta_name(), true); ?>

            <button id="linkexpress-edit" data-order_id="<?php echo $order->get_id(); ?>" type="button"
                    class="button button-primary">ویرایشd مرسوله
            </button>
            <button id="linkexpress-track" data-order_id="<?php echo $order->get_id(); ?>" type="button"
                    class="button button-add-media">رهگیری مرسوله
            </button>
            <button id="linkexpress-cancel" data-order_id="<?php echo $order->get_id(); ?>" type="button"
                    class="button button-link-delete">لغو درخواست
            </button>
            <?php if ($barcode): ?>
                <a href="<?php echo admin_url(); ?>?action=linkexpress-label&order_id=<?php echo $order->get_id(); ?>"
                   class="button button-primary" target="_blank">چاپ برچسب</a>
            <?php endif; ?>
        <?php else: ?>
            <button id="linkexpress-remove" data-order_id="<?php echo $order->get_id(); ?>" type="button"
                    class="button button-link-delete">حذف درخواست
            </button>
        <?php endif; ?>
    </div>


</div>
