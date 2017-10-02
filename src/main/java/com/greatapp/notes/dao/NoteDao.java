package com.greatapp.notes.dao;

import com.greatapp.notes.dto.NoteDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository("noteDao")
public interface NoteDao extends JpaRepository<NoteDto, Long> {
    NoteDto findById(Long id);
}
