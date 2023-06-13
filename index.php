<?php

use App\config\Settings;
use App\config\Textcontent;

use function App\theme\assets;

$app_data = Settings::react_homepage();
$app_content = wp_json_encode(Textcontent::homepage());
?>
<?php get_header() ?>
<link rel="stylesheet" href="<?php assets('/homepage/main.d9cf0780.css') ?>">
<script>
    window.app_data = JSON.parse(`<?php echo $app_data; ?>`)
    window.app_content = JSON.parse(`<?php echo $app_content; ?>`);
</script>

<div id="app_home_page"></div>
<!-- <script src="<?php //assets('/homepage/main.0268a16d.js') 
                    ?>"></script> -->
<script src="http://localhost:3000/static/js/bundle.js"></script>
<?php get_footer() ?>