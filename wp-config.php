<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'amazing-college');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

if ( !defined('WP_CLI') ) {
    define('WP_SITEURL', $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST']);
    define('WP_HOME',    $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST']);
}



/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'ZGpqvHHTRZ3X0LgCauUbtUjo69XuB1co23TrKx8B9O6XYD2JB3FnwsxyJI5L0jv1');
define('SECURE_AUTH_KEY',  'bgR0paLFD2KaJvoLL55A4Hvz5ERR8l45ZfUiiEAZSqkQAntrvyaf9On4fp6qsrHc');
define('LOGGED_IN_KEY',    'XBOdSURsqwTHYpYMUnJ2p6R2dLBefxBxNHOXmBJEEPuz8DArdeZ965iipkR8Niek');
define('NONCE_KEY',        'tzy0ifkOa8F1ylo8Q4PNPxBxxohsjSRSjQT1betYyShJzYS3uBu0ag7252IfUV22');
define('AUTH_SALT',        'JlDhLH5KKtItlxtuKsNMn2NPbyIvf7qdkzQqbhvsnDf3mI9Pg13aNWlzVpMNyDlz');
define('SECURE_AUTH_SALT', 'cu20LoGTrp6aafEdfJkbDBXul4C0Se1PqdJXBY4DhlwCohyiCxTIYMsVlF29YyJD');
define('LOGGED_IN_SALT',   'jMbFwI0ZTuSR3lZm00EPwBIFbD7T4Ui018djzvE8kCSU7CwZIfsXytnIwqtA54em');
define('NONCE_SALT',       'kzjY586rbAuLBNCEImilY1IhwOfUTYAimz69ndFdlOGtyESlZo6Mp5drYR4E9nyd');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
