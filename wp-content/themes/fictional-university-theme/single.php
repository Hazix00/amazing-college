<?php
  
  get_header();

  while(have_posts()) {
    the_post(); 
    pageBanner(array(
      'subtitle' => 'DONT FORGET TO REPLACE ME LATER'
    ));
    ?>
    <div class="container container--narrow page-section">
      <div class="metabox metabox--position-up metabox--with-home-link">
        <p><a class="metabox__blog-home-link" href="<?php echo site_url('/blog'); ?>"><i class="fa fa-home" aria-hidden="true"></i> Blog Home</a> <span class="metabox__main">Posted By <?php the_author_posts_link() ?> on <?php the_time('d M Y'); ?> in <?php the_category(', ');?></span></p>
      </div>
      <div class="generic-content">
        <?php the_content(); ?>
      </div>
    </div>
    
  <?php }

  get_footer();

?>