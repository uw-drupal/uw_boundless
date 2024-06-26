<?php

/**
 * @file
 * template.php
 */

/**
 * Uw colors
 */
abstract class UW_Color {
    const Purple = '#4b2e83';
    const Gold = '#b7a57a';
    const Metallic_Gold = '#85754d';
    const Light_Grey = '#d9d9d9';
    const Dark_Grey = '#444444';
    const Black = '#000000';
    const White = '#ffffff';
}
    
/**
 * Preprocess variables for html.tpl.php
 *
 * Implements template_preprocess_html(&$variables)
 * 
 * @see system_elements()
 * @see html.tpl.php
 */
function uw_boundless_preprocess_html(&$variables) {
    // Adding jQuery UI effects library
    drupal_add_library('system', 'effects');
    // for other libraries see https://api.drupal.org/api/drupal/modules!system!system.module/function/system_library/7
    
//    // Adding underscore.js  
//    $options = array();
//    $options['type'] = 'external';
//    $options['scope'] = 'header';
//    $options['group'] = JS_LIBRARY;
//    $options['weight'] = -20;
//    drupal_add_js('//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js', $options);
//    
//    // Adding backbone.js  
//    $options = array();
//    $options['type'] = 'external';
//    $options['scope'] = 'header';
//    $options['group'] = JS_LIBRARY;
//    $options['weight'] = -19;
//    drupal_add_js('//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min.js', $options);
    
    // Adding the UW Alert Banner script  
    $options = array();
    $options['type'] = 'external';
    $options['scope'] = 'header';
    $options['group'] = JS_THEME;
    drupal_add_js('//www.washington.edu/static/alert.js', $options);
}

/**
 * Add in some variables for use in page.tpl.php
 *
 * Implements template_preprocess_page(&$variables)
 * 
 * @param type &$variables
 */
function uw_boundless_preprocess_page(&$variables) {
    //hero-image front page
    $variables['uw_hero_image_front_path'] = 
            (theme_get_setting('uw_boundless_hero_image_front_default')) 
            ? file_create_url(theme_get_setting('uw_boundless_hero_image_front_default_path')) 
            : file_create_url(theme_get_setting('uw_boundless_hero_image_front_path'));
    
    // hero-image other pages
    $variables['uw_hero_image_path'] = 
            (theme_get_setting('uw_boundless_hero_image_default'))
            ? file_create_url(theme_get_setting('uw_boundless_hero_image_default_path'))
            : file_create_url(theme_get_setting('uw_boundless_hero_image_path'));
    
    // front page title color
    $variables['uw_front_title_color'] = theme_get_setting('uw_boundless_front_page_title_color');
    $variables['uw_front_title_text_shadow'] = _uw_boundless_get_text_shadow($variables['uw_front_title_color']);
    // front page slant color
    $variables['uw_front_slant_color'] = theme_get_setting('uw_boundless_front_page_slant_color');
    // front page slogan color
    $variables['uw_front_slogan_color'] = theme_get_setting('uw_boundless_front_page_slogan_color');
    $variables['uw_front_slogan_text_shadow'] = _uw_boundless_get_text_shadow($variables['uw_front_slogan_color']);
    
    //new variable for the sidebar menu
    $variables['uw_sidebar_menu'] = _uw_boundless_uw_sidebar_menu();

    // variable for mobile (main) menu
    $variables['uw_mobile_menu'] = _uw_boundless_mobile_menu();
    
    // new variable to display copyright
    $variables['uw_copyright_year'] = _uw_boundless_copyrightyear();

    // variables for login link
    $variables['uw_login_link_location'] = theme_get_setting('uw_boundless_login_link_location');
    if ($variables['uw_login_link_location'] == 'footer_date') {
        $login_link_text = _uw_boundless_copyrightyear();
    }
    else {
        $login_link_text = theme_get_setting('uw_boundless_login_link_text');
    }
    if (module_exists('shib_auth')) {
        $login_url = shib_auth_generate_login_url();
    }
    else {
        $login_url = 'user/login';
    }
    $variables['uw_login_link'] = l(t($login_link_text), $login_url, array('query' => drupal_get_destination()));
    
    // reset content column class from bootstrap's default col-sm-9 to col-md-8.
    // the column class for uw-sidebar is hard-coded in page.tpl.php 
    if ($variables['uw_sidebar_menu'] || !empty($variables['page']['sidebar_first']) || !empty($variables['page']['sidebar_second'])) {
        $variables['content_column_class'] = ' class="col-md-8"';
    }
    else {
        $variables['content_column_class'] = ' class="col-sm-12"';
    }
}

/**
 * Implements template_preprocess_block(&$variables)
 * 
 * Override or insert variables into the block template
 * 
 * @notes   adds WP classess widget and widgettitle to blocks in the sidebar
 * 
 * @todo    
 */
function uw_boundless_preprocess_block(&$variables) {

    $block = $variables['block'];
   
    if (($block->region == 'sidebar_first') || ($block->region == 'sidebar_second'))  {
        $variables['classes_array'][] = 'widget';
        $variables['title_attributes_array']['class'][] = 'widgettitle';
    }

}

/**
 * Bootstrap theme wrapper function for the main-menu in navigation region
 */
function uw_boundless_menu_tree__main_menu(&$variables) {
    return '<ul class="dawgdrops-nav">' . $variables['tree'] . '</ul>';
}

/**
 * Implements theme_menu_link(array $variables)
 * Overrides bootstrap_menu_link(array $variables) for the main-menu
 * 
 * Returns HTML for the main menu links
 *
 * @param array $vars
 * @return string HTML output
 */
function uw_boundless_menu_link__main_menu(array $variables) {
    $element = $variables['element'];
    $sub_menu = '';

    // Generate as dawgdrops-item.
    $element['#attributes']['class'][] = 'dawgdrops-item';
    
    if ($element['#below']) {
    
        if ((!empty($element['#original_link']['depth'])) && ($element['#original_link']['depth'] == 1)) {
            
            // Set dropdown trigger element to # to prevent inadvertant page loading
            // when a submenu link is clicked.
            //$element['#localized_options']['attributes']['data-target'] = '#';
            $element['#localized_options']['attributes']['class'][] = 'dropdown-toggle';
            $element['#localized_options']['attributes']['aria-haspopup'][] = 'true';
            //$element['#localized_options']['attributes']['data-toggle'] = 'dropdown';

            // Add our own wrapper.
            unset($element['#below']['#theme_wrappers']);
            $sub_menu = '<ul class="dawgdrops-menu" aria-hidden="true" aria-label="submenu">' . drupal_render($element['#below']) . '</ul>';
        }
    } 
    
    $output = l($element['#title'], $element['#href'], $element['#localized_options']);
    return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

/**
 * Implements theme_breadcrumb($variables)
 * Overrides bootstrap_breadcrumb($variables).
 *
 * @notes   creates link for last crumb,
 *          add 'current' class to last item,
 *          sets breadcrumbs as an unordered list, 
 *          remove 'breadcrumb' class from the list attributes
 * 
 * @todo fix when "Show 'Home' breadcrumb link" is unchecked in settings
 */
function uw_boundless_breadcrumb($variables) {
    $output = '';
    $breadcrumb = $variables['breadcrumb'];
    
    // Determine if we are to display the breadcrumb.
    $bootstrap_breadcrumb = theme_get_setting('bootstrap_breadcrumb');
    if (($bootstrap_breadcrumb == 1 || ($bootstrap_breadcrumb == 2 && arg(0) == 'admin')) && !empty($breadcrumb)) {

        // only change if the "Show current page title at end" in the theme is checked
        if (theme_get_setting('bootstrap_breadcrumb_title')) {
            // create link for last crumb
            $active_key = (count($breadcrumb) - 1);
            $active_link = array(
                '#theme' => 'link',
                '#text' => $breadcrumb[$active_key]['data'],
                '#path' => current_path(),
                '#options' => array(
                    'attributes' => array('title' => $breadcrumb[$active_key]['data']),
                    'html' => FALSE,
                ),
            );

            // set link as data for the active crumb and add the 'current' class.
            // data is currently set as html content, not as a link
            $breadcrumb[$active_key] = array(
                //'data' => theme('link', $active_link),
                'data' => '<span>'.$breadcrumb[$active_key]['data'].'</span>',
                'class' => array('current active'),
            );
        }
       
        // remove bootstrap's breadcrumb class from the attributes,
        // add breadcrumb to output
        $output = theme('item_list', array(
            'attributes' => array(
              //'class' => array('breadcrumb'),
            ),
            'items' => $breadcrumb,
            'type' => 'ul',
        ));
    }
     return $output;
}

/**
 * New wrapper for search form.
 * Implements hook_form_BASE_FORM_ID_alter(&$form, &$form_state, $form_id).
 * 
 * @param type $form
 * @param type $form_state
 * @param type $form_id
 * 
 * @notes   sets the overridden theme wrapper bootstrap_search_form_wrapper
 * 
 * @todo Extend with options to select the site to be searched
 */
function uw_boundless_form_search_block_form_alter(&$form, &$form_state, $form_id) {
      $form[$form_id]['#theme_wrappers'] = array('bootstrap_search_form_wrapper');
}

/**
 * Overrides bootstrap_bootstrap_search_form_wrapper($variables)
 * 
 * Theme function implementation for bootstrap_search_form_wrapper.
 * 
 * @notes   added class 'search' to button element
 */
function uw_boundless_bootstrap_search_form_wrapper($variables) {
    $output = '<div class="input-group">';
    $output .= $variables['element']['#children'];
    $output .= '<span class="input-group-btn">';
    $output .= '<button type="submit" class="btn btn-default search">';
    // We can be sure that the font icons exist in CDN.
    if (theme_get_setting('bootstrap_cdn')) {
      $output .= _bootstrap_icon('search');
    }
    else {
      $output .= t('Search');
    }
    $output .= '</button>';
    $output .= '</span>';
    $output .= '</div>';
    return $output;
}


/**
 * Local function.
 * 
 * Returns a string containing the year or year-range.
 * 
 * @return string 
 * 
 * @see uw_boundless_preprocess_page(&$variables)
 */
function _uw_boundless_copyrightyear() {
    $start = "2015";
    $range = ((date('Y') == $start) ? $range = $start : $range = $start."-".date('Y'));
    return t($range);
}

/**
 * Builds a sidebar menu based on the current path.
 *
 * The sidebar menu is a subset of main menu that is relative to the local
 * path. The current path must be in the main menu.
 * 
 * @return string|false
 *   Returns the HTML for the sidebar menu or FALSE if the sidebar menu is
 *   hidden or the current path is not in the main menu.
 *
 * @todo Refactor
 */
function _uw_boundless_uw_sidebar_menu() {
  global $theme;

  // Check the theme setting for visibility.
  if (!theme_get_setting('uw_boundless_sidebar_menu_visibility')) {
    return FALSE;
  }
  
  $current_path = current_path();
  // Don't render the sidebar menu for admin paths.
  if (path_is_admin($current_path)) {
    return FALSE;
  }
  $active_trail = menu_get_active_trail();
  $current_depth = count($active_trail);
  $active_trail_key =  $current_depth - 1;
  
  // Don't build the sidebar menu if there's no active trail.
  if ($active_trail_key < 1 ) {
    return FALSE;
  }
  // Don't build the sidebar if menu_name is not a key in the active trail.
  if (!array_key_exists('menu_name',$active_trail[1])) {
    return FALSE;
  }
  
  // Get the current menu link.
  $current_link = menu_link_get_preferred($current_path, 'main-menu');
  
  // Don't build the sidebar if menu_name is not main-menu.
  if ($active_trail[1]['menu_name'] !== 'main-menu') {
    // Create an alert and log entry if the active trail doesn't contain
    // 'main-menu', but the preferred link does.
    if (!empty($current_link)) {
      // User-facing alert.
      if (user_access('administer menu')) {
        $alert_message = t('The sidebar menu may not have rendered correctly because the active trail is not in the main menu. See the log entry for more details.');
        drupal_set_message($alert_message, 'warning');
      }
      
      // Watchdog log entry.
      $menu_name = $active_trail[1]['menu_name'];
      $log_message = 'The sidebar menu may not have rendered correctly because the active trail is not in the main menu. It looks like it\'s using menu "@menu_name" by default.<br>
     If this menu item is created by a custom module it may have been added to the Navigation menu as well. Try setting the \'menu_name\' key to \'main-menu\' in the module\'s hook_menu() and delete the item from the navigation menu.';
      $log_vars = array(
        '@menu_name' => $menu_name,
      );
      watchdog('uw_boundless', $log_message, $log_vars, WATCHDOG_WARNING);
    }

    return FALSE;
  }
  
  $output = TRUE;
  $output_menu = '<ul>';

  // Only display sidebar menu when there's a parent and it's not hidden.
  if (isset($current_link['plid']) && !$current_link['hidden']) {
      // First level links.
    if ($current_depth == 2 && $current_link['has_children']) {
      // Show sub tree of current item.
      $output_menu .= '<li class="page_item page_item_has_children current_page_item">';
      $output_menu .= l($current_link['link_title'], $current_link['link_path']);

      // Parameters to build the tree.
      $parameters = array(
        'active_trail' => array($current_link['plid']),
        'only_active_trail' => FALSE,
        'min_depth' => $current_link['depth']+1,
        'max_depth' => $current_link['depth']+1,
        'conditions' => array('plid' => $current_link['mlid']),
      );
      
      // Get the children.
      $children = menu_build_tree($current_link['menu_name'], $parameters);

      $output_menu .= '<ul class="children">';
      foreach ($children as $child) {
        if (!$child['link']['hidden']) {
          $output_menu .= '<li class="page_item">';
          $output_menu .= l($child['link']['link_title'], $child['link']['link_path']);
          $output_menu .= '</li>';
        }
      }
      $output_menu .= '</ul>';
      $output_menu .= '</li>';
    }
    // Second level links and deeper.
    // Show sub tree of parent and display current item as the 'active' item.
    elseif ($current_depth > 2) {
      // Get active parent by moving one up the trail.
      $active_parent = $active_trail[$active_trail_key - 1];
      // Create flag if parent points home.
      $active_parent_is_front = $active_parent['link_path'] === '<front>' || $active_parent['link_path'] === '<firstchild>' ? TRUE : FALSE;
      $active_parent_is_firstchild = $active_parent['link_path'] === '<firstchild>' ? TRUE : FALSE;
      // Get the parent menu link
      $parent_link = menu_link_get_preferred($active_parent['link_path'], 'main-menu');
      // However, if active parent points home, create a new array using
      // <front> as the path.
      if ($active_parent_is_front) {
         $parent_link = array(
           'link_title' => $active_parent['link_title'],
           'link_path' => '<front>',
           'plid' => $active_parent['plid'],
           'mlid' => $active_parent['mlid'],
           'menu_name' => $active_parent['menu_name'],
           'depth' => $active_parent['depth'],
         );
      }

      // Parameters to build the tree.
      $parameters = array(
        'active_trail' => array($parent_link['plid']),
        'only_active_trail' => FALSE,
        'min_depth' => $parent_link['depth']+1,
        'max_depth' => $parent_link['depth']+1,
        'conditions' => array('plid' => $parent_link['mlid']),
      );
      // Get the children.
      $children = menu_build_tree($parent_link['menu_name'], $parameters);
      if ($active_parent_is_firstchild) {
        $parent_link['link_path'] = reset($children)['link']['link_path'];
      }

      $output_menu .= '<li class="page_item page_item_has_children current_page_ancestor current_page_parent">';
      $output_menu .= l($parent_link['link_title'], $parent_link['link_path']);

      $output_menu .= '<ul class="children">';
      foreach ($children as $child) {
        if (!$child['link']['hidden']) {
          if ($current_path == $child['link']['link_path']) {
            $output_menu .= '<li class="page_item current_page_item">';
            $output_menu .= '<span>'.$child['link']['link_title'].'</span>';
            if ($child['link']['has_children']) {
              // get the grandchildren parameters to build the tree.
              $parameters = array(
                'active_trail' => array($child['link']['plid']),
                'only_active_trail' => FALSE,
                'min_depth' => $child['link']['depth']+1,
                'max_depth' => $child['link']['depth']+1,
                'conditions' => array('plid' => $child['link']['mlid']),
              );
              $grandchildren = menu_build_tree($child['link']['menu_name'], $parameters);

              $output_menu .= '<ul class="children">';
              foreach ($grandchildren as $grandchild) {
                if (!$grandchild['link']['hidden']) {
                  $output_menu .= '<li class="page_item">';
                  $output_menu .= l($grandchild['link']['link_title'], $grandchild['link']['link_path']);
                  $output_menu .= '</li>';
                }
              }
              $output_menu .= '</ul>';
            }
          }
          else {
            $output_menu .= '<li class="page_item">';
            $output_menu .= l($child['link']['link_title'], $child['link']['link_path']);
          }
          $output_menu .= '</li>';
        }
      }
      $output_menu .= '</ul>';
      $output_menu .= '</li>';

    }
    else {
      // Link has no children.
      $output = FALSE;
    }
  }
  else {
    $output = FALSE;
  }

  $output_menu .= '</ul>';

  return $output ? $output_menu : $output;
}

/**
 * Builds a mobile-styled menu from the main menu links.
 *
 * @return string HTML output
 */
function _uw_boundless_mobile_menu() {
    $menu = menu_build_tree('main-menu');
    $menu_tree = menu_tree_output($menu);

    $mobile_menu = '<ul id="menu-dropdowns-1" class="">';
    foreach ($menu_tree as &$element) {
        if (isset($element['#title'])) {
            $sub_menu = '';
            
            if ($element['#below']) {
                $element['#attributes']['class'][] = 'menu-item-has-children';
                if ((!empty($element['#original_link']['depth'])) && ($element['#original_link']['depth'] == 1)) {

                    $element['#localized_options']['attributes']['aria-expanded'][] = 'false';

                    // Add our own wrapper.
                    unset($element['#below']['#theme_wrappers']);
                    $sub_menu = '<ul class="sub-menu" aria-hidden="true">' . drupal_render($element['#below']) . '</ul>';
                }
            } 
            $output = l($element['#title'], $element['#href'], $element['#localized_options']);
            $mobile_menu .= '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
        }
    }
    return $mobile_menu . '</ul>';
}

/**
 * Local function
 * Gets the text-shadow settting for the provided color.
 * 
 * @param string $color string containing a hex value.
 * @return string   the theme setting value for uw_boundless_text_shadow_black or uw_boundless_text_shadow_white.
 */
function _uw_boundless_get_text_shadow($color) {
    switch ($color) {
    case UW_Color::White:
        $retval = theme_get_setting('uw_boundless_text_shadow_black');
        break;
    case UW_Color::Light_Grey:
        $retval = theme_get_setting('uw_boundless_text_shadow_black');
        break;
    case UW_Color::Gold:
        $retval = theme_get_setting('uw_boundless_text_shadow_black');
        break;
    case UW_Color::Purple:
        $retval = theme_get_setting('uw_boundless_text_shadow_white');
        break;
    case UW_Color::Metallic_Gold:
        $retval = theme_get_setting('uw_boundless_text_shadow_white');
        break;
    case UW_Color::Dark_Grey:
        $retval = theme_get_setting('uw_boundless_text_shadow_white');
        break;
    case UW_Color::Black:
        $retval = theme_get_setting('uw_boundless_text_shadow_white');
        break;
    default:
        $retval = theme_get_setting('uw_boundless_text_shadow_black');
        break;
    }
    return $retval;
}

/**
 * Development function.
 * 
 * Prints a block of preformatted text.
 * 
 * @param type $vars
 */
function _uw_boundless_dump($vars, $type = 'status') {
    global $theme;
    $output = $theme;
    $output .= '<pre class="uw_boundless_dump">'.var_export($vars, TRUE).'</pre>';
    //$output = '<pre class="uw_boundless_dump">'.print_r($vars, TRUE).'</pre>';
    drupal_set_message(t($output), $type);
}
