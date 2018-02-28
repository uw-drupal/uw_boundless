<?php
/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * The doctype, html, head and body tags are not in this template. Instead they
 * can be found in the html.tpl.php template in this directory.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * UW Boundless:
 * - $uw_hero_image_front_path (string): style setting, path to hero-image for the frontpage.
 * - $uw_hero_image_path (string): style setting, path to hero-image on all other pages.
 * - $uw_front_title_color (string): style setting, value for the color of the title.
 * - $uw_front_title_text_shadow (string): style setting, value for the text-shadow of the title.
 * - $uw_front_slant_color (string): style setting, value for the background-color of the "slant" span.
 * - $uw_front_slogan_color (string): style setting, value for the color of the slogan.
 * - $uw_front_slogan_text_shadow (string): style setting, value for the text-shadow of the slogan.
 * - $uw_sidebar_menu (HTML content): content containing the sidebar menu.
 * - $uw_copyright_year (HTML content, in uw-footer.inc).
 * 
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['search']: UW Boundless specific region for a search form.
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['header']: Items for the header region.
 * - $page['footer']: Items for the footer region.
 *
 * @see bootstrap_preprocess_page()
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see bootstrap_process_page()
 * @see template_process()
 * @see html.tpl.php
 *
 * @ingroup themeable
 */
?>
<div id="uwsearcharea" aria-hidden="true" class="uw-search-bar-container" tabindex="-1" role="search">
    <div class="container no-height">
        <div class="center-block uw-search-wrapper">
            <?php print render($page['search']); ?>
         </div>
    </div>
</div><!-- /#uwsearcharea -->

<div id="uw-container">
    
    <?php include_once $directory . "/templates/includes/quicklinks.inc"; ?>
    <!-- /#quicklinks -->
    
    <div id="uw-container-inner">
        
        <?php include_once $directory . "/templates/includes/thinstrip.inc"; ?>
        <!-- /#uw-thinstrip -->

        <nav id="dawgdrops" aria-label="Main menu" tabindex="0">
            <div class="dawgdrops-inner container">
                <?php print render($page['navigation']); ?>
            </div>
        </nav><!-- /#dawgdrops -->
        
        <?php if ($is_front): ?>
            <div class="uw-hero-image" style="background-image:url('<?php print $uw_hero_image_front_path; ?>');">
                <?php if (!empty($site_name)): ?>
                    <div class="container">
                        <h1 style="color:<?php print $uw_front_title_color; ?>;text-shadow:<?php print $uw_front_title_text_shadow; ?>;"><?php print $site_name; ?></h1>
                        <div class="udub-slant"><span style="background-color:<?php print $uw_front_slant_color; ?>;"></span></div>
                        <?php if (!empty($site_slogan)): ?>
                            <p style="color:<?php print $uw_front_slogan_color; ?>;text-shadow:<?php print $uw_front_slogan_text_shadow; ?>;"><?php print $site_slogan; ?></p>
                        <?php endif; ?>   
                    </div>
                <?php endif; ?>   
            </div>
        <?php else: ?>   
            <div class="uw-hero-image" style="background-image:url('<?php print $uw_hero_image_path; ?>');"></div>
        <?php endif; ?>   
        <!-- /#uw-hero-image -->
         
        <a id="main-content"></a>
        <div class="container uw-body">
                        
            <div class="row">
                
                <section<?php print $content_column_class; ?>>
                    
                <?php if (!empty($site_name)): ?>
                    <a href="<?php print $front_page; ?>" title="<?php print $site_name; ?>"><div class="uw-site-title"><?php print $site_name; ?></div>
                        <p><?php if (!empty($site_slogan)): print $site_slogan; endif; ?></p>
                    </a>
                <?php endif; ?>
                    
                <?php if (!empty($breadcrumb)): ?>
                    <nav class="uw-breadcrumbs" aria-label="breadcrumbs">
                    <?php print $breadcrumb; ?>
                    </nav>
                <?php endif;?>
                                   
                <?php print render($title_prefix); ?>
                <?php if (!empty($title)): ?>
                  <h1 class="page-header"><?php print $title; ?></h1>
                <?php endif; ?>
                
                <?php if ((!empty($page['navigation']['system_main-menu']))): ?>  
                  <nav id="mobile-relative" aria-label="relative">
                      <button class="uw-mobile-menu-toggle">Menu</button>
                      <ul class="uw-mobile-menu first-level">
                          <?php if (($is_front || (!$is_front && !$uw_sidebar_menu)) && !empty($primary_nav)): ?>
                            <li class="pagenav">
                                <?php print l("Home", $GLOBALS['base_url'], array('attributes' => array('title' => 'Home', 'class' => array('homelink')))); ?>
                                <?php print render($primary_nav); ?>
                            </li><!-- /#primary_nav --> 
                          <?php endif; ?>     
                          <?php if (!$is_front && $uw_sidebar_menu): ?>
                            <li class="pagenav">
                                <?php print l("Home", $GLOBALS['base_url'], array('attributes' => array('title' => 'Home', 'class' => array('homelink')))); ?>
                                <?php print render($uw_sidebar_menu); ?>
                            </li><!-- /#uw_sidebar_menu --> 
                          <?php endif; ?>
                      </ul>
                  </nav><!-- /#uw-mobile-menu -->
                <?php endif; ?>
                   
                <?php print render($title_suffix); ?>
                <?php print $messages; ?>
                <?php if (!empty($tabs)): ?>
                  <?php print render($tabs); ?>
                <?php endif; ?>
                <?php if (!empty($page['highlighted'])): ?>
                  <div class="highlighted jumbotron"><?php print render($page['highlighted']); ?></div>
                <?php endif; ?>
                <?php if (!empty($page['help'])): ?>
                  <?php print render($page['help']); ?>
                <?php endif; ?>
                <?php if (!empty($action_links)): ?>
                  <ul class="action-links"><?php print render($action_links); ?></ul>
                <?php endif; ?>
                <div class="uw-content" role='main'>
                    <div id='main_content' class="uw-body-copy">
                    <?php print render($page['content']); ?>
                    </div>
                </div>
                </section>
                
                <aside class="col-md-4 uw-sidebar" role="complementary">
                <?php if ((!empty($page['navigation']['system_main-menu'])) &&  $uw_sidebar_menu): ?>
                    <nav id="desktop-relative" aria-label="relative">
                        <ul class="uw-sidebar-menu first-level">
                            <li class="pagenav">
                                <?php print l("Home", $GLOBALS['base_url'], array('attributes' => array('title' => 'Home', 'class' => array('homelink')))); ?>
                                <?php print render($uw_sidebar_menu); ?>
                            </li>
                        </ul>
                    </nav><!-- /#uw-sidebar-menu -->
                <?php endif; ?>
                <?php if ((!empty($page['sidebar_first']) || (!empty($page['sidebar_second'])))): ?>
                    <?php print render($page['sidebar_first']); ?>
                    <?php print render($page['sidebar_second']); ?>
                <?php endif; ?>
                </aside>  <!-- /#uw-sidebar -->
                
            </div><!-- /#row -->

        </div><!-- /#uw-body -->
                
        <footer class="footer container">
          <?php print render($page['footer']); ?>
        </footer><!-- /#page footer -->
                
        <?php include_once $directory . "/templates/includes/uw-footer.inc"; ?>
        <!-- /#uw-footer -->

    </div><!-- /#uw-container-inner -->

</div><!-- /#uw-container -->
