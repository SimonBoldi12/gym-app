package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class MemberStatsDTO {

    private long totalMembers;

    private long activeMembers;

    private double totalMonthlyRevenue;

    private double averageFee;

    private Map<String, Long> countByType;
}
