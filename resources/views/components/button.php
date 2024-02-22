<?php
/**
 * @var $id string
 * @var $order Order
 * @var $class string|array
 * @var $label string
 * @var $icon string
 */

use LinkExpress\Objects\Order;

array_unshift($class, 'link-btn');

if (!empty($action)) {
	$class[] = 'has-action';
	$class[] = 'action-' . $action;
}
?>

<button
        type="button"
	<?php
	echo (isset($order) && $order instanceof Order)
		? 'data-order_id="' . $order->get()->get_id() . '"'
		: '';
	?>
        class="<?php echo implode(' ', $class); ?>"
        style="<?php echo !empty($color) ? "color: {$color}" : ''; ?>"
	<?php echo !empty($action) ? "data-link-action=\"{$action}\"" : ''; ?>
>
	<?php echo $label ?? ''; ?>
	<?php echo $icon ?? ''; ?>
</button>