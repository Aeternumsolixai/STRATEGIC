<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hormuz Strategic Monitor | Live Maritime & Energy Intelligence</title>
    <meta name="description" content="Real-time strategic monitoring of the Strait of Hormuz. Live maritime traffic, kinetic activity tracking, conflict intelligence, and global energy risk indicators." />
    <meta name="keywords" content="Strait of Hormuz, maritime security, oil prices, kinetic events, Middle East intelligence, ship tracking, energy risk" />
    <meta name="author" content="Tactical Intelligence Network" />
    <meta name="robots" content="index, follow" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://hormuz-monitor.live/" />
    <meta property="og:title" content="Hormuz Strategic Monitor | Live Intelligence" />
    <meta property="og:description" content="Real-time strategic monitoring of the Strait of Hormuz. Live maritime traffic, kinetic activity tracking, and energy risk indicators." />
    <meta property="og:image" content="https://picsum.photos/seed/hormuz-og/1200/630" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://hormuz-monitor.live/" />
    <meta property="twitter:title" content="Hormuz Strategic Monitor | Live Intelligence" />
    <meta property="twitter:description" content="Real-time strategic monitoring of the Strait of Hormuz. Live maritime traffic, kinetic activity tracking, and energy risk indicators." />
    <meta property="twitter:image" content="https://picsum.photos/seed/hormuz-og/1200/630" />

    <!-- Canonical Link -->
    <link rel="canonical" href="https://hormuz-monitor.live/" />

    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>

    <!-- Consent Management Platform (Quantcast Choice) -->
    <script type="text/javascript" async={true}>
      (function() {
        var host = "hormuz-monitor.live";
        var element = document.createElement('script');
        var firstScript = document.getElementsByTagName('script')[0];
        var url = 'https://quantcast.mgr.consensu.org'
          .concat('/choice/', 'XXXXXXXXXXXXX', '/', host, '/choice.js');
        var uspTries = 0;
        var uspRetries = 10;
        element.async = true;
        element.type = 'text/javascript';
        element.src = url;
        firstScript.parentNode.insertBefore(element, firstScript);

        function makeStub() {
          var TCF_LOCATOR_NAME = '__tcfapiLocator';
          var queue = [];
          var win = window;
          var cmpFrame;

          function addFrame() {
            var doc = win.document;
            var otherCMP = !!(win.frames[TCF_LOCATOR_NAME]);

            if (!otherCMP) {
              if (doc.body) {
                var iframe = doc.createElement('iframe');

                iframe.style.cssText = 'display:none';
                iframe.name = TCF_LOCATOR_NAME;
                doc.body.appendChild(iframe);
              } else {
                setTimeout(addFrame, 5);
              }
            }
            return !otherCMP;
          }

          function tcfAPI() {
            var args = arguments;

            if (!args.length) {
              return queue;
            } else if (args[0] === 'setGdprApplies') {
              if (args.length > 3 && args[2] === 2 && typeof args[3] === 'boolean') {
                args[3] = args[3];
                if (typeof args[2] === 'function') {
                  args[2]('setGdprAppliesDone', true);
                }
              }
            } else if (args[0] === 'ping') {
              var retr = {
                gdprApplies: true,
                cmpLoaded: false,
                cmpStatus: 'stub'
              };

              if (typeof args[2] === 'function') {
                args[2](retr);
              }
            } else {
              queue.push(args);
            }
          }

          function postMessageEventHandler(event) {
            var msgIsString = typeof event.data === 'string';
            var json = {};

            try {
              if (msgIsString) {
                json = JSON.parse(event.data);
              } else {
                json = event.data;
              }
            } catch (ignore) {}

            var payload = json.__tcfapiCall;

            if (payload) {
              window.__tcfapi(
                payload.command,
                payload.version,
                function(retValue, success) {
                  var returnMsg = {
                    __tcfapiReturn: {
                      returnValue: retValue,
                      success: success,
                      callId: payload.callId
                    }
                  };
                  if (msgIsString) {
                    returnMsg = JSON.stringify(returnMsg);
                  }
                  event.source.postMessage(returnMsg, '*');
                },
                payload.parameter
              );
            }
          }

          while (win) {
            try {
              if (win.frames[TCF_LOCATOR_NAME]) {
                cmpFrame = win;
                break;
              }
            } catch (ignore) {}

            if (win === window.top) {
              break;
            }
            win = win.parent;
          }
          if (!cmpFrame) {
            addFrame();
            win.__tcfapi = tcfAPI;
            win.addEventListener('message', postMessageEventHandler, false);
          }
        };

        makeStub();
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

