<?php

namespace App\Listeners;

use App\Events\RatingUpdated;
use App\Models\Rating;
use App\Models\RatingLog;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateRatingLog
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        
    }

    /**
     * Handle the event.
     */
    public function handle(RatingUpdated $event): void
    {

        dd('hola');    
        $rating = $event->rating;
        $changedFields = $event->changedFields;
           // Verificar si el registro acaba de ser creado
        if ($rating->wasRecentlyCreated) {
            // Realizar acciones para un nuevo registro creado
            $this->logAction($rating, 'created');
        } elseif ($rating->trashed()) {
            // Verificar si el registro ha sido eliminado
            // Realizar acciones para un registro eliminado
            $this->logAction($rating, 'deleted');
        }  else {
            $this->logAction($rating, 'updated', $changedFields);
        }
    }

    private function logAction(Rating $rating, string $action, array $changedFields=[]): void
    {
        if (empty($changedFields)) {
            $changedFields[0]= null;
        }

        RatingLog::create([
            'rating_id' => $rating->id,
            'book_id' => $rating->book_id,
            'user_id' => $rating->user_id,
            'rating' => $rating->rating,
            'previous_book_status' => $rating->previous_book_status,
            'change_type' => $action,
            'update_field' => $changedFields[0],
        ]);
    }
}
