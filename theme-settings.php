<?php
/**
 * @file
 * theme-settings.php
 *
 * Provides theme settings for the UW Boundless theme.
 *
 */

/**
 * Implements hook_form_FORM_ID_alter().
 */
function uw_boundless_form_system_theme_settings_alter(&$form, $form_state, $form_id = NULL) {
    // Work-around for a core bug affecting admin themes.
    // @see https://drupal.org/node/943212
    if (isset($form_id)) {
        return;
    }
    
    // array of UW colors for select options
    $_colors = array(
        '#4b2e83' => t('Purple'),
        '#b7a57a' => t('Gold'),
        '#85754d' => t('Metallic Gold'),
        '#d9d9d9' => t('Light Grey'),
        '#444444' => t('Dark Grey'),
        '#000000' => t('Black'),
        '#ffffff' => t('White'),
    );
    
    // UW Boundless Theme Settings 
    $form['uw_boundless'] = array(
        '#type' => 'vertical_tabs',
        '#prefix' => '<h2><small>' . t('UW Boundless Theme Settings') . '</small></h2>',
        '#weight' => -11,
    );
    
    // Hero image 
    $form['uw_boundless_hero_image'] = array(
        '#type' => 'fieldset',
        '#title' => t('Hero Image'),
        '#group' => 'uw_boundless',
    );
    // Hero image settings for the image on the default front page
    $form['uw_boundless_hero_image']['front_page'] = array(
        '#type' => 'fieldset',
        '#title' => t('front page hero-image'),
        '#collapsible' => TRUE,
        '#collapsed' => TRUE,
    );
    $form['uw_boundless_hero_image']['front_page']['uw_boundless_hero_image_front_default'] = array(
        '#type' => 'checkbox',
        '#title' => t('Use the default hero-image'),
        '#default_value' => theme_get_setting('uw_boundless_hero_image_front_default'),
        '#tree' => FALSE,
        '#description' => t('Check here if you want the theme to use the hero-image supplied with it.')
    );
    $form['uw_boundless_hero_image']['front_page']['settings'] = array(
        '#type' => 'container',
        '#states' => array(
        // Hide the header settings when using the default header.
        'invisible' => array(
            'input[name="uw_boundless_hero_image_front_default"]' => array('checked' => TRUE),
            ),
        ),
    );
    $form['uw_boundless_hero_image']['front_page']['settings']['uw_boundless_hero_image_front_path'] = array(
        '#type' => 'textfield',
        '#title' => t('Path to custom hero-image'),
        '#description' => t('The path to the file you would like to use as your hero-image file instead of the default hero-image. Suggested dimensions: 1600 x 622'),
        '#default_value' => theme_get_setting('uw_boundless_hero_image_front_path'),
    );
    $form['uw_boundless_hero_image']['front_page']['settings']['hero_image_front_upload'] = array(
        '#type' => 'file',
        '#title' => t('Upload hero-image'),
        '#maxlength' => 40,
        '#description' => t("If you don't have direct file access to the server, use this field to upload your hero-image. The path will be set automatically.")
    );
    
    // Hero image settings for the image used on other pages
    $form['uw_boundless_hero_image']['other_page'] = array(
        '#type' => 'fieldset',
        '#title' => t('hero-image '),
        '#collapsible' => TRUE,
        '#collapsed' => TRUE,
    );
    $form['uw_boundless_hero_image']['other_page']['uw_boundless_hero_image_default'] = array(
        '#type' => 'checkbox',
        '#title' => t('Use the default hero-image'),
        '#default_value' => theme_get_setting('uw_boundless_hero_image_default'),
        '#tree' => FALSE,
        '#description' => t('Check here if you want the theme to use the hero-image supplied with it.')
    );
    $form['uw_boundless_hero_image']['other_page']['settings'] = array(
        '#type' => 'container',
        '#states' => array(
        // Hide the header settings when using the default header.
        'invisible' => array(
            'input[name="uw_boundless_hero_image_default"]' => array('checked' => TRUE),
            ),
        ),
    );
    $form['uw_boundless_hero_image']['other_page']['settings']['uw_boundless_hero_image_path'] = array(
        '#type' => 'textfield',
        '#title' => t('Path to custom hero-image'),
        '#description' => t('The path to the file you would like to use as your header file instead of the default hero-image. Suggested dimensions: 1600 x 226'),
        '#default_value' => theme_get_setting('uw_boundless_hero_image_path'),
    );
    $form['uw_boundless_hero_image']['other_page']['settings']['hero_image_upload'] = array(
        '#type' => 'file',
        '#title' => t('Upload hero-image'),
        '#maxlength' => 40,
        '#description' => t("If you don't have direct file access to the server, use this field to upload your hero-image. The path will be set automatically.")
    );
    
    // Color settings 
    $form['uw_boundless_colors'] = array(
        '#type' => 'fieldset',
        '#title' => t('Color settings'),
        '#group' => 'uw_boundless',
        '#description' => t('Set the color display of certain page elements. For color references, see:') . ' ' . l(t('UW brand color palette'), 'http://www.washington.edu/brand/primary-color-palette/', array('attributes' => array('target' => '_blank'))),
    );
    $form['uw_boundless_colors']['front_page'] = array(
        '#type' => 'fieldset',
        '#title' => t('front page elements'),
        '#collapsible' => TRUE,
        '#collapsed' => TRUE,
    );
    // Front page title color
    $form['uw_boundless_colors']['front_page']['uw_boundless_front_page_title_color']= array(
        '#type' => 'select',
        '#title' => t('Site name'),
        '#default_value' => theme_get_setting('uw_boundless_front_page_title_color'),
        '#options' => $_colors,
    );
    // Front page slant color
    $form['uw_boundless_colors']['front_page']['uw_boundless_front_page_slant_color']= array(
        '#type' => 'select',
        '#title' => t('slant'),
        '#default_value' => theme_get_setting('uw_boundless_front_page_slant_color'),
        '#options' => $_colors,
    );
    // Front page slogan color
    $form['uw_boundless_colors']['front_page']['uw_boundless_front_page_slogan_color']= array(
        '#type' => 'select',
        '#title' => t('Site slogan'),
        '#default_value' => theme_get_setting('uw_boundless_front_page_slogan_color'),
        '#options' => $_colors,
    );
    
    // Sidebar menu 
    $form['uw_boundless_sidebar_menu'] = array(
        '#type' => 'fieldset',
        '#title' => t('Sidebar menu'),
        '#group' => 'uw_boundless',
    );
    // Sidebar menu visibilty
    $form['uw_boundless_sidebar_menu']['uw_boundless_sidebar_menu_visibility']= array(
        '#type' => 'select',
        '#title' => t('Sidebar menu visibility'),
        '#default_value' => theme_get_setting('uw_boundless_sidebar_menu_visibility'),
        '#options' => array(
            0 => t('Hidden'),
            1 => t('Visible'),
        ),
    );
    
    // add validate and submit functions to the form
    $form['#validate'][] = 'uw_boundless_theme_settings_validate';
    $form['#submit'][] = 'uw_boundless_theme_settings_submit';
}

/**
 * Validate settings
 * 
 * @param type $form
 * @param type $form_state
 */
function uw_boundless_theme_settings_validate($form, &$form_state) {
    // Handle file uploads.
    $validators = array('file_validate_is_image' => array());
    
    // Check for a new uploaded hero-image for the front page.
    $file_hero_front = file_save_upload('hero_image_front_upload', $validators);
    if (isset($file_hero_front)) {
        // File upload was attempted.
        if ($file_hero_front) {
            // Put the temporary file in form_values so we can save it on submit.
            $form_state['values']['hero_image_front_upload'] = $file_hero_front;
            $filename = file_unmanaged_copy($file_hero_front->uri);
            $form_state['values']['uw_boundless_hero_image_front_path'] = $filename;
        }
        else {
            // File upload failed.
            form_set_error('hero_image_front_upload', t('The image could not be uploaded.'));
        }
    }
    // If the user provided a path for a header file, make sure a file
    // exists at that path when default is not checked.
    if (!$form_state['values']['uw_boundless_hero_image_front_default']) {
        if ($form_state['values']['uw_boundless_hero_image_front_path']) {
            $path = _system_theme_settings_validate_path($form_state['values']['uw_boundless_hero_image_front_path']);
            if (!$path) {
                form_set_error('hero_image_front_path', t('The custom image path "uw_boundless_hero_image_front_path" is invalid.'));
            }
        }
    }

    // Check for a new uploaded hero-image for the other pages
    $file_hero = file_save_upload('hero_image_upload', $validators);
    if (isset($file_hero)) {
        // File upload was attempted.
        if ($file_hero) {
            // Put the temporary file in form_values so we can save it on submit.
            $form_state['values']['hero_image_upload'] = $file_hero;
            $filename = file_unmanaged_copy($file_hero->uri);
            $form_state['values']['uw_boundless_hero_image_path'] = $filename;
        }
        else {
            // File upload failed.
            form_set_error('hero_image_upload', t('The image could not be uploaded.'));
        }
    }
    // If the user provided a path for a header file, make sure a file
    // exists at that path when default is not checked.
    if (!$form_state['values']['uw_boundless_hero_image_default']) {
        if ($form_state['values']['uw_boundless_hero_image_path']) {
            $path = _system_theme_settings_validate_path($form_state['values']['uw_boundless_hero_image_path']);
            if (!$path) {
                form_set_error('hero_image_path', t('The custom image path "uw_boundless_hero_image_path" is invalid.'));
            }
        }
    }
}

/**
 * Process form submission 
 * 
 * @param type $form
 * @param type $form_state
 */
function uw_boundless_theme_settings_submit($form, &$form_state) {
    $values = &$form_state['values'];
    // If the user uploaded a new hero-image for the front page, save it to a permanent location
    // and use it in place of the default theme-provided file.
    if ($file_hero_front = $values['hero_image_front_upload']) {
        unset($values['hero_image_front_upload']);
        $filename = $file_hero_front->uri;
        $values['hero_image_front_default'] = 0;
        $values['hero_image_front_upload'] = $filename;
        $values['toggle_header'] = 1;
    }
    // If the user entered a path relative to the system files directory for
    // a header image, store a public:// URI so the theme system can handle it.
    if (!empty($values['uw_boundless_hero_image_front_path'])) {
        $values['uw_boundless_hero_image_front_path'] = _system_theme_settings_validate_path($values['uw_boundless_hero_image_front_path']);
    }
        
    // If the user uploaded a new header, save it to a permanent location
    // and use it in place of the default theme-provided file.
    if ($file_hero = $values['hero_image_upload']) {
        unset($values['hero_image_upload']);
        $filename = $file_hero->uri;
        $values['hero_image_default'] = 0;
        $values['hero_image_upload'] = $filename;
        $values['toggle_header'] = 1;
    }
    // If the user entered a path relative to the system files directory for
    // a header image, store a public:// URI so the theme system can handle it.
    if (!empty($values['uw_boundless_hero_image_path'])) {
        $values['uw_boundless_hero_image_path'] = _system_theme_settings_validate_path($values['uw_boundless_hero_image_path']);
    }
}

/**
 * Theme settings throws Fatal error: Call to undefined function uw_boundless_theme_settings_validate()
 * when submit handler is added to theme settings and theme settings manages files. 
 * The following three lines fix this. More details at:
 *   https://www.drupal.org/node/2613366
 *   http://ghosty.co.uk/2014/03/managed-file-upload-in-drupal-theme-settings/
 *   http://drupal.stackexchange.com/questions/52769/is-there-a-way-to-add-managed-file-field-to-theme-settings-php
 */
	$themes = list_themes();
	$form_state['build_info']['files'][] = str_replace("/uw_boundless.info", '', $themes['uw_boundless']->filename) . '/theme-settings.php';
