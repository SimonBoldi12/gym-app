package com.example.backend.service;

import com.example.backend.converter.MemberConverter;
import com.example.backend.dto.*;
import com.example.backend.exception.MemberNotFoundException;
import com.example.backend.model.Member;
import com.example.backend.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MemberService {

    private final MemberRepository repository;
    private final MemberConverter converter;

    public MemberService(MemberRepository repository, MemberConverter converter) {
        this.repository = repository;
        this.converter = converter;
    }

    public MemberResponseDTO save(MemberRequestDTO requestDTO){
        Member member = converter.toEntity(requestDTO);
        Member saved = repository.save(member);

        return converter.toResponseDTO(saved);
    }

    public List<MemberListDTO> findAll(Boolean active) {
        List<Member> members;

        if (active != null) {
            members = repository.findByActive(active);
        } else {
            members = repository.findAll();
        }

        return members.stream()
                .map(converter::toListDTO)
                .collect(Collectors.toList());
    }

    public MemberResponseDTO findById(Long id){
        Member member = repository.findById(id)
                .orElseThrow(() -> new MemberNotFoundException(id));

        return converter.toResponseDTO(member);
    }

    public MemberResponseDTO update(MemberRequestDTO requestDTO, Long id){
        Member member = repository.findById(id)
                .orElseThrow(() -> new MemberNotFoundException(id));

        member.setName(requestDTO.getName());
        member.setEmail(requestDTO.getEmail());
        member.setMembershipType(requestDTO.getMembershipType());
        member.setJoinDate(requestDTO.getJoinDate());
        member.setMonthlyFee(requestDTO.getMonthlyFee());
        member.setActive(requestDTO.isActive());

        Member updated = repository.save(member);

        return converter.toResponseDTO(updated);
    }

    public MemberStatsDTO getStats() {
        List<Member> all = repository.findAll();

        MemberStatsDTO stats = new MemberStatsDTO();

        stats.setTotalMembers(all.stream().count());

        stats.setActiveMembers(all.stream()
                .filter(Member::isActive)
                .count());

        stats.setTotalMonthlyRevenue(all.stream()
                .filter(Member::isActive)
                .mapToDouble(Member::getMonthlyFee)
                .sum());

        stats.setAverageFee(all.stream()
                .mapToDouble(Member::getMonthlyFee)
                .average()
                .orElse(0.0));

        stats.setCountByType(all.stream()
                .collect(Collectors.groupingBy(
                        m -> m.getMembershipType().name(),
                        Collectors.counting()
                )));

        return stats;
    }

    public MemberResponseDTO updateStatus(MemberStatusUpdateDTO statusUpdateDTO, Long id){
        Member member = repository.findById(id)
                .orElseThrow(() -> new MemberNotFoundException(id));

        member.setActive(statusUpdateDTO.isActive());

        Member updated = repository.save(member);

        return converter.toResponseDTO(updated);
    }

    public void delete(Long id){
        Member member = repository.findById(id)
                .orElseThrow(() -> new MemberNotFoundException(id));

        repository.delete(member);
    }

}
