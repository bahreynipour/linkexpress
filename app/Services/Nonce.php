<?php

namespace LinkExpress\Services;

class Nonce
{
    protected string $action;
    protected bool $canSendError = true;
    protected string $error = 'نشست شما منقضی شده است.';


    public function __construct(string $action)
    {
        $this->action = $action;
    }

    public static function make(string $action)
    {
        return new static($action);
    }

    public function create(): string
    {
        return wp_create_nonce($this->action);
    }

    public function canSendError(bool $status = true): static
    {
        $this->canSendError = $status;
        return $this;
    }

    public function errorMessage(string $error): static
    {
        $this->error = $error;
        return $this;
    }

    public function verify(null|string $nonce = null): false|int|null
    {
        $verify = wp_verify_nonce($nonce ?? $_POST['nonce'], $this->action);

        if(!$verify && $this->canSendError) {
            wp_send_json_error($this->error);
        }

        return $verify;

    }
}