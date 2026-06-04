package com.example.backend.dto;

import com.example.backend.model.MembershipType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class MemberResponseDTO {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    @Email
    private String email;

    @NotNull
    private MembershipType membershipType;

    @NotNull
    @Min(1)
    private Double monthlyFee;

    @NotNull
    @PastOrPresent
    private LocalDate joinDate;

    private boolean active;
}
