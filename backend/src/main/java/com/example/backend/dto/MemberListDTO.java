package com.example.backend.dto;

import com.example.backend.model.MembershipType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberListDTO {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    @Email
    private String email;

    @NotNull
    private MembershipType membershipType;

    private boolean active;
}
