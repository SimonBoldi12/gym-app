package com.example.backend.exception;

public class MemberNotFoundException extends RuntimeException {
    public MemberNotFoundException(Long id) {
        super("Game not found with id: " + id);
    }
}
