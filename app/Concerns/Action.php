<?php

namespace LinkExpress\Concerns;

trait Action
{
    public static function make()
    {
        return new static();
    }

    public static function run(...$arguments)
    {
        return static::make()->handle(...$arguments);
    }
}