<?php
/**
 * @var array $components
 * @var array $class
 */

use function LinkExpress\view;

if (empty($components) || !is_array($components)) {
    return;
}
array_unshift($class, 'link-group');

?>
<div class="<?php echo implode(' ', $class); ?>">
    <?php
    echo array_reduce(
        $components,
        fn($html, $item) => $html . view(...$item)
    );
    ?>
</div>