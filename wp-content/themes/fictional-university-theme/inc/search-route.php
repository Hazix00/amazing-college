<?php

add_action('rest_api_init', 'universityRegisterSearch');

function universityRegisterSearch(){
    register_rest_route('university/v1', 'search', array(
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'universitySearchResults'
    ));
}

function universitySearchResults($data){
    ob_clean();  // remove the BOM character from the json response
    // prepare the query
    $mainQuery = new WP_Query(array(
        'post_type' => 'any',
        's' => sanitize_text_field($data['term']), // securing url search term
        'posts_per_page' => -1
    ));
    $results = array(
        'generalInfos' => array(),
        'professors' => array(),
        'campuses' => array(),
        'events' => array(),
        'programs' => array()
    );
    // getting data for each post type
    while ($mainQuery->have_posts()) {
        $mainQuery->the_post();
        $type = get_post_type();
        // general fields
        $postData = array(
            'title' => get_the_title(),
            'permalink' => get_the_permalink(),
            'type' => $type
        );

        $genInfoTypes = array('post', 'page'); // General information Types post and page

        if(in_array($type, $genInfoTypes)) { // if post of type General information
            if($type == 'post') $postData['authorName'] = get_the_author(); // get author for post
            array_push($results['generalInfos'], $postData);
        }
        else { // the other post types

            if($type == 'campus') $type .= 'e';
            if($type == 'professor') $postData['image'] = get_the_post_thumbnail_url(0, 'professorLandscape'); // get image for professor
            if($type == 'event') { // get the day, month and description for event
                $date = new DateTime(get_field('event_date'));
                $postData['date'] = array('day' => $date->format('d'), 'month' => $date->format('M'));
                $postData['description'] = has_excerpt() ? get_the_excerpt() : wp_trim_words( get_the_content(), 18 );
            }

            array_push($results[$type.'s'], $postData);
        }
    }

    return $results;
}