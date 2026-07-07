package com.project.expense.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {

    private Double totalExpenses;

    private Long totalTransactions;

    private Double highestExpense;

    private Double averageExpense;

}