<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit52227cd71679d746423476b45ace5549
{
    public static $files = array (
        'a9ed0d27b5a698798a89181429f162c5' => __DIR__ . '/..' . '/khanamiryan/qrcode-detector-decoder/lib/Common/customFunctions.php',
    );

    public static $prefixLengthsPsr4 = array (
        'Z' => 
        array (
            'Zxing\\' => 6,
        ),
        'L' => 
        array (
            'LinkExpress\\' => 12,
        ),
        'D' => 
        array (
            'Da\\QrCode\\' => 10,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Zxing\\' => 
        array (
            0 => __DIR__ . '/..' . '/khanamiryan/qrcode-detector-decoder/lib',
        ),
        'LinkExpress\\' => 
        array (
            0 => __DIR__ . '/../..' . '/app',
        ),
        'Da\\QrCode\\' => 
        array (
            0 => __DIR__ . '/..' . '/2amigos/qrcode-library/src',
        ),
    );

    public static $prefixesPsr0 = array (
        'B' => 
        array (
            'BaconQrCode' => 
            array (
                0 => __DIR__ . '/..' . '/bacon/bacon-qr-code/src',
            ),
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit52227cd71679d746423476b45ace5549::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit52227cd71679d746423476b45ace5549::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInit52227cd71679d746423476b45ace5549::$prefixesPsr0;
            $loader->classMap = ComposerStaticInit52227cd71679d746423476b45ace5549::$classMap;

        }, null, ClassLoader::class);
    }
}
