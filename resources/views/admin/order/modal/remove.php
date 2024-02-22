<form class="cancel-form">
    <div class="form-logo">
        <div class="icon icon-error">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </div>
        <div class="message">
            آیا از حذف این درخواست مطمئن هستید؟
        </div>
    </div>

    <div class="buttons">
        <button id="modal-dismiss" data-order_id="<?php echo $order->get_id(); ?>" class="le-button">منصرف شدم</button>
        <button id="link-express-process-remove-confirm" data-order_id="<?php echo $order->get_id(); ?>" class="le-button le-error-button">بله مطمئنم</button>
    </div>
</form>