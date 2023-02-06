<?php

function wpdocs_theme_name_scripts() {
    wp_register_style('main-style', get_template_directory_uri().'/style.css', array(), true);
    wp_enqueue_script('style_script', get_template_directory_uri().'/js/style.js', array('jquery'), 1.1, true );
    wp_enqueue_style('main-style');
}

function myphpinformation_scripts() {
    if( !is_admin()){
        wp_deregister_script('jquery');
        wp_register_script('jquery', get_template_directory_uri() . '/js/jquery-3.6.0.min.js', false);
        wp_enqueue_script('jquery');
    }
}
add_action( 'wp_enqueue_scripts', 'myphpinformation_scripts' );
add_action( 'wp_enqueue_scripts', 'wpdocs_theme_name_scripts' );

register_nav_menus(array(
    'menu-principal' => 'Menu principal',
    'footer' => 'Footer',
));

function basta_setup() {
    add_theme_support( 'editor-styles' );
}
add_action( 'after_setup_theme', 'basta_setup' );
add_theme_support('post-thumbnails');

function themename_custom_logo_setup() {
    $defaults = array(
        'height'               => 80,
        'width'                => 80,
        'flex-height'          => true,
        'flex-width'           => true,
        'header-text'          => array( 'site-title', 'site-description' ),
        'unlink-homepage-logo' => false,
    );

    add_theme_support( 'custom-logo', $defaults );
}

add_action( 'after_setup_theme', 'themename_custom_logo_setup' );

add_theme_support( 'custom-spacing' );

// Limite l'extrait à 20 mots
add_filter( 'excerpt_length', function () {
    return 15;
}, 999 );

//changer le logo de l'admin bar
/* Change logo administration bar */
function wphelp_change_admin_logo() {
    echo '
<style type="text/css">
#wpadminbar #wp-admin-bar-wp-logo > .ab-item .ab-icon:before {
background-image: url(https://bastamultimedia.com/wp-content/uploads/2022/07/PRISE-JAUNE.svg) !important;
background-repeat: no-repeat;
background-position: center;
background-size: contain;
color:rgba(0, 0, 0, 0);
}
#wpadminbar #wp-admin-bar-wp-logo.hover > .ab-item .ab-icon {
background-position: 0 0;
}
</style>
';
}
//hook the header admin output
add_action('wp_before_admin_bar_render', 'wphelp_change_admin_logo');

// Ajouter un widget dans le tableau de bord de WordPress
function wpc_dashboard_widget_function() {

// Saisie du texte entre les guillemets
    echo "
<div>
<h2>Bienvenue sur votre WordPress</h2>
<span>Ce site vous a été créé par <a href='https://bastamultimedia.com' target='_blank'>Basta Multimedia</a></span><br>
<span>Retrouvez l'ensemble de nos actualités sur <a href='https://www.instagram.com/bastamultimedia/' target='_blank'>Instagram</a></span><br>
<span>Ou sur <a href='https://fr.linkedin.com/company/basta-multimedia' target='_blank'>Linkedin</a></span>
</div>
";
}
function wpc_add_dashboard_widgets() {
    wp_add_dashboard_widget('wp_dashboard_widget', 'Informations', 'wpc_dashboard_widget_function');
}
add_action('wp_dashboard_setup', 'wpc_add_dashboard_widgets' );

//Style du login
function my_login_stylesheet() {
    wp_enqueue_style( 'custom-login', get_stylesheet_directory_uri() . '/login/login-style.css' );
}
add_action( 'login_enqueue_scripts', 'my_login_stylesheet' );

// Lien du logo de wp-login.php vers la page d'accueil //
function url_logo_personnalise() {
    return 'https://bastamultimedia.com';
}
add_filter( 'login_headerurl', 'url_logo_personnalise' );
