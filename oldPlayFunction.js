$scope.play = function(face) {

    var chorus = new tuna.Chorus({
        rate: Math.ceil(noseRootWidth / 5), //0.01 to 8+
        feedback: .7, //0 to 1+
        delay: 0.1, //0 to 1
        bypass: 0 //the value 1 starts the effect as bypassed, 0 or 1
    });
    var delay = new tuna.Delay({
        feedback: pupilSpace / 600, //0 to 1+
        delayTime: eyeSpace / 2, //how many milliseconds should the wet signal be delayed?
        wetLevel: 0.25, //0 to 1+
        dryLevel: 1, //0 to 1+
        cutoff: 2000, //cutoff frequency of the built in lowpass-filter. 20 to 22050
        bypass: 0
    });
    var phaser = new tuna.Phaser({
        rate: eyebrowSpaceY, //0.01 to 8 is a decent range, but higher values are possible
        depth: 0.8, //0 to 1
        feedback: 0.5, //0 to 1+
        stereoPhase: eyebrowSpaceY + eyebrowSpaceX * 9, //0 to 180
        baseModulationFrequency: eyebrowSpaceY * 10, //500 to 1500
        bypass: 0
    });
    var filter = new tuna.Filter({
        frequency: lipSpace * 100, //20 to 22050
        Q: lipSpace, //0.001 to 100
        gain: 10, //-40 to 40
        filterType: "bandpass", //lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass
        bypass: 0
    });
    var wahwah = new tuna.WahWah({
        automode: true, //true/false
        baseFrequency: .5, //0 to 1
        excursionOctaves: 2, //1 to 6
        sweep: 0.8, //0 to 1
        resonance: noseAlarWidth, //1 to 100
        sensitivity: 0.7, //-1 to 1
        bypass: 0
    });

    generateTone(200);

    function generateTone(duration) {
        // Create oscillator
        var osc = audioContext.createOscillator();
        osc.frequency.value = mouthWidth * age / 16;

        // Set oscillator type
        osc.type = $scope.face.gender === 'female' ? 'square' : 'sawtooth';

        // Connections
        osc.connect(chorus);
        chorus.connect(delay);
        delay.connect(phaser);
        phaser.connect(filter);
        filter.connect(wahwah);
        wahwah.connect(audioContext.destination);

        // Play it!
        osc.start();
        $timeout(function() {
            osc.stop();
        }, duration);
    }
}
