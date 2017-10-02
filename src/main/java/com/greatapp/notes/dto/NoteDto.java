package com.greatapp.notes.dto;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "note")
public class NoteDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "message", nullable = false)
    private String message;

}
