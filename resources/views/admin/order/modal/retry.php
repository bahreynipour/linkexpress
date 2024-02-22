<?php

use LinkExpress\Helper;
use LinkExpress\Objects\Order;
use function LinkExpress\modalFieldDate;
use function LinkExpress\modalFieldInput;
use function LinkExpress\modalFieldSelect;
use function LinkExpress\modalFieldTextarea;
use function LinkExpress\modalRequiredFields;

/**
 * @var Order $order
 */

$fields = modalRequiredFields();
foreach ($fields as $key => $field) {
	if (!in_array($field['id'], ['shift', 'sendDate'])) {
		unset($fields[$key]);
	}
}

$isTehran = ($order->get_shipping_city() ?: $order->get_billing_city()) === 'تهران';

?>

<form action="" class="form-submit__ready send">
    <div class="row form-content">
		<?php foreach ($fields as $key => $field): ?>
            <div class="form-field
                <?php
			echo !empty($field['class']) ? implode(' ', $field['class']) : 'col-md-6';
			echo ' ';
			echo $field['id'];
			echo ' ';
			echo $field['type'] === 'select' ? 'wc-enhanced-select' : ''
			?>">
                <label for="<?php echo $field['id']; ?>"><?php echo $field['label']; ?></label>
				<?php

				if (in_array($field['type'], ['text', 'number', 'hidden'])):
					modalFieldInput($field, $order);
				endif;
				if ($field['type'] === 'textarea'):
					modalFieldTextarea($field, $order);
				endif;
				if ($field['type'] === 'date'):
					modalFieldDate($field, $order);
				endif;
				if ($field['type'] === 'select'):
					modalFieldSelect($field, $order, $isTehran);
				endif; ?>
				<?php if (!empty($field['description'])): ?>
                    <div class="field-description">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             class="feather feather-help-circle">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                        <div class="field-description-content">
							<?php echo $field['description']; ?>
                        </div>
                    </div>
				<?php endif; ?>
            </div>
		<?php endforeach; ?>
    </div>
    <div class="buttons">
        <button id="modal-dismiss" data-order_id="<?php echo $order->get_id(); ?>" class="le-button">منصرف شدم</button>
        <button type="submit" data-order_id="<?php echo $order->get_id(); ?>" class="le-button le-confirm-button">تایید
            و
            ارسال
        </button>
    </div>

    <input type="hidden" name="orderId" value="<?php echo $order->get_id(); ?>">
</form>
