package com.project.expense.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.project.expense.dto.CategoryExpenseResponse;
import com.project.expense.dto.DashboardResponse;
import com.project.expense.dto.ExpenseRequest;
import com.project.expense.dto.MonthlyExpenseResponse;
import com.project.expense.entity.Expense;
import com.project.expense.service.ExpenseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ExpenseController {

    private final ExpenseService expenseService;

    // ================= CREATE =================

    @PostMapping
    public Expense addExpense(@RequestBody ExpenseRequest request) {
        return expenseService.addExpense(request);
    }

    // ================= READ ALL =================

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    // ================= READ BY ID =================

    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id) {
        return expenseService.getExpenseById(id);
    }

    // ================= UPDATE =================

    @PutMapping("/{id}")
    public Expense updateExpense(
            @PathVariable Long id,
            @RequestBody ExpenseRequest request) {

        return expenseService.updateExpense(id, request);
    }

    // ================= DELETE =================

    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Long id) {

        expenseService.deleteExpense(id);
        return "Expense Deleted Successfully";
    }

    // ================= SEARCH =================

    @GetMapping("/search")
    public List<Expense> searchExpenses(
            @RequestParam String keyword) {

        return expenseService.searchExpenses(keyword);
    }

    // ================= FILTER CATEGORY =================

    @GetMapping("/category/{category}")
    public List<Expense> getByCategory(
            @PathVariable String category) {

        return expenseService.getExpensesByCategory(category);
    }

    // ================= DASHBOARD =================

    @GetMapping("/dashboard")
    public DashboardResponse dashboard() {

        return expenseService.getDashboardSummary();
    }

    // ================= MONTHLY REPORT =================

    @GetMapping("/monthly")
    public List<MonthlyExpenseResponse> monthlyExpense() {

        return expenseService.getMonthlyExpense();
    }

    // ================= CATEGORY REPORT =================

    @GetMapping("/category-summary")
    public List<CategoryExpenseResponse> categorySummary() {

        return expenseService.getCategoryExpense();
    }

}