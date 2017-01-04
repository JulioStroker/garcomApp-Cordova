$('.collection-item').on('click', function () {

    var $badge = $('.badge', this);
    if ($badge.length == 0)
    {
        $badge = $('<span class="badge brown-text">0</span>').appendTo(this); 
    }

    var Nomeproduto = this.firstChild.textContent;
        Materialize.toast(Nomeproduto + ' adicionado', 1000);

    $badge.text(parseInt($badge.text()) + 1);
    navigator.vibrate(100);

});

      
$('#confirmar').on('click',function(){

    var texto = '';

    $('.badge').parent().each(function(){
        // var produto = this.firstChild.textContent;       
        // var quantidade = this.lastChild.textContent;

        texto += this.firstChild.textContent + ': ';
        texto += this.lastChild.textContent + ', ';

        // texto += produto + ': ' + quantidade + ',';

    });

    $('#resumo').empty().text(texto);
});

$('.modal-trigger').leanModal();

$('.collection').on('click','.badge', function(){
    $(this).remove();
    return false;
});

$('.acao-limpar').on('click', function(){  
    $('#numero-mesa').val('');
    $('.badge').remove();
});

$('.scan-qrcode').click(function () {
    cordova.plugins.barcodeScanner.scan(function (result) {
        if(result.text){
            Materialize.toast('Mesa ' + result.text, 2000);
            $('#numero-mesa').val(result.text);
        }
    },
    function(erro){
        Materialize.toast('Mesa ' + erro, 2000, 'red-text');
    },
    {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          prompt : "Silvio Santos Javeiro NullPointerException", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true // iOS
      }
    );
});

$('.acao-finalizar').click(function(){
    $.ajax({
        url: 'http://cozinhapp.sergiolopes.org/novo-pedido',
        data:{
            mesa: $('#numero-mesa').val(),
            pedido: $('#resumo').text()
        },
        success: function(resposta){
            Materialize.toast(resposta, 2000);
            $('#numero-mesa').val('');
            $('.badge').remove();
            navigator.vibrate(1000);
        },
        error: function(erro){
            Materialize.toast(erro.responseText, 3000, 'red-text');
        }
    });
});