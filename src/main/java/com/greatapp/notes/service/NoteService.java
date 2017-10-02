package com.greatapp.notes.service;

import com.greatapp.notes.dao.NoteDao;
import com.greatapp.notes.dto.NoteDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("noteService")
public class NoteService {

    @Autowired
    private NoteDao noteDao;

    @Transactional(readOnly = true)
    public List<NoteDto> findAll() {
        return noteDao.findAll();
    }

    @Transactional
    public void create(NoteDto note) {
        noteDao.save(note);
    }

    @Transactional
    public void update(NoteDto note) {
        NoteDto existingNote = noteDao.findById(note.getId());
        if (existingNote == null) {
            throw new RuntimeException("Note is not found. Unable to update it.");
        }

        noteDao.save(note);
    }

    @Transactional
    public void deleteById(Long noteId) {
        NoteDto existingNote = noteDao.findById(noteId);
        if (existingNote == null) {
            throw new RuntimeException("Note is not found. Unable to delete it.");
        }

        noteDao.delete(existingNote);
    }
}
