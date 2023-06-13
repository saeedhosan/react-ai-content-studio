<?php

use App\config\Settings;
use App\config\Textcontent;

use function App\theme\assets;

$app_content = wp_json_encode(Textcontent::dashobard());
$app_data = Settings::react_dashboard();

get_header()


?>
<script>
    window.app_content = JSON.parse(`<?php echo $app_content; ?>`);
</script>
<div id="dashbard_page"></div>
<script src="http://localhost:3000/static/js/bundle.js"></script>
<?php get_footer() ?>