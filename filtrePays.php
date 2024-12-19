<?php
/*
plugin name: Filtre Post
description: Une extension qui permettra de filtrer les articles de la page web.
author: Sébastien Malo Jean
author uri: https://github.com/sebastien-malo-jean/31w_filtrePost
*/

function charger_scripts_css(){
 
    $version_css = filemtime(plugin_dir_path(__FILE__). "/style.css");
    $version_js = filemtime(plugin_dir_path(__FILE__) . "js/filtrePost.js");
 
    wp_enqueue_style(
        "filtrePost",        
        plugin_dir_url(__FILE__) . "/style.css",
        [],
        $version_css
    ) ;  
 
    wp_enqueue_script(
        "filtrePost",      
        plugin_dir_url(__FILE__) . "/js/filtrePost.js",
        [],
        $version_js,
        true
    )  ;
}
add_action("wp_enqueue_scripts", "charger_scripts_css");

function genere_boutons() {
$categories = get_categories(array('exclude' => array(10,14)));
$content = "";

foreach ($categories as $element) {
$nom = $element->name;
$id = $element->term_id;
$content .= "<button data-id='$id'>$nom</button>";
}
return '<div class="filtre__bouton">' . $content . '</div>
        <div class="contenu__restapi"></div>';
}



add_shortcode("extraire_categorie", "genere_boutons");