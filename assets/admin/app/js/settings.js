jQuery( function( $ ) {
    jQuery('#showRegistrationForm, #hideRegistrationForm').on('click', function (e) {
        jQuery(this).closest('tbody').find('tr').each(function (key, field) {
            field = jQuery(field)
            field.toggleClass('hidden')
            if(field.hasClass('hidden')) {
                field.find('input, select').attr('disabled', 'disabled')
            } else {
                field.find('input, select').removeAttr('disabled')
            }
        })
    })
});