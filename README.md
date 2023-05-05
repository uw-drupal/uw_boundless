<!-- @file Instructions for installation of the UW Boundless . -->
<!-- @defgroup sub_theming_less -->
<!-- @ingroup sub_theming -->

# Overview

The Drupal 9 UW Boundless theme is port of the Drupal 7 version.  It is a 
subtheme of Bootstrap.

Unlike the Drupal 7 version, custom blocks must be created manually. Below is 
suggested default code for the Thinstrip, Footer and Quicklinks blocks.

## Thinstrip

Add a new custom block (/admin/structure/block/block-content).  Put #Thinstrip"
in the block description and paste the following content in the body, customizing
the graphics and the uw-thin-links menu as needed.

```
<header class="uw-thinstrip">

  <div class="container">
    <a href="https://uw.edu" title="University of Washington Home" class="uw-patch" tabindex='-1' aria-hidden='true'>University of Washington</a>
    <a href="https://uw.edu" title="University of Washington Home" class="uw-wordmark">University of Washington</a>
  </div>
  <div class='align-right'>
      <nav class="uw-thin-strip-nav" aria-label='role navigation'>
          <ul class="uw-thin-links">
            <li><a href="/" title="Item 1">Item </a></li>
            <li><a href="/f" title="Item 2">Item 2</a></li>
            <li><a href="/" title="Item 3">Item 3</a></li>
          </ul>
      </nav>
      <nav id='search-quicklinks' aria-label='search and quick links'>
      <button class='uw-search' aria-owns='uwsearcharea' aria-controls='uwsearcharea' aria-expanded='false' aria-label='open search area' aria-haspopup='true'>

          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               width="19px" height="51px" viewBox="0 0 18.776 51.062" enable-background="new 0 0 18.776 51.062" xml:space="preserve">
          <g>
              <path fill="#FFFFFF" d="M3.537,7.591C3.537,3.405,6.94,0,11.128,0c4.188,0,7.595,3.406,7.595,7.591
                c0,4.187-3.406,7.593-7.595,7.593C6.94,15.185,3.537,11.778,3.537,7.591z M5.245,7.591c0,3.246,2.643,5.885,5.884,5.885
                c3.244,0,5.89-2.64,5.89-5.885c0-3.245-2.646-5.882-5.89-5.882C7.883,1.71,5.245,4.348,5.245,7.591z"/>

              <rect x="2.418" y="11.445" transform="matrix(0.7066 0.7076 -0.7076 0.7066 11.7842 2.0922)" fill="#FFFFFF" width="1.902" height="7.622"/>
          </g>
          <path fill="#FFFFFF" d="M3.501,47.864c0.19,0.194,0.443,0.29,0.694,0.29c0.251,0,0.502-0.096,0.695-0.29l5.691-5.691l5.692,5.691
              c0.192,0.194,0.443,0.29,0.695,0.29c0.25,0,0.503-0.096,0.694-0.29c0.385-0.382,0.385-1.003,0-1.388l-5.692-5.691l5.692-5.692
              c0.385-0.385,0.385-1.005,0-1.388c-0.383-0.385-1.004-0.385-1.389,0l-5.692,5.691L4.89,33.705c-0.385-0.385-1.006-0.385-1.389,0
              c-0.385,0.383-0.385,1.003,0,1.388l5.692,5.692l-5.692,5.691C3.116,46.861,3.116,47.482,3.501,47.864z"/>
          </svg>

      </button>
      <button class='uw-quicklinks' aria-haspopup='true' aria-expanded="false" aria-label="Open quick links">Quick Links<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15.63px" height="69.13px" viewBox="0 0 15.63 69.13" enable-background="new 0 0 15.63 69.13" xml:space="preserve"><polygon fill="#FFFFFF" points="12.8,7.776 12.803,7.773 5.424,0 3.766,1.573 9.65,7.776 3.766,13.98 5.424,15.553 12.803,7.78"/><polygon fill="#FFFFFF" points="9.037,61.351 9.036,61.351 14.918,55.15 13.26,53.577 7.459,59.689 1.658,53.577 0,55.15 5.882,61.351 5.882,61.351 5.884,61.353 0,67.557 1.658,69.13 7.459,63.019 13.26,69.13 14.918,67.557 9.034,61.353"/></svg></button>
      </nav>
  </div>

</header>
```

Go to the block layout page (/admin/structure/block) and click "Place block" in the Thinstrip region.

Note that in order for the styling to work as intended, your content should be wrapped in a &lt;header class="uw-thinstrip"&gt;&lt;/header&gt;
element and should contain the uw-search and uw-quicklinks buttons verbatim if you intend to use the search and quickinks
flyout.

## Search

[To do.]

## UW Footer

Create a custom block to go in your footer and place it in the .  The following content will get you started:

```
    <a href="https://uw.edu" class="footer-wordmark">University of Washington</a>

    <h3 class="be-boundless"><a href="https://uw.edu/boundless/">Be boundless</a></h3>

    <h4>Connect with us:</h4>

    <nav role="navigation" aria-label="social networking">
        <ul class="footer-social">
            <li><a class="facebook" href="https://www.facebook.com/UofWA">Facebook</a></li>
            <li><a class="twitter" href="https://twitter.com/UW">Twitter</a></li>
            <li><a class="instagram" href="https://instagram.com/uofwa">Instagram</a></li>
            <li><a class="youtube" href="https://www.youtube.com/user/uwhuskies">YouTube</a></li>
            <li><a class="linkedin" href="https://www.linkedin.com/company/university-of-washington">LinkedIn</a></li>
            <li><a class="pinterest" href="https://www.pinterest.com/uofwa/">Pinterest</a></li>
        </ul>
    </nav>

    <nav role="navigation" aria-label="footer links">
        <ul class="footer-links">
            <li><a href="https://uw.edu/accessibility">Accessibility</a></li>
            <li><a href="https://uw.edu/home/siteinfo/form">Contact s</a></li>
            <li><a href="https://uw.edu/jobs">Jobs</a></li>
            <li><a href="https://uw.edu/safety">Campus safety</a></li>
            <li><a href="https://my.uw.edu/">My UW</a></li>
            <li><a href="https://uw.edu/admin/rules/wac/rulesindex.html">Rules docket</a></li>
            <li><a href="https://uw.edu/online/privacy">Privacy</a></li>
            <li><a href="https://uw.edu/online/terms">Terms</a></li>
            <li><a href="https://uw.edu/newsletter/">Newsletter</a></li>
        </ul>
    </nav>

```

## Quicklinks

Create a quicklinks custom block and place it in the Quicklinks region.  This is the default
content:

```
<nav id="quicklinks" aria-label="quick links" aria-hidden="true">
  <ul id="big-links">
    <li><span class="icon-myuw"></span><a href="https://my.uw.edu/" tabindex="-1">MyUW</a></li>
    <li><span class="icon-calendar"></span><a href="https://uw.edu/calendar/" tabindex="-1">Calendar</a></li>
    <li><span class="icon-directories"></span><a href="https://directory.uw.edu/" tabindex="-1">Directories</a></li>
    <li><span class="icon-libraries"></span><a href="https://lib.uw.edu/" tabindex="-1">Libraries</a></li>
    <li><span class="icon-medicine"></span><a href="https://www.uwmedicine.org/" tabindex="-1">UW Medicine</a></li>
    <li><span class="icon-maps"></span><a href="https://uw.edu/maps/" tabindex="-1">Maps</a></li>
    <li><span class="icon-uwtoday"></span><a href="https://uw.edu/news/" tabindex="-1">UW News</a></li>
  </ul>
<h3>Helpful Links</h3>
  <ul id="little-links">
    <li><span class="false"></span><a href="https://itconnect.uw.edu/" tabindex="-1">Computing/IT</a></li>
    <li><span class="false"></span><a href="https://isc.uw.edu/" tabindex="-1">ISC/Workday</a></li>
    <li><span class="false"></span><a href="https://hfs.uw.edu/Husky-Card-Services/" tabindex="-1">Husky Card</a></li>
    <li><span class="false"></span><a href="https://www.uwb.edu/" tabindex="-1">UW Bothell</a></li>
    <li><span class="false"></span><a href="https://www.tacoma.uw.edu/" tabindex="-1">UW Tacoma</a></li>
    <li><span class="false"></span><a href="https://www.facebook.com/UofWA" tabindex="-1">UW Facebook</a></li>
    <li><span class="false"></span><a href="https://twitter.com/UW" tabindex="-1">UW Twitter</a></li>
  </ul>
 </nav>
 ```

## Making a subtheme

Below are instructions on how to create a UW Boundless sub-theme using a Less
preprocessor.

- [Prerequisites](#prerequisites)
- [Additional Setup](#setup)
- [Overrides](#overrides)

## Prerequisites
- Read the @link getting_started Getting Started @endlink and
  @link sub_theming Sub-theming @endlink documentation topics.
- You must understand the basic concept of using the [Less] CSS pre-processor.
- You must use a **[local Less compiler](https://www.google.com/search?q=less+compiler)**.
- You must use the [Bootstrap Framework Source Files] ending in the `.less`
  extension, not files ending in `.css`.

## Additional Setup {#setup}
Download and extract the **latest** 3.x.x version of
[Bootstrap Framework Source Files] into the root of your new sub-theme. After
it has been extracted, the directory should be renamed (if needed) so it reads
`./uw_boundless/bootstrap`.

If for whatever reason you have an additional `bootstrap` directory wrapping the
first `bootstrap` directory (e.g. `./uw_boundless/bootstrap/bootstrap`), remove the
wrapping `bootstrap` directory. You will only ever need to touch these files if
or when you upgrade your version of the [Bootstrap Framework].

{.alert.alert-warning} **WARNING:** Do not modify the files inside of
`./uw_boundless/bootstrap` directly. Doing so may cause issues when upgrading the
[Bootstrap Framework] in the future.

## Overrides {#overrides}
The `./uw_boundless/less/variable-overrides.less` file is generally where you will
the majority of your time overriding the variables provided by the [Bootstrap
Framework].

The `./uw_boundless/less/bootstrap.less` file is nearly an exact copy from the
[Bootstrap Framework Source Files]. The only difference is that it injects the
`variable-overrides.less` file directly after it has imported the [Bootstrap
Framework]'s `variables.less` file. This allows you to easily override variables
without having to constantly keep up with newer or missing variables during an
upgrade.

The `./uw_boundless/less/overrides.less` file contains various Drupal overrides to
properly integrate with the [Bootstrap Framework]. It may contain a few
enhancements, feel free to edit this file as you see fit.

The `./uw_boundless/less/style.less` file is the glue that combines the
[Bootstrap Framework Source Files] and `overrides.less` files together.
Generally, you will not need to modify this file unless you need to add or
remove files to be imported. This is the file that you should compile to
`./uw_boundless/css/styles.css` (note the same file name, using a different
extension of course).

After making changes to the less files, you will need to recompile them in
order to update the site's css.  There is a shell script
uw_boundless/less/compile.sh that will invoke the less compiler (lessc) in
the proper way to rebuild the css and place it in the correct place.

#### See also:
- @link theme_settings Theme Settings @endlink
- @link templates Templates @endlink
- @link plugins Plugin System @endlink

[Bootstrap Framework]: https://getbootstrap.com/docs/3.4/
[Bootstrap Framework Source Files]: https://github.com/twbs/bootstrap/releases
[Less]: http://lesscss.org

## Drupal 8 Implementation Notes

### template.php -> uw_boundless.theme

The uw_boundless_preprocess_block() function has been removed.  Since blocks
can appear in multiple regions in D8 there is no information available as to
the intended region when a block is preprocessed.  This functionality has been
moved to CSS-- see uw.body-content.less and uw.sidebar.less.

The functions uw_boundless_menu_tree__main_menu() and uw_boundless_menu_link__main_menu()
are not ported because D8 does not implement those hooks.  Rather, that functionality
is folded into the template file menu--main.html.twig.

The same applies to uw_boundless_breadcrumb() and breadcrumb.html.twig.

