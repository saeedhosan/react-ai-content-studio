<?php

namespace App\Models;

use WeDevs\ORM\Eloquent\Model;
// use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subscriptions extends Model
{

    /**
     * Name for table without prefix
     * @var string
     */
    protected $table = 'app_subscriptions';

    /**
     * Columns that can be edited - IE not primary key or timestamps if being used
     */
    protected $fillable = [
        'uid',
        'user_id',
        'plan_id',
        'payment_method',
        'words',
        'image',
        'options',
        'status',
        'paid',
        'payment_claimed',
        'current_period_ends_at',
        'start_at',
        'end_at',
        'end_period_last_days',
    ];


    /** Everything below this is best done in an abstract class that custom tables extend */

    /**
     * Set primary key as ID, because WordPress
     *
     * @var string
     */
    protected $primaryKey = 'id';


    public static function boot()
    {
        parent::boot();

        // Create uid when creating list.
        static::creating(function ($item) {
            // Create new uid
            $uid = uniqid();
            while (self::where('uid', $uid)->count() > 0) {
                $uid = uniqid();
            }
            $item->uid = $uid;
        });
    }

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
     * get active subscription
     * @return object|null
     */
    public static function activeSubscription($user_id = null, $checkExpire = true)
    {
        if (!$user_id) {
            $user_id = User::userid() ?? 0;
        }

        if (self::where(['user_id' => $user_id, 'status' => 'active'])->count() < 1) {
            return null;
        }

        $subscription = self::where(['user_id' => $user_id, 'status' => 'active'])->first();

        if ($checkExpire && strtotime($subscription->end_at) < time()) {
            return null;
        }

        return $subscription;
    }



    /**
     * get plan
     * 
     */
    public function plan()
    {
        return $this->belongsTo(Plans::class);
    }

    /**
     * get user     
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * get words are still have
     */
    public  function words()
    {
        return isset($this->words) ? $this->words : 0;
    }
    /**
     * get words are still have
     */
    public  function images()
    {
        return isset($this->image) ? intval($this->image) : 0;
    }
    /**
     * decressd iage
     */
    public function decressdImage($len = 1)
    {
        $image = $this->images();

        $decressd = $image - $len;

        $decressd = $decressd < 0 ? 0 : $decressd;

        $updated =  $this->update(['image' => $decressd]);

        return $updated ? true : false;
    }
    /**
     * get words are still have
     */
    public static function getWords()
    {
        if (!self::activeSubscription()) {
            return 0;
        }

        $words = self::activeSubscription()->words;
        return intval($words);
    }

    /**
     * decress words
     */
    public function decressdWords($len)
    {
        $words = intval($this->words());

        $decressd = $words - $len;

        $decressd = $decressd < 0 ? 0 : $decressd;

        $updated =  $this->update(['words' => $decressd]);

        return $updated ? true : false;
    }

    /**
     * cancel subsciption
     * 
     */
    public static  function cancel()
    {

        $this_id = self::activeSubscription()->id;

        PurchaseLog::where('subscription_id', $this_id)->update(['status' => 'ended']);

        $delete = self::where('id', $this_id)->delete();

        if ($delete) {
            return true;
        }

        return false;
    }
}
