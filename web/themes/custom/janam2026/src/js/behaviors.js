(function(Drupal, once, addBackToTop) {

  /**
   * Drupal behaviors for base theme.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.a12sBasetheme = {

    /**
     * Attach Drupal behaviors.
     *
     * @param context Element|jQuery The current execution context
     */
    attach: function (context) {
      // Define a variable that represents the full document when Drupal
      // behaviors were called first.
      let htmlOnce = once('a12sBasethemeLoaded', 'html', context);

      if (htmlOnce.length) {
        htmlOnce[0].classList.add('loaded');

        // Part back to top.
        let showWhenScrollTopIs = 150;

        if (document.querySelector('body.homepage')) {
          showWhenScrollTopIs = 700;
        }

        // Init the "back to top" button.
        addBackToTop({
          diameter: 50,
          backgroundColor: 'var(--primary)',
          innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10" fill="none">' +
            '  <path d="M17.4304 8.72789L17.4322 8.72968C17.7689 9.07052 18.3241 9.0929 18.6863 8.77495C18.7456 8.72608' +
            ' 18.7951 8.67155 18.8358 8.61371H19V8.11371C19 7.87304 18.8963 7.66187 18.7517 7.50747L18.7518 7.50737L18' +
            '.7435 7.49891C16.2778 4.98692 14.3346 3.35475 11.5786 1.48336C10.6311 0.83822 9.35697 0.839923 8.40404 ' +
            '1.48221L8.40343 1.48262C5.64699 3.34641 3.7034 4.97887 1.25371 7.48325C0.898413 7.84402 0.921679 8.4193' +
            '3 1.28942 8.75522C1.64416 9.07924 2.21304 9.07507 2.55329 8.71732C4.95769 6.26717 6.74487 4.76421 9.4256' +
            '6 2.94073C9.74982 2.72126 10.2231 2.72128 10.5473 2.94077C13.2297 4.76535 15.0251 6.26879 17.4304 8.7278' +
            '9Z" />\n' +
            '</svg>\n',
          showWhenScrollTopIs: showWhenScrollTopIs,
          scrollDuration: 500,
          textColor: 'var(--white)'
        });

        window.drupalSettings.dialog.create = () => {
          document.querySelector('.ui-dialog-titlebar-close').setAttribute('title', Drupal.t('Close'));
        };
      }
    }
  };

})(window.Drupal, window.once, window.addBackToTop);
