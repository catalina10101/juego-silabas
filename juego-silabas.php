<?php
/*
Plugin Name: juego-silabas
*/

if(!defined('ABSPATH')){
	die;
}

function juego_silabas_install() {
//	global $Transformadas_db_version;


//	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

//	add_option( 'juegos_db_version', $juegos_db_version );
}

function juego_silabas_uninstall() {
	
}


register_activation_hook( __FILE__, 'juego_silabas_install' );
//register_activation_hook( __FILE__, 'juegos_install_data' );
register_deactivation_hook( __FILE__, 'juego_silabas_uninstall' );
register_uninstall_hook( __FILE__, 'juego_silabas_uninstall' );
////////////////////

add_action('wp_enqueue_scripts','juego_silabas_init');

function juego_silabas_init() {    

    if ( is_page( 'juego-silabas' ) ) {
    	wp_enqueue_script( 'phaser', plugins_url( '/js/phaser.min.js', __FILE__ ));
    	wp_enqueue_style( 'transformadas', plugins_url( '/transformadas.css', __FILE__ ));
    	
    	wp_enqueue_script( 'main', plugins_url( '/js/main.js', __FILE__ ));
        wp_enqueue_script( 'sceneMain', plugins_url( '/js/scenes/sceneMain.js', __FILE__ ));
        wp_enqueue_script( 'sceneTitle', plugins_url( '/js/scenes/sceneTitle.js', __FILE__ ));
        wp_enqueue_script( 'sceneOver', plugins_url( '/js/scenes/sceneOver.js', __FILE__ ));
        wp_enqueue_script( 'sceneLoad', plugins_url( '/js/scenes/sceneLoad.js', __FILE__ ));
        wp_enqueue_script( 'model', plugins_url( '/js/classes/mc/model.js', __FILE__ ));
        wp_enqueue_script( 'constants', plugins_url( '/js/constants.js', __FILE__ ));
        wp_enqueue_script( 'controller', plugins_url( '/js/classes/mc/controller.js', __FILE__ ));
        
        wp_enqueue_script( 'bar', plugins_url( '/js/classes/comps/bar.js', __FILE__ ));
        wp_enqueue_script( 'palabra', plugins_url( '/js/classes/comps/palabra.js', __FILE__ ));
        wp_enqueue_script( 'silaba', plugins_url( '/js/classes/comps/silaba.js', __FILE__ ));
        wp_enqueue_script( 'espacio', plugins_url( '/js/classes/comps/espacio.js', __FILE__ ));
        wp_enqueue_script( 'celebration', plugins_url( '/js/classes/comps/celebration.js', __FILE__ ));
        wp_enqueue_script( 'palabras_casa', plugins_url( '/js/data/palabras-casa.json', __FILE__ ));
		
        wp_enqueue_script( 'alignGrid', plugins_url( '/js/classes/util/alignGrid.js', __FILE__ ));
        wp_enqueue_script( 'align', plugins_url( '/js/classes/util/align.js', __FILE__ ));
        wp_enqueue_script( 'mediaManager', plugins_url( '/js/classes/util/mediaManager.js', __FILE__ ));        
        wp_enqueue_script( 'flatButton', plugins_url( '/js/classes/ui/flatButton.js', __FILE__ ));        
    	
    	$script_data = array(
            'plugin_path' => WP_PLUGIN_URL . '/juego-silabas/'
        );
        wp_localize_script(
            'sceneLoad',
            'wpa_data',
            $script_data
        );
    }
}