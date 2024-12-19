<?php
/*
Plugin Name: Filtre-Pays
Description: Une extension qui permettra de filtrer les articles de la page "Pays" en fonction du pays sélectionné.
Author: Sébastien Malo Jean
Author URI: https://github.com/sebastien-malo-jean/filtre-pays
*/

// Chargement des scripts et CSS du plugin
function charger_scripts_css_pays(){
    $version_css = filemtime(plugin_dir_path(__FILE__). "style.css");
    $version_js = filemtime(plugin_dir_path(__FILE__) . "js/filtrePays.js");

    wp_enqueue_style(
        "filtrePays",
        plugin_dir_url(__FILE__) . "style.css",
        [],
        $version_css
    );  

    wp_enqueue_script(
        "filtrePays",
        plugin_dir_url(__FILE__) . "js/filtrePays.js",
        [],
        $version_js,
        true
    );
}
add_action("wp_enqueue_scripts", "charger_scripts_css_pays");

// Générer les boutons de pays
function genere_boutons_pays() {
    // Liste de pays proposés
    $pays = [
        "France", 
        "États-Unis", 
        "Canada", 
        "Argentine", 
        "Chili", 
        "Belgique", 
        "Maroc", 
        "Mexique", 
        "Japon", 
        "Italie", 
        "Islande", 
        "Chine", 
        "Grèce", 
        "Suisse"
    ];

    $content = "";

    foreach ($pays as $un_pays) {
        $content .= "<button data-pays='$un_pays'>$un_pays</button>";
    }

    return '<div class="filtre__bouton">' . $content . '</div>
            <div class="contenu__restapi"></div>';
}

add_shortcode("filtre_pays", "genere_boutons_pays");