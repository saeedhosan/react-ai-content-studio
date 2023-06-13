<?php

namespace App\Models;

use WeDevs\ORM\Eloquent\Model;

class Comments extends Model
{
    protected $table = 'comments';

    /**
     * Columns that can be edited - IE not primary key or timestamps if being used
     */
    protected $fillable = [
        'uid',
        'comment_post_ID',
        'comment_author',
        'comment_author_email',
        'comment_author_url',
        'comment_date',
        'comment_date_gmt',
        'comment_content',
        'comment_karma',
        'comment_approved',
        'comment_agent',
        'comment_type',
        'comment_parent',
        'user_id',
    ];


    /** Everything below this is best done in an abstract class that custom tables extend */

    /**
     * Set primary key as ID, because WordPress
     *
     * @var string
     */
    protected $primaryKey = 'comment_ID';

    /**
     * Overide parent method to make sure prefixing is correct.
     *
     * @return string
     */
    public function getTable()
    {
        // In this example, it's set, but this is better in an abstract class
        if (isset($this->table)) {
            $prefix =  $this->getConnection()->db->prefix;

            return $prefix . $this->table;
        }

        return parent::getTable();
    }

    /**
     * get user     
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
