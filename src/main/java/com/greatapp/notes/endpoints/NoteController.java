package com.greatapp.notes.endpoints;

import com.greatapp.notes.dto.NoteDto;
import com.greatapp.notes.endpoints.io.Note;
import com.greatapp.notes.service.NoteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/notes")
public class NoteController {

    private static final Logger logger = LoggerFactory.getLogger(NoteController.class);

    @Autowired
    private NoteService noteService;

    @RequestMapping(method = RequestMethod.GET)
    public List<Note> getNotes() {
        logger.debug("Fetching all notes");

        return noteService.findAll().stream()
                .map(Note::new)
                .collect(Collectors.toList());
    }

    @RequestMapping(method = RequestMethod.POST)
    public Note saveNote(@RequestBody Note newNote) {
        logger.debug("Creating a new note with id = {}, message = {}", new Object[]{newNote.getId(), newNote.getMessage()});

        final NoteDto note = new NoteDto();
        note.setMessage(newNote.getMessage());
        noteService.create(note);

        return new Note(note);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{noteId}")
    public Note saveNote(@PathVariable long noteId, @RequestBody Note updatedNote) {
        logger.debug("Updating the note with id = {}, message = {}", new Object[]{noteId, updatedNote.getMessage()});

        final NoteDto note = mapNoteToDto(updatedNote);
        noteService.update(note);

        return new Note(note);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{noteId}")
    @ResponseStatus(HttpStatus.OK)
    public void saveNote(@PathVariable long noteId) {
        logger.debug("Deleting the note with id = {}", noteId);
        noteService.deleteById(noteId);
    }

    private NoteDto mapNoteToDto(Note note) {
        final NoteDto noteDto = new NoteDto();
        noteDto.setId(note.getId());
        noteDto.setMessage(note.getMessage());
        return noteDto;
    }
}
