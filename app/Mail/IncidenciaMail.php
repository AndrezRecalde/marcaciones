<?php

namespace App\Mail;

use App\Models\Incidencia;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class IncidenciaMail extends Mailable
{
    use Queueable, SerializesModels;

    public $incidencia;

    /**
     * Create a new message instance.
     */
    public function __construct($incidencia)
    {
        $this->incidencia = $incidencia;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'SOLICITUD DE ASISTENCIA TÉCNICA',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.incidencia',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
