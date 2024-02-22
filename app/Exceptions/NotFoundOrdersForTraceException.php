<?php

namespace LinkExpress\Exceptions;

use Exception;

class NotFoundOrdersForTraceException extends Exception
{
    protected $message = 'سفارشی برای رهگیری یافت نشد.';
}