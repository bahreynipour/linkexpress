<?php
namespace LinkExpress;

use LinkExpress\Integrations\DeliveryTime;

class Application
{
	public static ?Application $instance = NULL;

	public static function getInstance(): ?Application
    {
		NULL === self::$instance && self::$instance = new self;
		return self::$instance;
	}

	public function __construct() {
        new Order();
        new Assets();
        new Settings();
        new DeliveryTime();
	}
}