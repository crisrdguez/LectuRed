<?php

namespace App\Listeners;

use App\Models\Review;
use App\Models\ReviewLog;
use App\Events\ReviewUpdated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateReviewLog
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
     public function handle(ReviewUpdated $event): void
    {
     
        $review = $event->review;
        $changedFields = $event->changedFields;
           // Verificar si el registro acaba de ser creado
        if ($review->wasRecentlyCreated) {
            // Realizar acciones para un nuevo registro creado
            $this->logAction($review, 'created');
        } elseif ($review->trashed()) {
            // Verificar si el registro ha sido eliminado
            // Realizar acciones para un registro eliminado
            $this->logAction($review, 'deleted');
        }  else {
            $this->logAction($review, 'updated', $changedFields);
        }
    }
    /**
     * Registra la acción en la tabla de logs.
     */
    private function logAction(Review $review, string $action, array $changedFields=[]): void
    {
        ReviewLog::create([
            'review_id' => $review->id,
            'content' => $review->content,
            'previous_book_status' => $review->previous_book_status,
            'change_type' => $action,
            'updated_field' => $changedFields ?:null,
        ]);
    }
}



 