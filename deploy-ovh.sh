#! /bin/bash

rsync -avz ./composer.json vfhqbji@ssh.cluster100.hosting.ovh.net:/homez.2213/vfhqbji/corporate/prod/composer.json
rsync -avz --delete ./config/ vfhqbji@ssh.cluster100.hosting.ovh.net:/homez.2213/vfhqbji/corporate/prod/config/


rsync -avz \
  --exclude=/aion-solutions/a12_drupal_compiler \
  ./vendor/ vfhqbji@ssh.cluster100.hosting.ovh.net:/homez.2213/vfhqbji/corporate/prod/vendor/

rsync -avz \
  --exclude=.git \
  ../packages/a12s/ vfhqbji@ssh.cluster100.hosting.ovh.net:/homez.2213/vfhqbji/corporate/prod/web/modules/contrib/a12s/

rsync -avz \
  --exclude=/.idea \
  --exclude=/.ds_store \
  --exclude=/.git \
  --exclude=/.gitignore \
  --exclude=/sites/default/files/ \
  --exclude=/sites/default/settings.local.php \
  --exclude=/sites/development.services.yml \
  --exclude=/modules/contrib/a12s \
  web/ vfhqbji@ssh.cluster100.hosting.ovh.net:/homez.2213/vfhqbji/corporate/prod/web/
