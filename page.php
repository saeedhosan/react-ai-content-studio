<?php

use App\config\Textcontent;

use function App\theme\assets;

$bg_image = Textcontent::homepage()['hero_section']['bgImage'];

$app_content = wp_json_encode(Textcontent::homepage());
?>
<?php get_header() ?>
<link rel="stylesheet" href="<?php assets('/homepage/main.d9cf0780.css') ?>">
<style>
    a {
        color: red;
    }

    #app_page_body {
        min-height: 300px;
    }

    div.header-hero {
        background-image: url("<?php echo $bg_image; ?>");
        background-position: top, left;
        background-repeat: no-repeat;
        width: 100%;
        width: 100%;
        height: 100px;
        background-size: cover;
        margin-bottom: 60px;
    }
</style>
<script>
    window.app_content = JSON.parse(`<?php echo $app_content; ?>`);
</script>
<div className="page-main">
    <div className="main-content">
        <div className="side-app">
            <div id="app_page_header"></div>
            <div class="header-hero"></div>
            <div id="app_page_body">
                <?php
                if (have_posts()) {
                    while (have_posts()) {
                        the_post();
                ?>
                        <section>
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-12 entries">
                                        <nav aria-label="breadcrumb">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item"><a href="<?= get_site_url(); ?>">Home</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">
                                                    <?php the_title(); ?>
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="blog" class="blog">
                            <div class="container">

                                <div class="row">

                                    <div class="col-lg-12 entries">

                                        <article style="padding:20px">

                                            <div class="entry-footer" style="padding-bottom: 36px;">
                                                <ul class="tags">
                                                    <?php
                                                    $posttags = get_the_tags();
                                                    if ($posttags) {
                                                        foreach ($posttags as $tag) {
                                                            echo '<li><a href="' . home_url() . '/?s=' . $tag->name . '"><i class="bi bi-tags"></i> ' . $tag->name . '</a></li>';
                                                        }
                                                    }
                                                    ?>
                                                </ul>
                                            </div>
                                            <div class="entry-content">
                                                <div class="future-img col-md-12">
                                                    <?php the_post_thumbnail('100*100') ?>
                                                </div>
                                                <?php the_content(); ?>

                                            </div>



                                        </article><!-- End blog entry -->

                                    </div>
                                </div>

                            </div>
                        </section>
                <?php
                    }
                }
                ?>
            </div>
            <div id="app_page_footer"></div>
        </div>
    </div>
</div>
<?php get_footer() ?>
<script src="<?php assets('/page-footer/main.737551d1.js') ?>"></script>
<script src="<?php assets('/page-header/main.e4caf3d1.js') ?>"></script>