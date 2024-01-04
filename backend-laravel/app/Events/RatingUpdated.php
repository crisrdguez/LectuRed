<?php

namespace App\Events;

use App\Models\Rating;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class RatingUpdated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $rating;
    public $changedFields=[];
    /**
     * Create a new event instance.
     */
    public function __construct(Rating $rating, array $changedFields = [])
    {
        $this->rating = $rating;
        $this->changedFields = $changedFields;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('channel-name'),
        ];
    }
}
