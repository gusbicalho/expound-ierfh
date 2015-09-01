<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the id=main div and all content after
 *
 * @package Expound
 */
?>

	</div><!-- #main -->

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="site-info">
			<a href="http://wordpress.org/" rel="generator">Proudly powered by WordPress</a>
<?php printf( __( 'Theme: %1$s by %2$s.', 'expound' ), 'Expound', '<a href="http://kovshenin.com/" rel="designer">Konstantin Kovshenin</a>' ); ?>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>