(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', initListeners, false);

    /**
     * Init Event listeners of page
     */
    function initListeners () {
        document.querySelector("input[name='chain']").addEventListener('click', onClickInput);
        document.querySelector("input[name='chain']").addEventListener('blur', onBlurInput);
        document.querySelector('form').addEventListener('submit', onSubmit);
    }

    /**
     * Event listener callback of Submit action :
     * reset screen AND
     * call API with formated chain AND
     * display Boxes and result OR
     * display Error message
     * @param {Object} event
     */
    function onSubmit (event) {
        event.preventDefault();
        resetResultsDisplay();
        const formatedChain = getInputValue();
        if (formatedChain === '') {
            document.querySelector('.label-error').classList.add('visible');
        } else {
            document.querySelector('.label-error').classList.remove('visible');
            document.querySelector('.label-action').classList.remove('visible');
            provider(formatedChain, displayResults);
        }
    }

    /**
     * Event listener callback of Click input action :
     * display label message
     */
    function onClickInput () {
        document.querySelector('.label-action').classList.add('visible');
    }

    /**
     * Event listener callback of Click input action :
     * Hide label message
     */
    function onBlurInput () {
        document.querySelector('.label-action').classList.remove('visible');
    }

    /**
     * Event listener callback of Click input action :
     * display boxes animation and results OR
     * display error
     * @param {object}
     */
    function displayResults (response) {
        if (!response && response.packagedBoxes) {
            document.querySelector('.api-error').classList.add('visible');
            setTimeout(() => {
                document.querySelector('.api-error').classList.remove('visible');
            }, 3000);
        } else {
            displayBoxesAnimation(response.packagedBoxes);
            setTimeout(() => {
                document.querySelector('.label-result').innerHTML = response.packagedBoxes.join('/') + '      boxe count: ' + response.count;
                document.querySelector('.label-result').classList.add('visible');
            }, 3000);
        }
    }

    /**
     * hide previous boxes and results
     */
    function resetResultsDisplay () {
        document.querySelector('.flex-container').innerHTML = '';
        document.querySelector('.label-result').innerHTML = '';
        document.querySelector('.label-result').classList.remove('visible');
    }

    /**
     * Display each boxe value in html boxe every 300ms
     * @param {Array<String>} boxes
     */
    function displayBoxesAnimation (boxes) {
        let i = 0;
        const interval = setInterval(() => {
            const boxe = boxes[i];
            const textnode = document.createTextNode(boxe);
            let node = document.createElement('LI');
            node.appendChild(textnode);
            document.querySelector('.flex-container').appendChild(node);
            i++;
            if (i === boxes.length) clearInterval(interval);
        }, 300);
    }

    /**
     * call XspeedIt API packager to get packaged boxes with items
     * @param {String} input
     * @param {Function} callback
     */
    function provider (input, callback) {
        var xhttp = new XMLHttpRequest(); // eslint-disable-line no-undef
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && (this.status === 200 || this.status === 304)) {
                callback(JSON.parse(this.responseText));
            } else if (this.readyState === 4 && (this.status !== 200 || this.status !== 304)) {
                callback(false); // eslint-disable-line standard/no-callback-literal
            }
        };
        xhttp.open('GET', '/packager/' + input, true);
        xhttp.send();
    }

    /**
     * get dom input value
     */
    function getInputValue () {
        const OriginalString = document.querySelector("input[name='chain']").value;
        return escapeInvalidChar(stripTags(OriginalString));
    }

    /**
     * escape HTML tags
     * @param {String} chain
     */
    function stripTags (chain) {
        return chain.replace(/(<([^>]+)>)/ig, '');
    }

    /**
     * escape all char excepted number from 1 to 9
     * @param {String} chain
     */
    function escapeInvalidChar (chain) {
        return chain.replace(/([^1-9]+)/g, '');
    }
})();
