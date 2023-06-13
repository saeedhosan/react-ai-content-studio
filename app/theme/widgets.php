<?php
namespace App\theme;

class Widgets
{
    /**
     * register wedget
     */
    public function register($wedget = 'my_wedget')
    {
        $name = str_replace('_', ' ', $wedget);

        add_action('widgets_init', register_sidebar(array(
            'name' => __($name, 'textdomain'),
            'id' => $wedget,
            'description' => __($name . ' wedget', 'textdomain'),
            'class' => null,
            'before_widget' => null,
            'after_widget' => null,
            'before_title' => null,
            'after_title' => null,
            'before_sidebar' => null,
            'after_sidebar' => null,
            'class' => null,
            'show_in_rest' => true,
        )));

    }

    /**
     * get all wedgets
     */
    public function all()
    {
        global $wp_registered_sidebars, $wp_registered_widgets;
        $widget_list = $wp_registered_sidebars;
        $blocks_list = $wp_registered_widgets;
        $data = [];
        $wedgets = wp_get_sidebars_widgets();
        foreach ($wedgets as $name => $bloks) {
            $content = '';
            foreach ($bloks as $blok) {
                // The name of the option in the database is the name of the widget class.
                $option_name = $blocks_list[$blok]['callback'][0]->option_name;

                // Widget data is stored as an associative array. To get the right data we need to get the right key which is stored in $wp_registered_widgets
                $key = $wp_registered_widgets[$blok]['params'][0]['number'];

                $widget_data = get_option($option_name);

                // Add the widget data on to the end of the output array.
                // $data[] = (object) $widget_data[$key];
                $content .= $widget_data[$key]['content'];
            }

            $data[] = [
                'name' => $name,
                'conent' => $content,
                // $name => $content,
            ];
        }

        return $data;
    }

    /**
     * get all wedgets
     */
}
