<?php
/**
 * @var $id string
 * @var $order Order
 * @var $class string|array
 * @var $label string
 * @var $icon string
 * @var $url string
 */

use LinkExpress\Objects\Order;

array_unshift($class, 'link-btn', 'link-btn-link');

if (!empty($action)) {
	$class[] = 'has-action';
	$class[] = 'action-' . $action;
}
?>

<a
        href="<?php echo $url; ?>"
	<?php
	echo (isset($order) && $order instanceof Order)
		? 'data-order_id="' . $order->get()->get_id() . '"'
		: '';
	?>
        <?php echo isset($target) ? "target=\"{$target}\"" : ''; ?>
        class="<?php echo implode(' ', $class); ?>"
        style="<?php echo !empty($color) ? "color: {$color}" : ''; ?>"
	<?php echo !empty($action) ? "data-link-action=\"{$action}\"" : ''; ?>
>
	<?php echo $label ?? ''; ?>
	<?php echo $icon ?? ''; ?>
</a>