<?php

namespace LinkExpress\Concerns;

trait HasConstants {
	/**
	 * A container for all defined constants.
	 *
	 * @access public
	 * @static
	 *
	 * @var array.
	 */
	public static array $constants = [];

	/**
	 * Checks if a "constant" has been set in constants Manager
	 * and has a truthy value (e.g. not null, not false, not 0, any string).
	 *
	 * @param string $name The name of the constant.
	 *
	 * @return bool
	 */
	public static function isTrue( $name ): bool {
		return self::isDefined( $name ) && self::getConstant( $name );
	}

	/**
	 * Checks if a "constant" has been set in constants Manager, and if not,
	 * checks if the constant was defined with define( 'name', 'value ).
	 *
	 * @param string $name The name of the constant.
	 *
	 * @return bool
	 */
	public static function isDefined( $name ): bool {
		return array_key_exists( $name, self::$constants ) || defined( $name );
	}

	public static function setOrGetConstant( string $name, string $value ) {
		if ( ! self::isDefined( $name ) ) {
			self::setConstant( $name, $value );
		}

		return self::getConstant( $name );
	}

	/**
	 * Attempts to retrieve the "constant" from constants Manager, and if it hasn't been set,
	 * then attempts to get the constant with the constant() function. If that also hasn't
	 * been set, attempts to get a value from filters.
	 *
	 * @param string $name The name of the constant.
	 *
	 * @return mixed null if the constant does not exist or the value of the constant.
	 */
	public static function getConstant( string $name ) {

		$getPHPConstant = fn( $name ) => defined( $name ) ? constant( $name ) : null;

		return array_key_exists( $name, self::$constants )
			? self::$constants[ $name ]
			: $getPHPConstant( $name );
	}

	/**
	 * Sets the value of the "constant" within constants Manager.
	 *
	 * @param string|array $name The name of the constant(s).
	 * @param string|null $value The value of the constant.
	 */
	public static function setConstant( $name, string $value = null ) {
		$constants = array_filter(
			is_array( $name ) ? $name : [ $name => $value ],
			fn( $value, $key ) => ! is_numeric( $key ) && ! self::isDefined( $key ),
			ARRAY_FILTER_USE_BOTH
		);

		array_map(
			fn( $value, $key ) => self::defineConstant( $key, $value ),
			$constants,
			array_keys( $constants )
		);
	}

	private static function defineConstant( string $name, string $value ) {
		self::$constants[ $name ] = $value;
	}

	/**
	 * Will unset a "constant" from constants Manager if the constant exists.
	 *
	 * @param string $name The name of the constant.
	 *
	 * @return bool Whether the constant was removed.
	 */
	public static function clear( string $name ): bool {
		if ( ! array_key_exists( $name, self::$constants ) ) {
			return false;
		}

		unset( self::$constants[ $name ] );

		return true;
	}

	/**
	 * Resets all the constants within constants Manager.
	 */
	public static function clearAll() {
		self::$constants = [];
	}
}