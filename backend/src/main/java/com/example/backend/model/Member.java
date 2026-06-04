package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "member")
@Data
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MembershipType membershipType;

    @Column(name = "monthly_fee", nullable = false)
    private Double monthlyFee;

    @Column(name = "join_date", nullable = false)
    private LocalDate joinDate;

    private boolean active;


}
