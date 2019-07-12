import React, { Component } from "react";
import 'dialog-polyfill/dist/dialog-polyfill.css';
import dialogPolyfill from 'dialog-polyfill';
import Clipboard from 'clipboard';
import URL from 'url';
import * as serviceWorker from "../qrcode_worker";



class App extends Component {
  state = {};
  
  componentDidMount = () => {

    // html elements
    const snapshotCanvas = document.getElementById('snapshot');
    const snapshotContext = snapshotCanvas.getContext('2d');
    const video = document.getElementById('camera');
    const overlay = document.getElementById('snapshotLimitOverlay');
    const flipCameraButton = document.getElementById("flipCamera");
    const loadingElement = document.getElementById('loading');
    const resultContainer = document.getElementById('result');
    const resultDialog = document.querySelector('dialog');
    const resultSearchGo = document.querySelector('dialog a.search');

    // init QRCode Web Worker
    const qrcodeWorker = new Worker(serviceWorker);
    qrcodeWorker.postMessage({cmd: 'init'});
    qrcodeWorker.addEventListener('message', showResult);


    dialogPolyfill.registerDialog(resultDialog);
    resultDialog.querySelector('button.continue').addEventListener('click', function() {
      resultDialog.close();
      resultContainer.innerText = "";
      flipCameraButton.disabled = false;
      scanCode(true);
    });
    new Clipboard('dialog button.copy');

    
    let snapshotSquare;
    function calculateSquare() {
      // alert('calculateSquare')
        // get square of snapshot in the video
        let snapshotSize = overlay.offsetWidth;
        snapshotSquare = {
            'x': ~~((video.videoWidth - snapshotSize)/2),
            'y': ~~((video.videoHeight - snapshotSize)/2),
            'size': ~~(snapshotSize)
        };

        snapshotCanvas.width = snapshotSquare.size;
        snapshotCanvas.height = snapshotSquare.size;
    }

    // ScanCode

    function scanCode(wasSuccess) {
      setTimeout(function() {
          if (flipCameraButton.disabled) {
              // terminate this loop
              loadingElement.style.display = "none";
              return;
          }

          // show loading
          loadingElement.style.display = "block";

          // capture current snapshot
          snapshotContext.drawImage(video, snapshotSquare.x, snapshotSquare.y, snapshotSquare.size, snapshotSquare.size, 0, 0, snapshotSquare.size, snapshotSquare.size);
          const imageData = snapshotContext.getImageData(0, 0, snapshotSquare.size, snapshotSquare.size);

          // scan for QRCode
          qrcodeWorker.postMessage({
              cmd: 'process',
              width: snapshotSquare.size,
              height: snapshotSquare.size,
              imageData: imageData
          });
      }, wasSuccess ? 2000 : 120);
    }

    function showResult (e) {
      const resultData = e.data;

      // open a dialog with the result if found
      if (resultData !== false) {
          navigator.vibrate(200); // vibration is not supported on Edge, IE, Opera and Safari
          disableUI();

          try {
              let url = new URL(resultData);
              let linkToResult = document.createElement('a');
              linkToResult.href = url;
              linkToResult.innerText = resultData;
              resultContainer.appendChild(linkToResult);

              resultSearchGo.href = url;
              resultSearchGo.innerText = "Go";
          } catch (e) {
              resultContainer.innerText = resultData;

              resultSearchGo.href = "https://www.google.com/search?q=" + encodeURIComponent(resultData);
              resultSearchGo.innerText = "Search";
          }

          resultDialog.showModal();
      } else {
          // if not found, retry
          scanCode();
      }
    }

    function disableUI () {
      flipCameraButton.disabled = true;
      loadingElement.style.display = "none";
    }

    // init video stream
    let currentDeviceId;
    function initVideoStream () {
        let config = {
            audio: false,
            video: {}
        };
        config.video = currentDeviceId ? {deviceId: currentDeviceId} : {facingMode: "environment"};

        stopStream();

        navigator.mediaDevices.getUserMedia(config).then(function (stream) {
            document.getElementById('about').style.display = 'none';

            video.srcObject = stream;
            video.oncanplay = function() {
                flipCameraButton.disabled = false;
                calculateSquare();
                scanCode();
            };
        }).catch(function (error) {
            alert(error.name + ": " + error.message);
        });
    }
    initVideoStream();

    function stopStream() {
        disableUI();

        if (video.srcObject) {
            video.srcObject.getTracks()[0].stop();
        }
    }

    // listen for optimizedResize
    window.addEventListener("optimizedResize", calculateSquare);

    // add flip camera button if necessary
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
        devices = devices.filter(function (device) {
            return device.kind === 'videoinput';
        });

        if (devices.length > 1) {
            // add a flip camera button
            flipCameraButton.style.display = "block";

            currentDeviceId = devices[0].deviceId; // no way to know current MediaStream's device id so arbitrarily choose the first

            flipCameraButton.addEventListener('click', function() {
                let targetDevice;
                for (let i = 0; i < devices.length; i++) {
                    if (devices[i].deviceId === currentDeviceId) {
                        targetDevice = (i + 1 < devices.length) ? devices[i+1] : devices[0];
                        break;
                    }
                }
                currentDeviceId = targetDevice.deviceId;

                initVideoStream();
            });
        }
    });

    document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
            stopStream();
        } else {
            initVideoStream();
        }
    });
    
  };

  render() {
    return (
      // <ThemeProvider theme={theme}>
      //   <PageTemplate
      //     header={
      //       <Header
      //         onLeftNavCollapse={this.onLeftNavCollapse}
      //         collapsedStatus={this.state.collapsedStatus}
      //       />
      //     }
      //     footer={<Footer links={links} />}
      //     leftNavigation={
      //       <LeftNavigation
      //         collapsedStatus={this.state.collapsedStatus}
      //         breakPoint={1024}
      //         containerWidth={250}
      //         responsive={true}
      //       />
      //     }
      //   >
      //     <Switch>
      //       <Route path="/" component={Catalog} exact />
      //       <Route path="/item-details" component={ItemDetails} />
      //       <Route component={NotFoundPage} />
      //     </Switch>
      //   </PageTemplate>
      // </ThemeProvider>
      <div>
        <div ref="loading" id="loading" className="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>

          <video ref="camera" id="camera" autoPlay>You need a camera in order to use this app.</video>
          <div id="snapshotLimitOverlay" ref="snapshotLimitOverlay">
              <div id="about">
                  <h4>QR Code Scanner</h4>
                  <p>
                      This is a lightweight progressive web app for scanning QR Codes offline.<br />
                      You'll need at least a camera and a compatible browser.<br />
                      Source code is available on GitHub (Minishlink/pwa-qr-code-scanner), click the <strong>About</strong> button.
                  </p>
              </div>
          </div>
          <canvas id="snapshot" ref="snapshot"></canvas>
          <button ref="flipCamera" id="flipCamera" type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Flip Camera</button>
          <a id="aboutButton" type="button" href="https://github.com/Minishlink/pwa-qr-code-scanner" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">About</a>

          <dialog ref="dialog" className="mdl-dialog">
              <h4 className="mdl-dialog__title">Your text</h4>
              <div className="mdl-dialog__content">
                  <p id="resultsContainer"><span id="result"></span></p>
                  <p>
                      <button type="button" className="copy mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised" data-clipboard-target="#result">Copy</button>
                      <a className="search mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised">Search</a>
                  </p>
              </div>
              <div className="mdl-dialog__actions">
                  <button type="button" className="continue mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored">Continue</button>
              </div>
          </dialog>
      </div>
    );
  }
}

export default App;
