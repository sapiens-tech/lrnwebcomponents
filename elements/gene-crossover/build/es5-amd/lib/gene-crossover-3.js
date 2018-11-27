define([
  "../node_modules/@polymer/polymer/polymer-legacy.js",
  "../node_modules/@lrnwebcomponents/lrndesign-animationctrl/lrndesign-animationctrl.js",
  "./TweenMax.min.js"
], function(_polymerLegacy, _lrndesignAnimationctrl, _TweenMaxMin) {
  "use strict";
  function _templateObject_03b16690f1e611e890b38d7ae81f2a0f() {
    var data = babelHelpers.taggedTemplateLiteral([
      '\n        <style>\n             :host {\n                display: block;\n            }\n\n            h1,\n            h2,\n            h3,\n            h4,\n            h5,\n            h6 {\n                font-family: \'Open Sans\', sans-serif;\n                text-transform: uppercase;\n                letter-spacing: 2px;\n                color: #6D6E71;\n                text-align: center;\n            }\n\n            p {\n                font-family: \'Open Sans\', sans-serif;\n            }\n        </style>\n\n        <h1>Gene Crossover</h1>\n\n        <p>This exchange of genetic material results in chromatids that are comprised of both maternal and paternal genes. Along\n            human chromsomes, for example, an average of 2 or 3 cross-over events occurs per chromosome. This exchange of\n            genetic material creates a source of genetic variation for sexually reproducing organisms.</p>\n\n        <svg id="chromosomes" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 640 254.99">\n            <defs>\n                <radialGradient id="423bb513-14ae-434c-b9bb-d9a74df89b27" cx="22" cy="-240.01" r="88.56" gradientTransform="matrix(0.13, -0.99, -0.99, -0.13, 168.97, 155.6)" gradientUnits="userSpaceOnUse">\n                    <stop offset="0" stop-color="#fcf"></stop>\n                    <stop offset="1" stop-color="#f6f"></stop>\n                </radialGradient>\n                <radialGradient id="fc7cb739-d6ee-4cf2-a252-fc4c057621b3" cx="-363.75" cy="-254.35" r="92.34" gradientTransform="matrix(-0.18, -0.98, -0.98, 0.18, -39.2, -143.49)" gradientUnits="userSpaceOnUse">\n                    <stop offset="0" stop-color="#09f"></stop>\n                    <stop offset="1" stop-color="#03c"></stop>\n                </radialGradient>\n                <radialGradient id="6cea740f-d3d4-4767-9547-190646ef7d92" cx="-36.8" cy="-249.99" r="92.34" gradientTransform="matrix(0.08, -1, -1, -0.08, 30.75, 109.83)" xlink:href="#fc7cb739-d6ee-4cf2-a252-fc4c057621b3"></radialGradient>\n                <radialGradient id="56d773ec-f559-482e-86df-677cabc1a326" cx="-134.15" cy="-260.27" r="88.6" gradientTransform="matrix(0, -1, -1, 0, 134.88, 32.04)" xlink:href="#423bb513-14ae-434c-b9bb-d9a74df89b27"></radialGradient>\n                <radialGradient id="43b707a5-bf31-4e7b-90cb-2c24898c3fb8" cx="186.44" cy="-196.29" r="92.4" gradientTransform="matrix(0.26, -0.97, -0.97, -0.26, 28.74, 292.89)" xlink:href="#fc7cb739-d6ee-4cf2-a252-fc4c057621b3"></radialGradient>\n                <radialGradient id="952d2618-a390-4884-85df-2b86ba1eaa53" cx="97.82" cy="-222.83" r="92.35" gradientTransform="matrix(0.19, -0.98, -0.98, -0.19, -7.28, 221.62)" xlink:href="#fc7cb739-d6ee-4cf2-a252-fc4c057621b3"></radialGradient>\n                <radialGradient id="e3dcd28f-8611-46e9-9db2-36732c731126" cx="-134.15" cy="-260.27" r="92.4" gradientTransform="matrix(0, -1, -1, 0, 15.88, 31.04)" xlink:href="#fc7cb739-d6ee-4cf2-a252-fc4c057621b3"></radialGradient>\n                <radialGradient id="49acdd7e-3376-4b78-924b-3756b53c914f" cx="-134.15" cy="-260.27" r="92.4" gradientTransform="matrix(0, -1, -1, 0, 23.88, 31.04)" xlink:href="#fc7cb739-d6ee-4cf2-a252-fc4c057621b3"></radialGradient>\n                <radialGradient id="8f935048-8543-413e-9bb5-8eb18bec537f" cx="-134.15" cy="-260.27" r="88.7" gradientTransform="matrix(0, -1, -1, 0, 28.63, 27.54)" xlink:href="#fc7cb739-d6ee-4cf2-a252-fc4c057621b3"></radialGradient>\n            </defs>\n            <title>crossover-2-full</title>\n\n            \n            <g id="settworightfive">\n                <g id="Layer1_0_FILL-10" data-name="Layer1 0 FILL">\n                    <path d="M339.5,148.59l-20.55,1.25,1.25,6.9,2.2,11.35.15,1.25a177.18,177.18,0,0,0-6.7,26.3l-.1,2.15q.35,5.8,7.9,7.3,8.65,1.7,12-7.3l.15-.4q3.25-9.4,3.25-14l2,6.35A49.42,49.42,0,0,0,346.85,202q3.9,6.15,8.9,4.1a42.1,42.1,0,0,0,6.35-2.95,8.13,8.13,0,0,0,2.4-2.65q1-1.7-.6-5.9a142.08,142.08,0,0,0-12.15-24.45q3.7-5.5,9.2-20.9t11.7-34.3a101.51,101.51,0,0,0,3.75-16.6l.2-2.4-.2-5.25q-.95-6.45-12.85-9.4-9.3-2.65-11.7,7-7.9,37.35-12.1,68Z" fill="#c978af"></path>\n                    <path d="M311.65,111l.2,1.3,7.1,37.55,20.55-1.25L337.3,116a181.16,181.16,0,0,0-3.9-22.55q-3.65-14.9-14.3-11a15.13,15.13,0,0,0-7.35,5.15,12.68,12.68,0,0,0-1.9,9.2v.05Z" fill="#344da1"></path>\n                </g>\n                <path id="Layer1_0_1_STROKES-10" data-name="Layer1 0 1 STROKES" d="M318.95,149.84l-7.1-37.55-.2-1.3-1.8-14.15v-.05a12.68,12.68,0,0,1,1.9-9.2,15.13,15.13,0,0,1,7.35-5.15q10.65-3.9,14.3,11A181.16,181.16,0,0,1,337.3,116l2.2,32.6.25,7.8q4.2-30.65,12.1-68,2.4-9.7,11.7-7,11.9,3,12.85,9.4l.2,5.25-.2,2.4a101.51,101.51,0,0,1-3.75,16.6q-6.25,19-11.7,34.3t-9.2,20.9a142.08,142.08,0,0,1,12.15,24.45q1.55,4.2.6,5.9a8.13,8.13,0,0,1-2.4,2.65,42.1,42.1,0,0,1-6.35,2.95q-5,2.05-8.9-4.1A49.42,49.42,0,0,1,341,189.79l-2-6.35q0,4.55-3.25,14l-.15.4q-3.3,9-12,7.3-7.55-1.5-7.9-7.3l.1-2.15a177.18,177.18,0,0,1,6.7-26.3l-.15-1.25-2.2-11.35Z" fill="none" stroke="#fcf" stroke-linecap="round" stroke-linejoin="round"></path>\n            </g>\n            <g id="settwoleftfive">\n                <g id="Layer0_0_FILL-10" data-name="Layer0 0 FILL">\n                    <path d="M285.2,149.19l.65,3.2.65,3.3-.3-4.15-.25-1.35-.3-.5Z" fill="url(#radial-gradient-8)"></path>\n                    <path d="M308.65,90.54l-.4-2.35a28.49,28.49,0,0,0-1.55-5q-2.6-6-14.85-5.75-9.65-.15-9.5,9.85l3.7,62.05,20.1,1.15.05-.55.7-6.2,2.45-36.15Z" fill="#c978af"></path>\n                    <path d="M251.45,81.44q-9.75,5.9-6.35,16l4.5,13.55.4,1.25,16.75,42.05L271.1,165a177.39,177.39,0,0,0-6.75,26.55l-.1,2.15q.35,5.8,7.9,7.3,8.65,1.7,12-7.3l.15-.4q3.25-9.4,3.25-14l2,6.35A49.42,49.42,0,0,0,295.35,198q3.9,6.15,8.9,4.1a42.1,42.1,0,0,0,6.35-3,8.13,8.13,0,0,0,2.4-2.65q.95-1.7-.6-5.9a139.09,139.09,0,0,0-11.85-23.9q3.9-5.2,5.6-16.25L286,149.29l.05.6.1,1.65.3,4.15-.65-3.3-.65-3.2q-5-23.75-9.45-38.25a173.9,173.9,0,0,0-8.2-21.4Q261.15,75.59,251.45,81.44Z" fill="#344da1"></path>\n                </g>\n                <path id="Layer0_0_1_STROKES-10" data-name="Layer0 0 1 STROKES" d="M306.15,150.44q-1.7,11.05-5.6,16.25a139.09,139.09,0,0,1,11.85,23.9q1.55,4.2.6,5.9a8.13,8.13,0,0,1-2.4,2.65,42.1,42.1,0,0,1-6.35,3q-5,2-8.9-4.1a49.42,49.42,0,0,1-5.85-12.25l-2-6.35q0,4.55-3.25,14l-.15.4q-3.3,9-12,7.3-7.55-1.5-7.9-7.3l.1-2.15A177.39,177.39,0,0,1,271.1,165l-4.35-10.8L250,112.19l-.4-1.25-4.5-13.55q-3.4-10.05,6.35-16t16.1,8.1a173.9,173.9,0,0,1,8.2,21.4q4.45,14.5,9.45,38.25m.75,1,.25,1.35-.1-1.65-.05-.6-3.7-62.05q-.15-10,9.5-9.85,12.25-.2,14.85,5.75a28.49,28.49,0,0,1,1.55,5l.4,2.35.7,17-2.45,36.15-.7,6.2-.05.55m-20,1.1.3,4.15-.65-3.3-.65-3.2" fill="none" stroke="#2895b2" stroke-linecap="round" stroke-linejoin="round"></path>\n            </g>\n            <g id="settworightfour">\n                <g id="Layer1_0_FILL-11" data-name="Layer1 0 FILL">\n                    <path d="M307.9,147a4.85,4.85,0,0,0-1.3,2.85H330l-2.1-.7q-3.35-2.5-.5-6l11.1-7.1v-.25l1.6-19.75a170.31,170.31,0,0,0-.15-22.9Q338.85,77.94,327.7,80a14.94,14.94,0,0,0-8.1,3.9,12.32,12.32,0,0,0-3.35,8.75l0,0-.55,14.25-.05,1.3.45,24,1.15,8.7Z" fill="#344da1"></path>\n                    <path d="M306.6,149.89a3.66,3.66,0,0,0,1.8,3.15L320.25,157l2.15,11.1.15,1.25a177.18,177.18,0,0,0-6.7,26.3l-.1,2.15q.35,5.8,7.9,7.3,8.65,1.7,12-7.3l.15-.4q3.25-9.4,3.25-14l2,6.35A49.42,49.42,0,0,0,346.85,202q3.9,6.15,8.9,4.1a42.1,42.1,0,0,0,6.35-2.95,8.13,8.13,0,0,0,2.4-2.65q1-1.7-.6-5.9a142.08,142.08,0,0,0-12.15-24.45q3.7-5.5,9.2-20.9t11.7-34.3a101.51,101.51,0,0,0,3.75-16.6l.2-2.4-.2-5.25q-.95-6.45-12.85-9.4-9.3-2.65-11.7,7-7.9,37.35-12.1,68l-.1-3.3-9.65-3.2Z" fill="#c978af"></path>\n                </g>\n                <path id="Layer1_0_1_STROKES-11" data-name="Layer1 0 1 STROKES" d="M317.2,140.94l-1.15-8.7-.45-24,.05-1.3.55-14.25,0,0a12.32,12.32,0,0,1,3.35-8.75,14.94,14.94,0,0,1,8.1-3.9q11.15-2,12.25,13.2a170.31,170.31,0,0,1,.15,22.9l-1.6,19.75m1.15,17.25.1,3.3q4.2-30.65,12.1-68,2.4-9.7,11.7-7,11.9,3,12.85,9.4l.2,5.25-.2,2.4a101.51,101.51,0,0,1-3.75,16.6q-6.25,19-11.7,34.3t-9.2,20.9a142.08,142.08,0,0,1,12.15,24.45q1.55,4.2.6,5.9a8.13,8.13,0,0,1-2.4,2.65,42.1,42.1,0,0,1-6.35,2.95q-5,2.05-8.9-4.1A49.42,49.42,0,0,1,341,189.79l-2-6.35q0,4.55-3.25,14l-.15.4q-3.3,9-12,7.3-7.55-1.5-7.9-7.3l.1-2.15a177.18,177.18,0,0,1,6.7-26.3l-.15-1.25L320.25,157" fill="none" stroke="#fcf" stroke-linecap="round" stroke-linejoin="round"></path>\n                <path id="Layer1_0_2_STROKES" data-name="Layer1 0 2 STROKES" d="M320.25,157,308.4,153a3.66,3.66,0,0,1-1.8-3.15,4.85,4.85,0,0,1,1.3-2.85l9.3-6.1m21.3-5.1v.25l-11.1,7.1q-2.85,3.5.5,6l2.1.7,9.65,3.2" fill="none" stroke="#ffcfff" stroke-linecap="round" stroke-linejoin="round"></path>\n            </g>\n            <g id="settwoleftfour">\n                <g id="Layer0_0_FILL-11" data-name="Layer0 0 FILL">\n                    <path d="M291.5,146.49a12.81,12.81,0,0,1-4.85-2.5q-.35,1,4.85,2.5m5.45,3.4,0-.45a4.1,4.1,0,0,1-1.1,1.9l-.8.9Q296.85,151,296.95,149.89Z" fill="url(#radial-gradient-9)"></path>\n                    <path d="M308.65,90.54l-.4-2.35a28.49,28.49,0,0,0-1.55-5q-2.6-6-14.85-5.75-9.65-.15-9.5,9.85l3.15,54a4,4,0,0,0,1.15,2.8,12.81,12.81,0,0,0,4.85,2.5l.85.2,1.15.35.65.2,1.9.9a2.65,2.65,0,0,1,.85,1.3l0,.45h21l-.35-.5a82.67,82.67,0,0,1-10.6-6.5l2.35-35.35Z" fill="#c978af"></path>\n                    <path d="M251.45,81.44q-9.75,5.9-6.35,16l4.5,13.55.4,1.25,16.75,42.05L271.1,165a177.39,177.39,0,0,0-6.75,26.55l-.1,2.15q.35,5.8,7.9,7.3,8.65,1.7,12-7.3l.15-.4q3.25-9.4,3.25-14l2,6.35A49.42,49.42,0,0,0,295.35,198q3.9,6.15,8.9,4.1a42.1,42.1,0,0,0,6.35-3,8.13,8.13,0,0,0,2.4-2.65q.95-1.7-.6-5.9a139.09,139.09,0,0,0-11.85-23.9q-.25-3.8,5.45-8.5a29.14,29.14,0,0,1,9.65-4.8q3.15-1.75,2.3-3.5h-21q-.1,1.15-1.95,2.35h-.05l-.9.4-2,1-5.65,2.8-.3-.75-.65-4.3-.15-1.95-.05-.25q-5-23.85-9.45-38.25a173.9,173.9,0,0,0-8.2-21.4Q261.15,75.59,251.45,81.44Z" fill="#344da1"></path>\n                </g>\n                <path id="Layer0_0_1_STROKES-11" data-name="Layer0 0 1 STROKES" d="M306,158.19q-5.7,4.7-5.45,8.5a139.09,139.09,0,0,1,11.85,23.9q1.55,4.2.6,5.9a8.13,8.13,0,0,1-2.4,2.65,42.1,42.1,0,0,1-6.35,3q-5,2-8.9-4.1a49.42,49.42,0,0,1-5.85-12.25l-2-6.35q0,4.55-3.25,14l-.15.4q-3.3,9-12,7.3-7.55-1.5-7.9-7.3l.1-2.15A177.39,177.39,0,0,1,271.1,165l-4.35-10.8L250,112.19l-.4-1.25-4.5-13.55q-3.4-10.05,6.35-16t16.1,8.1a173.9,173.9,0,0,1,8.2,21.4q4.4,14.4,9.45,38.25l.05.25.15,1.95.65,4.3m.6-11.7a4,4,0,0,1-1.15-2.8l-3.15-54q-.15-10,9.5-9.85,12.25-.2,14.85,5.75a28.49,28.49,0,0,1,1.55,5l.4,2.35.7,17L307,142.89" fill="none" stroke="#2895b2" stroke-linecap="round" stroke-linejoin="round"></path>\n                <path id="Layer0_0_2_STROKES" data-name="Layer0 0 2 STROKES" d="M286,155.69l.3.75,5.65-2.8,2-1,.9-.4H295m1.9-2.8a2.65,2.65,0,0,0-.85-1.3l-1.9-.9-.65-.2-2-.55m15.5-3.6a82.67,82.67,0,0,0,10.6,6.5l.35.5q.85,1.75-2.3,3.5a29.14,29.14,0,0,0-9.65,4.8m-9.1-8.75,0,.45q-.1,1.15-1.95,2.35m-3.5-5.75a12.81,12.81,0,0,1-4.85-2.5" fill="none" stroke="#2895b2" stroke-linecap="round" stroke-linejoin="round"></path>\n            </g>\n            <g id="settworightthree">\n                <g id="Layer1_0_FILL-12" data-name="Layer1 0 FILL">\n                    <path d="M304.55,146.54a7.83,7.83,0,0,0-1,3.35h18.15q-.65-2.3,2.05-4.6l14.65-4.95.15-4.5,1.6-19.75a170.31,170.31,0,0,0-.15-22.9Q338.85,77.94,327.7,80a14.94,14.94,0,0,0-8.1,3.9,12.32,12.32,0,0,0-3.35,8.75l0,0-.55,14.25-.05,1.3.45,24,1.15,8.7Z" fill="#344da1"></path>\n                    <path d="M303.5,149.89a6.68,6.68,0,0,0,.85,3.6l15.9,3.5,2.15,11.1.15,1.25a177.18,177.18,0,0,0-6.7,26.3l-.1,2.15q.35,5.8,7.9,7.3,8.65,1.7,12-7.3l.15-.4q3.25-9.4,3.25-14l2,6.35A49.42,49.42,0,0,0,346.85,202q3.9,6.15,8.9,4.1a42.1,42.1,0,0,0,6.35-2.95,8.13,8.13,0,0,0,2.4-2.65q1-1.7-.6-5.9a142.08,142.08,0,0,0-12.15-24.45q3.7-5.5,9.2-20.9t11.7-34.3a101.51,101.51,0,0,0,3.75-16.6l.2-2.4-.2-5.25q-.95-6.45-12.85-9.4-9.3-2.65-11.7,7-7.75,36.6-11.9,66.75l-.2,1.25.2-1.25q-6.85-3.75-16.55-2.65a5.7,5.7,0,0,1-1.75-2.6Z" fill="#c978af"></path>\n                </g>\n                <path id="Layer1_0_1_STROKES-12" data-name="Layer1 0 1 STROKES" d="M320.25,157l-15.9-3.5a6.68,6.68,0,0,1-.85-3.6,7.83,7.83,0,0,1,1-3.35l12.65-5.6m21.3-5.1-.15,4.5-14.65,4.95q-2.7,2.3-2.05,4.6a5.7,5.7,0,0,0,1.75,2.6q9.7-1.1,16.55,2.65" fill="none" stroke="#fcf" stroke-linecap="round" stroke-linejoin="round"></path>\n                <path id="Layer1_0_2_STROKES-2" data-name="Layer1 0 2 STROKES" d="M317.2,140.94l-1.15-8.7-.45-24,.05-1.3.55-14.25,0,0a12.32,12.32,0,0,1,3.35-8.75,14.94,14.94,0,0,1,8.1-3.9q11.15-2,12.25,13.2a170.31,170.31,0,0,1,.15,22.9l-1.6,19.75m1.45,19.3q4.15-30.15,11.9-66.75,2.4-9.7,11.7-7,11.9,3,12.85,9.4l.2,5.25-.2,2.4a101.51,101.51,0,0,1-3.75,16.6q-6.25,19-11.7,34.3t-9.2,20.9a142.08,142.08,0,0,1,12.15,24.45q1.55,4.2.6,5.9a8.13,8.13,0,0,1-2.4,2.65,42.1,42.1,0,0,1-6.35,2.95q-5,2.05-8.9-4.1A49.42,49.42,0,0,1,341,189.79l-2-6.35q0,4.55-3.25,14l-.15.4q-3.3,9-12,7.3-7.55-1.5-7.9-7.3l.1-2.15a177.18,177.18,0,0,1,6.7-26.3l-.15-1.25L320.25,157m19.5-.6.2-1.25" fill="none" stroke="#fcf" stroke-linecap="round" stroke-linejoin="round"></path>\n            </g>\n            <g id="settwoleftthree">\n                <g id="Layer0_0_FILL-12" data-name="Layer0 0 FILL">\n                    <path d="M308.65,90.54l-.4-2.35a28.49,28.49,0,0,0-1.55-5q-2.6-6-14.85-5.75-9.65-.15-9.5,9.85l3.15,54a4,4,0,0,0,1.15,2.8l4,1.3,12.65,1.5a4.4,4.4,0,0,1,.9,3.1h19.15a5.68,5.68,0,0,0-1.75-4q-12.1-.95-14.6-3l2.35-35.35Z" fill="#c978af"></path>\n                    <path d="M251.45,81.44q-9.75,5.9-6.35,16l4.5,13.55.4,1.25,16.75,42.05L271.1,165a177.39,177.39,0,0,0-6.75,26.55l-.1,2.15q.35,5.8,7.9,7.3,8.65,1.7,12-7.3l.15-.4q3.25-9.4,3.25-14l2,6.35A49.42,49.42,0,0,0,295.35,198q3.9,6.15,8.9,4.1a42.1,42.1,0,0,0,6.35-3,8.13,8.13,0,0,0,2.4-2.65q.95-1.7-.6-5.9a139.09,139.09,0,0,0-11.85-23.9q-.25-3.8,5.45-8.5,3.3-2.75,15.65-4.55a6.43,6.43,0,0,0,1.7-3.75H304.2a5.24,5.24,0,0,1-2.05,3.15H289.4q-2.6,0-3,3.4l-.3-.75-.65-4.3-.15-1.95-.05-.25q-5-23.85-9.45-38.25a173.9,173.9,0,0,0-8.2-21.4Q261.15,75.59,251.45,81.44Z" fill="#344da1"></path>\n                </g>\n                <path id="Layer0_0_1_STROKES-12" data-name="Layer0 0 1 STROKES" d="M306,158.19q-5.7,4.7-5.45,8.5a139.09,139.09,0,0,1,11.85,23.9q1.55,4.2.6,5.9a8.13,8.13,0,0,1-2.4,2.65,42.1,42.1,0,0,1-6.35,3q-5,2-8.9-4.1a49.42,49.42,0,0,1-5.85-12.25l-2-6.35q0,4.55-3.25,14l-.15.4q-3.3,9-12,7.3-7.55-1.5-7.9-7.3l.1-2.15A177.39,177.39,0,0,1,271.1,165l-4.35-10.8L250,112.19l-.4-1.25-4.5-13.55q-3.4-10.05,6.35-16t16.1,8.1a173.9,173.9,0,0,1,8.2,21.4q4.4,14.4,9.45,38.25l.05.25.15,1.95.65,4.3m.6-11.7a4,4,0,0,1-1.15-2.8l-3.15-54q-.15-10,9.5-9.85,12.25-.2,14.85,5.75a28.49,28.49,0,0,1,1.55,5l.4,2.35.7,17L307,142.89" fill="none" stroke="#2895b2" stroke-linecap="round" stroke-linejoin="round"></path>\n                <path id="Layer0_0_2_STROKES-2" data-name="Layer0 0 2 STROKES" d="M286,155.69l.3.75q.45-3.4,3-3.4h12.75a5.24,5.24,0,0,0,2.05-3.15,4.4,4.4,0,0,0-.9-3.1l-12.65-1.5-4-1.3m20.35-1.1q2.5,2,14.6,3a5.68,5.68,0,0,1,1.75,4,6.43,6.43,0,0,1-1.7,3.75q-12.35,1.8-15.65,4.55" fill="none" stroke="#2895b2" stroke-linecap="round" stroke-linejoin="round"></path>\n            </g>\n            <g id="settworighttwo">\n                <g id="Layer1_0_FILL-13" data-name="Layer1 0 FILL">\n                    <path d="M304.55,146.54a6.85,6.85,0,0,0-.2,7l15.9,3.5,2.15,11.1.15,1.25a177.18,177.18,0,0,0-6.7,26.3l-.1,2.15q.35,5.8,7.9,7.3,8.65,1.7,12-7.3l.15-.4q3.25-9.4,3.25-14l2,6.35A49.42,49.42,0,0,0,346.85,202q3.9,6.15,8.9,4.1a42.1,42.1,0,0,0,6.35-2.95,8.13,8.13,0,0,0,2.4-2.65q1-1.7-.6-5.9a142.08,142.08,0,0,0-12.15-24.45q3.7-5.5,9.2-20.9t11.7-34.3a101.51,101.51,0,0,0,3.75-16.6l.2-2.4-.2-5.25q-.95-6.45-12.85-9.4-9.3-2.65-11.7,7-7.75,36.6-11.9,66.75l-.2,1.25.2-1.25q-6.85-3.75-16.55-2.65-3.95-3.55.3-7.2l14.65-4.95.15-4.5,1.6-19.75a170.31,170.31,0,0,0-.15-22.9Q338.85,77.94,327.7,80a14.94,14.94,0,0,0-8.1,3.9,12.32,12.32,0,0,0-3.35,8.75l0,0-.6,15.55.45,24,1.15,8.7Z" fill="#c978af" stroke="#fcf" stroke-miterlimit="10"></path>\n                </g>\n                <path id="Layer1_0_1_STROKES-13" data-name="Layer1 0 1 STROKES" d="M320.25,157l-15.9-3.5a6.85,6.85,0,0,1,.2-7l12.65-5.6m21.3-5.1-.15,4.5-14.65,4.95q-4.25,3.65-.3,7.2,9.7-1.1,16.55,2.65" fill="none" stroke="#ffcfff" stroke-linecap="round" stroke-linejoin="round"></path>\n                <path id="Layer1_0_2_STROKES-3" data-name="Layer1 0 2 STROKES" d="M317.2,140.94l-1.15-8.7-.45-24,.6-15.55,0,0a12.32,12.32,0,0,1,3.35-8.75,14.94,14.94,0,0,1,8.1-3.9q11.15-2,12.25,13.2a170.31,170.31,0,0,1,.15,22.9l-1.6,19.75m1.45,19.3q4.15-30.15,11.9-66.75,2.4-9.7,11.7-7,11.9,3,12.85,9.4l.2,5.25-.2,2.4a101.51,101.51,0,0,1-3.75,16.6q-6.25,19-11.7,34.3t-9.2,20.9a142.08,142.08,0,0,1,12.15,24.45q1.55,4.2.6,5.9a8.13,8.13,0,0,1-2.4,2.65,42.1,42.1,0,0,1-6.35,2.95q-5,2.05-8.9-4.1A49.42,49.42,0,0,1,341,189.79l-2-6.35q0,4.55-3.25,14l-.15.4q-3.3,9-12,7.3-7.55-1.5-7.9-7.3l.1-2.15a177.18,177.18,0,0,1,6.7-26.3l-.15-1.25L320.25,157m19.5-.6.2-1.25" fill="none" stroke="#fcf" stroke-linecap="round" stroke-linejoin="round"></path>\n            </g>\n            <g id="settwolefttwo">\n                <g id="Layer0_0_FILL-13" data-name="Layer0 0 FILL">\n                    <path d="M251.45,81.44q-9.75,5.9-6.35,16l4.9,14.8L271.1,165a177.39,177.39,0,0,0-6.75,26.55l-.1,2.15q.35,5.8,7.9,7.3,8.65,1.7,12-7.3l.15-.4q3.25-9.4,3.25-14l2,6.35A49.42,49.42,0,0,0,295.35,198q3.9,6.15,8.9,4.1a42.1,42.1,0,0,0,6.35-3,8.13,8.13,0,0,0,2.4-2.65q.95-1.7-.6-5.9a139.09,139.09,0,0,0-11.85-23.9q-.25-3.8,5.45-8.5,3.3-2.75,15.65-4.55,3.35-4-.05-7.75-12.1-.95-14.6-3l2.35-35.35-.7-17-.4-2.35a28.49,28.49,0,0,0-1.55-5q-2.6-6-14.85-5.75-9.65-.15-9.5,9.85l3.15,54a4,4,0,0,0,1.15,2.8l4,1.3,12.65,1.5q2.3,3.35-1.15,6.25H289.4q-2.6,0-3,3.4l-.3-.75-.8-6.25-.05-.25q-5-23.85-9.45-38.25a173.9,173.9,0,0,0-8.2-21.4Q261.15,75.59,251.45,81.44Z" fill="#344da1" stroke="#2895b2" stroke-miterlimit="10"></path>\n                </g>\n                <path id="Layer0_0_1_STROKES-13" data-name="Layer0 0 1 STROKES" d="M306,158.19q-5.7,4.7-5.45,8.5a139.09,139.09,0,0,1,11.85,23.9q1.55,4.2.6,5.9a8.13,8.13,0,0,1-2.4,2.65,42.1,42.1,0,0,1-6.35,3q-5,2-8.9-4.1a49.42,49.42,0,0,1-5.85-12.25l-2-6.35q0,4.55-3.25,14l-.15.4q-3.3,9-12,7.3-7.55-1.5-7.9-7.3l.1-2.15A177.39,177.39,0,0,1,271.1,165L250,112.19l-4.9-14.8q-3.4-10.05,6.35-16t16.1,8.1a173.9,173.9,0,0,1,8.2,21.4q4.4,14.4,9.45,38.25l.05.25.8,6.25m.6-11.7a4,4,0,0,1-1.15-2.8l-3.15-54q-.15-10,9.5-9.85,12.25-.2,14.85,5.75a28.49,28.49,0,0,1,1.55,5l.4,2.35.7,17L307,142.89" fill="none" stroke="#2895b2" stroke-linecap="round" stroke-linejoin="round"></path>\n                <path id="Layer0_0_2_STROKES-3" data-name="Layer0 0 2 STROKES" d="M286,155.69l.3.75q.45-3.4,3-3.4h12.75q3.45-2.9,1.15-6.25l-12.65-1.5-4-1.3m20.35-1.1q2.5,2,14.6,3,3.4,3.75.05,7.75-12.35,1.8-15.65,4.55" fill="none" stroke="#2895b2" stroke-linecap="round" stroke-linejoin="round"></path>\n            </g>\n            <g id="settworightone">\n                <g id="Layer1_0_FILL-14" data-name="Layer1 0 FILL">\n                    <path d="M307.9,147q-2.85,3.5.5,6L320.25,157l2.15,11.1.15,1.25a177.18,177.18,0,0,0-6.7,26.3l-.1,2.15q.35,5.8,7.9,7.3,8.65,1.7,12-7.3l.15-.4q3.25-9.4,3.25-14l2,6.35A49.42,49.42,0,0,0,346.85,202q3.9,6.15,8.9,4.1a42.1,42.1,0,0,0,6.35-2.95,8.13,8.13,0,0,0,2.4-2.65q1-1.7-.6-5.9a142.08,142.08,0,0,0-12.15-24.45q3.7-5.5,9.2-20.9t11.7-34.3a101.51,101.51,0,0,0,3.75-16.6l.2-2.4-.2-5.25q-.95-6.45-12.85-9.4-9.3-2.65-11.7,7-7.9,37.35-12.1,68l-.1-3.3-11.75-3.9q-3.35-2.5-.5-6l11.1-7.1v-.25l1.6-19.75a170.31,170.31,0,0,0-.15-22.9Q338.85,77.94,327.7,80a14.94,14.94,0,0,0-8.1,3.9,12.32,12.32,0,0,0-3.35,8.75l0,0-.55,14.25-.05,1.3.45,24,1.15,8.7Z" fill="#c978af"></path>\n                </g>\n                <path id="Layer1_0_1_STROKES-14" data-name="Layer1 0 1 STROKES" d="M317.2,140.94l-1.15-8.7-.45-24,.05-1.3.55-14.25,0,0a12.32,12.32,0,0,1,3.35-8.75,14.94,14.94,0,0,1,8.1-3.9q11.15-2,12.25,13.2a170.31,170.31,0,0,1,.15,22.9l-1.6,19.75m1.15,17.25.1,3.3q4.2-30.65,12.1-68,2.4-9.7,11.7-7,11.9,3,12.85,9.4l.2,5.25-.2,2.4a101.51,101.51,0,0,1-3.75,16.6q-6.25,19-11.7,34.3t-9.2,20.9a142.08,142.08,0,0,1,12.15,24.45q1.55,4.2.6,5.9a8.13,8.13,0,0,1-2.4,2.65,42.1,42.1,0,0,1-6.35,2.95q-5,2.05-8.9-4.1A49.42,49.42,0,0,1,341,189.79l-2-6.35q0,4.55-3.25,14l-.15.4q-3.3,9-12,7.3-7.55-1.5-7.9-7.3l.1-2.15a177.18,177.18,0,0,1,6.7-26.3l-.15-1.25L320.25,157" fill="none" stroke="#fcf" stroke-linecap="round" stroke-linejoin="round"></path>\n                <path id="Layer1_0_2_STROKES-4" data-name="Layer1 0 2 STROKES" d="M320.25,157,308.4,153q-3.35-2.5-.5-6l9.3-6.1m21.3-5.1v.25l-11.1,7.1q-2.85,3.5.5,6l11.75,3.9" fill="none" stroke="#ffcfff" stroke-linecap="round" stroke-linejoin="round"></path>\n            </g>\n            <g id="settwoleftone">\n                <g id="Layer0_0_FILL-14" data-name="Layer0 0 FILL">\n                    <path d="M291.5,146.49a12.81,12.81,0,0,1-4.85-2.5q-.35,1,4.85,2.5m3.5,5.75q2.2-1.4,1.9-2.8a4.1,4.1,0,0,1-1.1,1.9Z" fill="#344da1" stroke="#2895b2" stroke-miterlimit="10"></path>\n                    <path d="M251.45,81.44q-9.75,5.9-6.35,16l4.5,13.55.4,1.25,16.75,42.05L271.1,165a177.39,177.39,0,0,0-6.75,26.55l-.1,2.15q.35,5.8,7.9,7.3,8.65,1.7,12-7.3l.15-.4q3.25-9.4,3.25-14l2,6.35A49.42,49.42,0,0,0,295.35,198q3.9,6.15,8.9,4.1a42.1,42.1,0,0,0,6.35-3,8.13,8.13,0,0,0,2.4-2.65q.95-1.7-.6-5.9a139.09,139.09,0,0,0-11.85-23.9q-.25-3.8,5.45-8.5a29.14,29.14,0,0,1,9.65-4.8q3.6-2,1.95-4a82.67,82.67,0,0,1-10.6-6.5l2.35-35.35-.7-17-.4-2.35a28.49,28.49,0,0,0-1.55-5q-2.6-6-14.85-5.75-9.65-.15-9.5,9.85l3.15,54a4,4,0,0,0,1.15,2.8,12.81,12.81,0,0,0,4.85,2.5l.85.2,1.15.35.65.2,1.9.9a2.65,2.65,0,0,1,.85,1.3q.3,1.4-1.9,2.8h-.05l-.9.4-2,1-5.65,2.8-.3-.75-.65-4.3-.15-1.95-.05-.25q-5-23.85-9.45-38.25a173.9,173.9,0,0,0-8.2-21.4Q261.15,75.59,251.45,81.44Z" fill="#344da1" stroke="#2895b2" stroke-miterlimit="10"></path>\n                </g>\n                <path id="Layer0_0_1_STROKES-14" data-name="Layer0 0 1 STROKES" d="M306,158.19q-5.7,4.7-5.45,8.5a139.09,139.09,0,0,1,11.85,23.9q1.55,4.2.6,5.9a8.13,8.13,0,0,1-2.4,2.65,42.1,42.1,0,0,1-6.35,3q-5,2-8.9-4.1a49.42,49.42,0,0,1-5.85-12.25l-2-6.35q0,4.55-3.25,14l-.15.4q-3.3,9-12,7.3-7.55-1.5-7.9-7.3l.1-2.15A177.39,177.39,0,0,1,271.1,165l-4.35-10.8L250,112.19l-.4-1.25-4.5-13.55q-3.4-10.05,6.35-16t16.1,8.1a173.9,173.9,0,0,1,8.2,21.4q4.4,14.4,9.45,38.25l.05.25.15,1.95.65,4.3m.6-11.7a4,4,0,0,1-1.15-2.8l-3.15-54q-.15-10,9.5-9.85,12.25-.2,14.85,5.75a28.49,28.49,0,0,1,1.55,5l.4,2.35.7,17L307,142.89" fill="#344da1" stroke="#2895b2" stroke-miterlimit="10"></path>\n                <path id="Layer0_0_2_STROKES-4" data-name="Layer0 0 2 STROKES" d="M286,155.69l.3.75,5.65-2.8,2-1,.9-.4H295m1.9-2.8a2.65,2.65,0,0,0-.85-1.3l-1.9-.9-.65-.2-2-.55m15.5-3.6a82.67,82.67,0,0,0,10.6,6.5q1.65,2-1.95,4a29.14,29.14,0,0,0-9.65,4.8m-11-5.95q2.2-1.4,1.9-2.8m-5.4-2.95a12.81,12.81,0,0,1-4.85-2.5" fill="#344da1" stroke="#2895b2" stroke-miterlimit="10"></path>\n            </g>\n\n        </svg>\n'
    ]);
    _templateObject_03b16690f1e611e890b38d7ae81f2a0f = function _templateObject_03b16690f1e611e890b38d7ae81f2a0f() {
      return data;
    };
    return data;
  }
  (0, _polymerLegacy.Polymer)({
    _template: (0, _polymerLegacy.html)(
      _templateObject_03b16690f1e611e890b38d7ae81f2a0f()
    ),
    is: "gene-crossover-3",
    properties: {
      tl: { type: Object },
      selected: { type: Boolean, value: !1 },
      animationReady: { type: Boolean, value: !1 }
    },
    observers: ["_selectedChanged(selected, animationReady)"],
    _selectedChanged: function _selectedChanged(selected, animationReady) {
      if (!animationReady) {
        return;
      }
      if (selected) {
        this.tl.play();
      } else {
        this.tl.progress(0);
        this.tl.pause();
      }
    },
    ready: function ready() {
      var root = this,
        tl = new TimelineMax(),
        playButton = this.shadowRoot.querySelector("#play-button"),
        replayButton = this.shadowRoot.querySelector("#replay-button"),
        svg = this.shadowRoot.querySelector("#chromosomes"),
        settworightfive = svg.getElementById("settworightfive"),
        settworightfour = svg.getElementById("settworightfour"),
        settworightthree = svg.getElementById("settworightthree"),
        settworighttwo = svg.getElementById("settworighttwo"),
        settworightone = svg.getElementById("settworightone"),
        settwoleftfive = svg.getElementById("settwoleftfive"),
        settwoleftfour = svg.getElementById("settwoleftfour"),
        settwoleftthree = svg.getElementById("settwoleftthree"),
        settwolefttwo = svg.getElementById("settwolefttwo"),
        settwoleftone = svg.getElementById("settwoleftone");
      tl.set(
        [
          settwoleftfive,
          settwoleftfour,
          settwoleftthree,
          settwolefttwo,
          settworightfive,
          settworightfour,
          settworightthree,
          settworighttwo
        ],
        { display: "none" }
      );
      tl.to([settwoleftone, settworightone], 0.5, { display: "none" })
        .to([settwolefttwo, settworighttwo], 0.5, { display: "block" })
        .to([settwolefttwo, settworighttwo], 0.1, { display: "none" })
        .to([settwoleftthree, settworightthree], 0.5, { display: "block" })
        .to([settwoleftthree, settworightthree], 0.1, { display: "none" })
        .to([settwoleftfour, settworightfour], 0.5, { display: "block" })
        .to([settwoleftfour, settworightfour], 0.1, { display: "none" })
        .to([settwoleftfive, settworightfive], 0.5, { display: "block" })
        .to([settwoleftfive], 0.5, { x: "-=10" })
        .to([settworightfive], 0.5, { x: "+=10" });
      this.tl = tl;
      this.tl.pause();
      this.animationReady = !0;
    }
  });
});
