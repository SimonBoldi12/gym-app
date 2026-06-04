package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Gym-app", description = "Gym members system")
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:5173")
public class MemberController {

    private final MemberService service;

    public MemberController(MemberService service) {
        this.service = service;
    }

    @PostMapping
    @Operation(summary = "Add new member", description = "Create a new member")
    public ResponseEntity<MemberResponseDTO> create(@Valid @RequestBody MemberRequestDTO requestDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(requestDTO));
    }

    @GetMapping
    @Operation(summary = "List members", description = "List all members")
    public ResponseEntity<List<MemberListDTO>> getAll(
            @Parameter(description = "Szűrés aktív/inaktív tagokra")
            @RequestParam(required = false) Boolean active) {
        return ResponseEntity.ok(service.findAll(active));
    }

    @GetMapping("/stats")
    @Operation(summary = "Get stats", description = "Get all stats")
    public ResponseEntity<MemberStatsDTO> getStats(){
        return ResponseEntity.ok(service.getStats());
    }

    @GetMapping("/{id}")
    @Operation(summary = "List member by id", description = "List member by id")
    public ResponseEntity<MemberResponseDTO> getById(@Parameter(name = "Member id") @PathVariable Long id){
        return ResponseEntity.ok(service.findById(id));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update status", description = "update status by id")
    public ResponseEntity<MemberResponseDTO> updateStatus(
            @RequestBody MemberStatusUpdateDTO statusUpdateDTO,
            @Parameter(name = "Member id") @PathVariable Long id){
        return ResponseEntity.ok(service.updateStatus(statusUpdateDTO, id));
    }

    @PutMapping("/{id}/edit")
    @Operation(summary = "Update member", description = "update member by id")
    public ResponseEntity<MemberResponseDTO> update(
            @RequestBody MemberRequestDTO requestDTO,
            @Parameter(name = "Member id") @PathVariable Long id){
        return ResponseEntity.ok(service.update(requestDTO, id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete member by id", description = "Delete member by id")
    public ResponseEntity<Void> delete(@Parameter(name = "Member id") @PathVariable Long id){
        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}
