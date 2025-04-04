<?php
namespace Adianti\Plugins\QRcode;

use Adianti\Widget\Base\TElement;
use Adianti\Widget\Base\TScript;
use Adianti\Widget\Base\TStyle;

class LeitorQRcode extends TElement
{
    protected $video_id;
    
    /**
     * Construtor
     */
    public function __construct()
    {
        parent::__construct('div');
        $this->id = 'tqrcode_' . uniqid();
        $this->video_id = 'video_' . uniqid();
        
        // Cria o elemento de vídeo
        $video = new TElement('video');
        $video->id = $this->video_id;
        $video->setProperty('autoplay', 'true');
        $video->setProperty('playsinline', 'true');
        $video->style = 'width: 100%; height: auto;';
        
        // Adiciona o vídeo no container
        parent::add($video);
        
        // Importa os arquivos CSS e JavaScript
        TStyle::importFromFile('vendor/adianti/plugins/src/QRcode/qr.css');
        TScript::importFromFile('vendor/adianti/plugins/src/QRcode/qr.js');
        
        // Inicializa o componente passando o ID do vídeo
        TScript::create("LeitorQRcode.init('{$this->video_id}');");
    }
    
    /**
     * Exibe o componente na tela
     */
    public function show()
    {
        parent::show();
    }
}
?>
