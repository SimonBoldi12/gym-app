package com.example.backend.converter;

import com.example.backend.dto.MemberListDTO;
import com.example.backend.dto.MemberRequestDTO;
import com.example.backend.dto.MemberResponseDTO;
import com.example.backend.model.Member;
import org.springframework.stereotype.Component;

@Component
public class MemberConverter {

    public Member toEntity(MemberRequestDTO dto){
        if (dto == null){
            return null;
        }

        Member member = new Member();

        member.setName(dto.getName());
        member.setEmail(dto.getEmail());
        member.setMembershipType(dto.getMembershipType());
        member.setJoinDate(dto.getJoinDate());
        member.setMonthlyFee(dto.getMonthlyFee());
        member.setActive(dto.isActive());

        return member;
    }

    public MemberResponseDTO toResponseDTO(Member entity){
        if (entity == null){
            return null;
        }

        MemberResponseDTO responseDTO = new MemberResponseDTO();

        responseDTO.setId(entity.getId());
        responseDTO.setName(entity.getName());
        responseDTO.setEmail(entity.getEmail());
        responseDTO.setMembershipType(entity.getMembershipType());
        responseDTO.setJoinDate(entity.getJoinDate());
        responseDTO.setMonthlyFee(entity.getMonthlyFee());
        responseDTO.setActive(entity.isActive());

        return responseDTO;
    }

    public MemberListDTO toListDTO(Member entity){
        if (entity == null){
            return null;
        }

        MemberListDTO listDTO = new MemberListDTO();

        listDTO.setId(entity.getId());
        listDTO.setName(entity.getName());
        listDTO.setEmail(entity.getEmail());
        listDTO.setMembershipType(entity.getMembershipType());
        listDTO.setActive(entity.isActive());

        return listDTO;
    }
}
