# UW Boundless Theme

This Bootstrap 3.x sub-theme replicates the [WordPress theme](https://github.com/uweb/uw-2014) developed by [UW Marketing & Communications](https://uw.edu/brand).

Maintaining this theme is currently a volunteer effort provided by the UW Drupal Community. We do our best to keep the theme up to date with the UMAC version.

**Questions?** Contact the maintainers at [drupal-theme@uw.edu](mailto:drupal-theme@uw.edu).

## Contents

* [Requirements](#requirements)
* [Development notes](#development-notes)
* [Installation](#installation)
* [Configuration](#configuration)
* [Creating a sub-theme](#sub-theme)
* [Authors](#authors)

## <a name="requirements"></a>REQUIREMENTS

1. The [Bootstrap 3.x](https://www.drupal.org/project/bootstrap) base theme.
2. jQuery 1.10 minimum. Install the [jQuery Update](http://drupal.org/project/jquery_update) module to manage your jQuery version.
3. Your site's primary navigation uses a menu called "Main menu" (main_menu).
4. Drupal core Search module. (If you use a different search module, you may need to customize the styles, either with a sub-theme or JS injector + CSS injector).

### Recommendation:

For simplified navigation of the Management menu, install the [Administration menu](https://www.drupal.org/project/admin_menu) module.


## <a name="development-notes"></a>DEVELOPMENT NOTES

* The UW Boundless theme uses local bootstrap source files using the [LESS Starterkit](https://drupal-bootstrap.org/api/bootstrap/starterkits%21less%21README.md/7).
* The style sheet (css/style.css) is compiled using LESS CSS preprocessor.
* Scripts are not compiled and merely declared in the uw_boundless.info file.

## <a name="installation"></a>INSTALLATION

The following documentation assumes:

* A clean installation of Drupal 7 (Some instructions may not apply exactly to existing Drupal 7 installations.)
* Use of the Main menu (main_menu).

1. Enable the jQuery Update module.

2. Enable the Bootstrap base theme. *Note: The Bootstrap base theme must be enabled. The UW Boundless theme may appear to work without it, but certain features will not work correctly.*

3. Download this theme and put the extracted folder in the sites/[all|my_sitename]/themes/ folder of your site. Make sure the folder name is "uw_boundless".

4. Enable the uw_boundless theme and set it as the default theme.

5. Enable the core Search module. (See note about Search in the [Requirements](#requirements) section.)

## <a name="configuration"></a>CONFIGURATION

### 1. Set jQuery Update

Go to jQuery Update settings (admin/config/development/jquery_update) and set default jQuery version to 1.10 or greater.

### 2. Disable Bootstrap CDN

1. Go to the settings for the UW Boundless theme (admin/appearance/settings/uw_boundless).
2. Under **Bootstrap Settings**, click the **Advanced** tab, expand **CDN (Content Delivery Network)**. Under CDN provider, choose *None*.

### 3. Display Main menu
1. In the **UW Boundless theme settings** under **Toggle display**, verify that *Main menu* is checked.
2. Go to the **Blocks** page (admin/structure/block) and click the **configure** link next to the *Main menu* block.

    * Block title: `<none>`
    * Region: Navigation

3. Go to the *Main menu* settings page (admin/structure/menu/manage/main-menu) and make sure that all top-level menu items with children are marked "Show as expanded".

### 4. Display Search form

*See note about Search in the [Requirements](#requirements) section.*

1. Go to the **Blocks** page (admin/structure/block) and click the **configure** link next to the *Search* block.

    * Block title: `<none>`
    * Region: Search

## <a name="sub-theme"></a>CREATING A SUB-THEME

Follow Drupal's instructions for [Creating a sub-theme](https://www.drupal.org/node/225125).

## <a name="authors"></a>AUTHORS

* UW Boundless brand design & development (2014): [UW Marketing & Communications](http://www.washington.edu/brand/)
* Drupal 7 theme implementation (2015): [UW Creative Communications](https://finance.uw.edu/c2/)
* Drupal 7 theme maintenance: [UW Drupal User Group](https://depts.washington.edu/uwdrupal/)
