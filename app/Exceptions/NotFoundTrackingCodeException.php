<?php

namespace LinkExpress\Exceptions;

use Exception;

class NotFoundTrackingCodeException extends Exception
{
    protected $message = 'کد پیگری این درخواست یافت نشد';
}