<?php

require get_theme_file_path('/inc/search-route.php');
require get_theme_file_path('/inc/pageBanner.php');

function university_custom_rest() {
  register_rest_field('post', 'authorName', array(
    'get_callback' => function() {return get_the_author();}
  ));
}

add_action('rest_api_init', 'university_custom_rest');

function university_files() {
  wp_enqueue_script( 'google-map', '//maps.googleapis.com/maps/api/js?key=AIzaSyB8FsunUxSCt0v2v5pAvS0PEzJT13xxhBQ', null, '1.0', true);
  wp_enqueue_script( 'main-university-js', get_theme_file_uri( '/js/scripts-bundled.js'), null, microtime(), true);
  wp_enqueue_style( 'custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
  wp_enqueue_style( 'font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
  wp_enqueue_style( 'university_main_styles', get_stylesheet_uri(), null, microtime());

  wp_localize_script('main-university-js', 'universityData', array(
    'root_url' => get_site_url()
  ));
  ob_clean();
}

add_action('wp_enqueue_scripts', 'university_files');

function university_features() {
	register_nav_menu('headerMenuLocation', 'Header Menu Location');
	register_nav_menu('footerMenuOne', 'Footer Menu One');
	register_nav_menu('footerMenuTwo', 'Footer Menu Two');
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_image_size( 'professorLandscape', 400, 260, true );
  add_image_size( 'professorPortrait', 480, 650, true );
  add_image_size( 'pageBanner', 1500, 350, true );
}

add_action('after_setup_theme', 'university_features');

function university_adjust_queries($query)
{
  if(!is_admin() and $query->is_main_query()) {
    // Events
    if ( is_post_type_archive('event') ) {
      $today = date('Ymd');
      $query->set('meta_key', 'event_date');
      $query->set('orderby', 'meta_value_num');
      $query->set('order', 'ASC');
      $query->set('meta_query', array(
        array(
          'key' => 'event_date',
          'compare' => '<=',
          'value' => $today,
          'type' => 'numeric',
        )
      ));
    }
    // Programs
    else if( is_post_type_archive('program') ) {
      $query->set('orderby', 'title');
      $query->set('order', 'ASC');
      $query->set('posts_per_page', -1);
    }
    // Campuses
    else if( is_post_type_archive('campus') ) {
      $query->set('posts_per_page', -1);
    }
  }
  
}

add_action('pre_get_posts', 'university_adjust_queries');

function universityMapKey($api) {
  $api['key'] = 'AIzaSyB8FsunUxSCt0v2v5pAvS0PEzJT13xxhBQ';
  return $api;
}

add_filter( 'acf/fields/google_map/api', 'universityMapKey' );