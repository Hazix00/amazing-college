<?php get_header(); 
      pageBanner(array(
        'title' => get_the_archive_title(),
        'subtitle' => get_the_archive_description()
      ));
?>

  <div class="container container--narrow page-section">
    <?php while (have_posts()) { 
      the_post();  ?>
      <div class="post-item">
        <h2 class="headline headline--medium headline--post-title" ><a href="href=<?php the_permalink(); ?>"> <?php the_title(); ?> </a></h2>
        <div class="metabox">
          <p>Posted By <?php the_author_posts_link() ?> on <?php the_time('d M Y'); ?> in <?php the_category(', ');?></p>
        </div>
        <div class="generic-content">
          <?php the_excerpt(); ?>
          <p><a class="btn btn--blue" href="<?php the_permalink() ?>">continue reading &raquo;</a></p>
        </div>
      </div>
    <?php } 
      echo paginate_links(); ?>
  </div>

<?php get_footer(); ?>