<?php

namespace LinkExpress\Services;

use Closure;
use Exception;
use function LinkExpress\view;

class Ajax
{
    protected bool $nopriv = false;
    protected string $action;

    public function __construct($action)
    {
        $this->action = $action;
    }

    public static function make(string $action)
    {
        return new static($action);
    }

    public function nopriv(bool $nopriv = true)
    {
        $this->nopriv = $nopriv;
        return $this;
    }

    public function do(Closure $callback)
    {
        $callback = fn () => $this->callback($callback);

        add_action(
            'wp_ajax_' . $this->action,
            $callback
        );

        if($this->nopriv) {
            add_action(
                'wp_ajax_nopriv_' . $this->action,
                $callback
            );
        }

    }

    protected function callback(Closure $callback)
    {
	    try {
		    Nonce::make('linkExpress')
			    ->canSendError()
			    ->errorMessage('نشست شما منقضی شده است')
			    ->verify();

		    return call_user_func($callback, $this);
	    } catch (Exception $exception) {
			$this->error($exception->getMessage());
	    }

    }

	public function view($file, $data = [])
	{
		echo view($file, $data);
		die();
	}

    public function jsonResponse($message, ?int $statusCode = null, int $options = 0, bool $withCatch = false): void
    {
        if(!$withCatch)
            wp_send_json($message, $statusCode, $options);

        try {

            $this->success($message, $statusCode, $options);

        } catch (Exception $exception) {

            $this->error($exception->getMessage());

        }
    }

    public function success($message, ?int $statusCode = null, int $options = 0)
    {
        wp_send_json_success($message, $statusCode, $options);
    }

    public function error($message, ?int $statusCode = null, int $options = 0)
    {
        wp_send_json_error($message, $statusCode, $options);
    }

    public function errorIf(bool $condition, $message): static
    {
        if($condition) {
            $this->error($message);
        }

        return $this;
    }
}