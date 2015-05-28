
Unpack the libraries API into your Drupal 7 modules directory

Unpack this module into your Drupal 7 modules directory

Relative to the Drupal home,
  mkdir -p sites/all/libraries/jqueryi18nproperties

Download jquery.i18n.properties.js to
  sites/all/libraries/jqueryi18nproperties

Create the VERSION file:

echo "1.0" > sites/all/libraries/jqueryi18nproperties/VERSION

Now log in to Drupal, go to the Modules administration page and
enable the modules:

  * libraries
  * jqueryi18nproperties

Finally, install and enable any other modules that want to use it.

