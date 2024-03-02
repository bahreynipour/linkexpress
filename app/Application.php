<?php
namespace LinkExpress;

use LinkExpress\Integrations\DeliveryTime;

class Application
{
	public function __construct() {
        new Order();
        new Assets();
        new Settings();
        new DeliveryTime();
	}
}