<?php

use LinkExpress\Helper;
use LinkExpress\Objects\Order;
use function LinkExpress\getOption;
use function LinkExpress\getRialAmount;
use function LinkExpress\modalDefaults;
use function LinkExpress\modalFieldDate;
use function LinkExpress\modalFieldInput;
use function LinkExpress\modalFieldSelect;
use function LinkExpress\modalFieldTextarea;
use function LinkExpress\modalOptionalFields;
use function LinkExpress\modalRequiredFields;

/**
 * @var Order $order
 */
$defaults = $defaults ?? apply_filters(
	'link_express_change_default_values',
	array_merge(
		modalDefaults(),
		[
			'fullName' => $order->getCustomerName(),
			'address' => $order->getAddress(),
			'description' => $order->get_customer_note() ?: '',
			'cellPhone' => $order->getCellPhone(),
			'postalCode' => $order->getPostalCode(),
			'amount' => $order->getAmount(),
			'parcelValue' => getOption('parcelValue') ? getRialAmount($order->get_total()) : null,
			'generateBarcode' => getOption('generateBarcode') ? 1 : null,
			'city' => $order->getCity(),
			'state' => $order->getProvince(),
		]
	),
	$order
);

$isTehran = (!empty($defaults['city']) and $defaults['city'] === 'تهران');

$required_fields = modalRequiredFields();
$optional_fields = modalOptionalFields();

$first_fields_html = '';
$more_fields_html = '';
?>
<form action="" class="form-submit__ready send" data-method="link">
    <div class="row form-content">
		<?php foreach (array_merge($required_fields, $optional_fields) as $key => $field): ?>
			<?php ob_start(); ?>
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
				if (array_key_exists($field['id'], $defaults)) {
					$field['default'] = str_replace('{order_id}', $order->get_id(), $defaults[$field['id']]);
				}

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
			<?php
			$field_html = ob_get_clean();
			if (in_array($field['id'], ['ptype', 'weight', 'shift', 'sendDate'])) {
				$first_fields_html .= $field_html;
			} else {
				$more_fields_html .= $field_html;
			}
		endforeach;
		echo $first_fields_html;
		?>

        <div class="col-md-12 more-information-wrapper">
            <a href="#" class="more-information">اطلاعات بیشتر
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="feather feather-chevron-left">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </a>
        </div>
        <div class="more-information__fields">
            <div class="row">
				<?php echo $more_fields_html; ?>
            </div>
        </div>
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