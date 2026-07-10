(function (Drupal, once) {

  /**
   * Manage display of the Drupal messages.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.a12sBasethemeDrupalMessages = {

    attach: function attach(context) {
      const drupalMessagesBlock = once('a12sBasethemeDrupalMessages', '#block-a12s-basetheme-messages', context)[0];
      const refreshDrupalMessage = () => {
        const countMessages = drupalMessagesBlock.querySelectorAll('#block-a12s-basetheme-messages > [role]').length;

        if (countMessages) {
          // Not display the text 'no message' and open the modal.
          // @todo should we keep this?
          drupalMessagesBlock.querySelector('.no-message')?.classList.add('d-none');

          const dialog = Drupal.dialog(drupalMessagesBlock, {
            title: countMessages > 1 ? Drupal.t('Informational Messages') : Drupal.t('Informational Message'),
          });

          // If the dialog appears too early, it may be invisible.
          setTimeout(dialog.showModal.bind(dialog), 1000);

          // Add a button to open the modal.
          const dialogToggle = document.createElement('div');
          dialogToggle.classList.add('drupal-message-dialog-toggle', 'position-fixed');
          dialogToggle.innerHTML =
            '<a class="d-block bg-primary rounded text-white position-relative">' +
            '<div class="count-messages position-absolute">' +
            '<span class="d-block position-relative">' + countMessages + '</span>' +
            '</div>' +
            '<i class="fi--info position-absolute"></i>' +
            '</a>';

          dialogToggle.addEventListener('click', () => {
            dialog.showModal();
          });

          document.body.append(dialogToggle);
        }
      };

      if (drupalMessagesBlock) {
        refreshDrupalMessage();
        const observer = new MutationObserver(refreshDrupalMessage);
        observer.observe(drupalMessagesBlock, {childList: true, subtree: true});
      }
    }

  };

})(window.Drupal, window.once);
