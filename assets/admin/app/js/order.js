jQuery( function( $ ) {

    $( '#doaction, #doaction2' ).on( 'click', function( e ) {
        let selectedAction = $( this ).attr( "id" ).substring( 2 )
        let action         = $( 'select[name="' + selectedAction + '"]' ).val()

        if(action !== 'link-bulk-print-labels') {
            return;
        }

        e.preventDefault();

        const checked    = []


        $( 'tbody th.check-column input[type="checkbox"]:checked' )
            .each(function() {
                checked.push( $( this ).val() )
            })

        if ( ! checked.length ) {
            linkNotice.show('error', 'سفارشی انتخاب نشده است.')
            return
        }

        const url = linkHelper.settings.ajax.url + '?action=generateLinkLabel&bulk&nonce=' + linkHelper.settings.ajax.nonce
        const orderIds = checked.join(',')
        window.open(
            url + '&order_ids=' + orderIds,
            '_blank'
        );
    } );

} );