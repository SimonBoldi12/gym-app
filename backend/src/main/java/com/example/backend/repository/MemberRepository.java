package com.example.backend.repository;

import com.example.backend.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {

    List<Member> findByActive(boolean active);
}
