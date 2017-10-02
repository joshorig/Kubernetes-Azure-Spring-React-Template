package com.greatapp.notes.endpoints.io;

import com.greatapp.notes.dto.NoteDto;
import lombok.Data;


@Data
public class Note {

    private Long id;
    private String message;

    public Note() {
    }

    public Note(NoteDto noteDto) {
        this.id = noteDto.getId();
        this.message = noteDto.getMessage();
    }

}
