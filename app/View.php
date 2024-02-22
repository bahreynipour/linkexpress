<?php

namespace LinkExpress;

class View
{
	public static function load($file = '', $data = [])
	{
		$file = sprintf(
			'%s%s%s%s.php',
			LinkExpress_DIR,
			'templates',
			DIRECTORY_SEPARATOR,
			str_replace('.', DIRECTORY_SEPARATOR, $file)
		);

		if (!file_exists($file))
			return '';

		extract($data);
		require("$file");
	}

	public static function get($file, $data = []): false|string
	{
		ob_start();
		self::load($file, $data);
		return ob_get_clean();
	}
}