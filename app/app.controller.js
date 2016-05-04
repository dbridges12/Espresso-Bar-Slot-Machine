(function () {
    'use strict';
    /**
     * @name App Controller
     * @desc Main Controller for the Slot Machine page
     */
    function AppController() {
        var vm = this;

        // Text for main page - could be linked to back end and updated //
        vm.spinTitle = 'Click the Spin button below.';
        vm.buttonTitle = 'Spin the Wheels!';
        vm.pointOneTitle = 'Rich Italian Roast Coffee';
        vm.pointOneText = 'The finest ground Italian roast, very smooth and rich with virtually no bitterness at all.';
        vm.pointTwoTitle = 'Deep Dark Espresso';
        vm.pointTwoText = 'This select coffee is characterized by a new creamy consistency and unique aroma, allowing you to enjoy the best of Italian espresso.';
        vm.pointThreeTitle = 'Fine Oolong Tea';
        vm.pointThreeText = 'Prized for its complex flavors and floral aroma, this famous Taiwanese tea is carefully hand-plucked and handcrafted.';


        vm.slotwheeltracks = [];
        vm.wheelArray = [];

        // Initialization params //
        vm.slotrack = $('#slotrack'); // horizontal track that holds each wheel //
        vm.numWheels = 3;   // number of wheels that spin
        vm.numCopies = 20;  // how many copies of each image per wheel

        // array of images for each wheel //
        vm.wheel1 = ['<img class="slotimage" src="resources/images/coffee.jpeg">', '<img class="slotimage" src="resources/images/espresso-beans.jpeg">', '<img class="slotimage" src="resources/images/tea-leaves.jpeg">'];
        vm.wheel2 = ['<img class="slotimage" src="resources/images/filter.jpeg">', '<img class="slotimage" src="resources/images/tamper.jpeg">', '<img class="slotimage" src="resources/images/tea-ball.jpeg">'];
        vm.wheel3 = ['<img class="slotimage" src="resources/images/coffee-machine.jpeg">', '<img class="slotimage" src="resources/images/espresso-machine.jpeg">', '<img class="slotimage" src="resources/images/teapot.jpeg">'];

        // array of image wheels //
        vm.wheelArray.push(vm.wheel1);
        vm.wheelArray.push(vm.wheel2);
        vm.wheelArray.push(vm.wheel3);

        /**
         * @name initWheels
         * @desc builds the page for the slot machine
         */
        vm.initWheels = function () {
            var i, wrapperDiv, slotDiv, wrapperRef;

            // create the wrapper div and slot div for each wheel, then populate with images //
            for (i = 0; i < vm.numWheels; i++) {
                wrapperDiv = $('<div id="wrapper_' + i + '"  class ="wrapper">');
                slotDiv = $('<div class ="slot">');

                // add the wrapper and slot divs to each slot track //
                wrapperRef = wrapperDiv.append(slotDiv);
                vm.slotrack.append(wrapperDiv);

                // populate each wheel with 20 of each image //
                vm.addImages(wrapperRef, vm.wheelArray[i], vm.numCopies);

                // save references to each wrapper //
                vm.slotwheeltracks.push(wrapperRef);
            }
        };

        /**
         * @name initWheels
         * @desc appends all the images to each wheel based on reps
         */
        vm.addImages = function (wheeltrack, imagearray, reps) {
            var i, j;
            for (i = 0; i < reps; i++) {
                // add each image to the slot div of the wheeltrack reps number of times //
                for (j = 0; j < imagearray.length; j++) {
                    wheeltrack.children(":first").append(imagearray[j]);
                }
            }
        };

        /**
         * @name blinkWinner
         * @desc if a winner - blink the message 4 times
         */
        vm.blinkWinner = function () {
            var elem, count = 1, intervalId;

            $('.spinResult').each(function () {
                elem = $(this);
                // count the blinks
                intervalId = setInterval(function () {
                    if (elem.css('visibility') == 'hidden') {
                        elem.css('visibility', 'visible');
                        // increment counter when showing to count # of blinks and to stop when visible
                        if (count++ === 4) {
                            clearInterval(intervalId);
                        }
                    } else {
                        elem.css('visibility', 'hidden');
                    }
                }, 500);
            });
        };

        /**
         * @name spinSlots
         * @desc called when spin button is clicked - main animation routine
         */
        vm.spinSlots = function () {
            var maxval = 58,    // upper constraint on random number used to spin wheel
                minval = 22,    // lower constraint on random number used to spin wheel
                speedMax = 30,
                speedMin = 10,
                results = [],   // keeps track of which image will be the selected one
                magicNum = 0,   // used to calculate which
                animateResult = 0;

            // set the page after the button is clicked //
            $('.spinResult').text('Good Luck!');
            $('.spinbutton').prop("disabled",true);

            for (var i = 0; i < vm.numWheels; i++) {
                var slotPick = Math.floor(Math.random() * (maxval - minval + 1)) + minval,
                    slotSpeed = Math.floor(Math.random() * (speedMax - speedMin + 1)) + speedMin,
                    marginTop = 0;

                results.push(slotPick % 3);  // track which item will be selected % 3 is 0 for coffee, 1 for espresso and 2 for tea

                marginTop -= (slotPick * 150);  // set the top margin so the animation knows how far to go - exact multiple fo image size
                slotSpeed = slotSpeed * 100;  // each wheel will spin at a different speed

                vm.slotwheeltracks[i].children(":first").css("margin-top", "0px");  // this always gets reset to zero when you call the function

                vm.slotwheeltracks[i].children(":first").animate(
                    {"margin-top": marginTop + "px"}, slotSpeed, 'swing', function () {
                        magicNum = 0;
                        animateResult += 1;

                        // this makes sure we wait until the last wheel has finished before checking for a winner //
                        if (animateResult === 3) {

                            // Re-enable the spin button //
                            $('.spinbutton').prop("disabled",false);

                            for (var k = 0; k < results.length; k++) {
                                // need to confirm each result is the same i.e. 1,1,1; 0,0,0; 2,2,2
                                if (results[k] === results[k + 1] || k + 1 === results.length) {
                                    magicNum += results[k];
                                } else {
                                    magicNum += 20;  // this basically handles a false positive of 1,1,1 and 2,0,1
                                }
                            }

                            switch (magicNum) {
                                case 0:
                                    $('.spinResult').text('Congratulations! You won a cup of coffee!');
                                    vm.blinkWinner();
                                    break;
                                case 3:
                                    $('.spinResult').text('Congratulations! You won an espresso.');
                                    vm.blinkWinner();
                                    break;
                                case 6:
                                    $('.spinResult').text('Congratulations! You won a cup of tea.');
                                    vm.blinkWinner();
                                    break;
                                default:
                                    $('.spinResult').text('Sorry, no luck. Try again.');
                                    break;
                            }
                            console.log('MagicNum', magicNum, results);
                        }
                    });
            }
        };

        // initialize each slot wheel when the controller loads //
        vm.initWheels();
    }

    angular
        .module('ebsm')
        .controller('AppController', [AppController]);
}());