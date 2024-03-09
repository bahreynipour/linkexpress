<?php namespace LinkExpress\Contracts;

interface ApiInterface {

    public function setArgs(array $data);

    public function setResponseMessages(): void;

}