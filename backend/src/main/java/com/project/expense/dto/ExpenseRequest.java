package com.project.expense.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ExpenseRequest {

    private String title;

    private String category;

    private Double amount;

    private LocalDate purchaseDate;

    private String description;
}