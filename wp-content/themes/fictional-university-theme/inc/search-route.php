<?php

add_action('rest_api_init', 'universityRegisterSearch');

function universityRegisterSearch(){
    register_rest_route('university/v1', 'search', array(
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'universitySearchResults'
    ));
}

function universitySearchResults($data){
    ob_clean();
    $mainQuery = new WP_Query(array(
        'post_type' => 'any',
        's' => sanitize_text_field($data['term']),
        'posts_per_page' => -1
    ));
    $results = array(
        'generalInfos' => array(),
        'professors' => array(),
        'campuses' => array(),
        'events' => array(),
        'programs' => array()
    );

    while ($mainQuery->have_posts()) {
        $mainQuery->the_post();
        $type = get_post_type();
        $postData = array(
            'title' => get_the_title(),
            'permalink' => get_the_permalink(),
            'type' => $type,
            'authorName' => get_the_author()
        );

        $genInfoTypes = array('post', 'page');

        if(in_array($type, $genInfoTypes)) {
            array_push($results['generalInfos'], $postData);
        }
        else {
            if($type == 'campus') $type .= 'e';

            array_push($results[$type.'s'], $postData);
        }
    }

    return $results;
}