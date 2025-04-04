var LeitorQRcode = (function() {
    var videoElement = null;
    var currentStream = null;
    var currentDeviceIndex = 0;
    var devices = [];
    
    function init(video_id) {
        videoElement = document.getElementById(video_id);
        if (!videoElement) {
            console.error("Elemento de vídeo não encontrado: " + video_id);
            return;
        }
        
        // Evento de duplo clique para alternar a câmera
        videoElement.addEventListener('dblclick', switchCamera);
        
        // Obtém a lista de dispositivos de vídeo
        navigator.mediaDevices.enumerateDevices()
        .then(function(deviceInfos) {
            devices = deviceInfos.filter(function(device) {
                return device.kind === 'videoinput';
            });
            if (devices.length > 0) {
                startStream(devices[currentDeviceIndex].deviceId);
            } else {
                console.error("Nenhum dispositivo de vídeo encontrado.");
            }
        })
        .catch(function(error) {
            console.error("Erro ao listar dispositivos: ", error);
        });
    }
    
    function startStream(deviceId) {
        // Para stream anterior, se houver
        if (currentStream) {
            currentStream.getTracks().forEach(function(track) {
                track.stop();
            });
        }
        
        var constraints = {
            video: { deviceId: { exact: deviceId } },
            audio: false
        };
        
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            currentStream = stream;
            videoElement.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Erro ao acessar a câmera: ", error);
        });
    }
    
    function switchCamera() {
        if (devices.length > 1) {
            currentDeviceIndex = (currentDeviceIndex + 1) % devices.length;
            startStream(devices[currentDeviceIndex].deviceId);
        }
    }
    
    return {
        init: init
    };
  })();
  