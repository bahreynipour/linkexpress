<?php namespace LinkExpress\Contracts;

interface ApiInterface {

    public function setArgs(array $data): void;

    public function setResponseMessages(): void;

}