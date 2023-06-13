<?php

use App\config\Settings;

$settings = Settings::react();
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="keywords" content="<?= bloginfo('keywords') ?>">
  <meta name="description" content="<?= bloginfo('description') ?>">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/js/bootstrap.bundle.min.js"></script>
  <?php wp_head() ?>
</head>
<script>
  window.app_config = JSON.parse(`<?php echo $settings; ?>`)
</script>

<body <?= body_class(' app sidebar-mini frontend-body ') ?>>