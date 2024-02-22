<form class="cancel-form">
    <div class="form-logo">
        <div class="icon icon-error">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        </div>
        <div class="message">
            آیا از لغو این درخواست مطمئن هستید؟
        </div>
    </div>

    <div class="buttons">
        <button id="modal-dismiss" data-order_id="<?php echo $order->get_id(); ?>" class="le-button">منصرف شدم</button>
        <button id="link-express-process-cancel-confirm" data-order_id="<?php echo $order->get_id(); ?>" class="le-button le-error-button">بله مطمئنم</button>
    </div>
</form>