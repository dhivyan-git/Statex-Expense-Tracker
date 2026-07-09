package com.project.expense.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.project.expense.dto.CategoryExpenseResponse;
import com.project.expense.dto.DashboardResponse;
import com.project.expense.dto.ExpenseRequest;
import com.project.expense.dto.MonthlyExpenseResponse;
import com.project.expense.entity.Expense;
import com.project.expense.entity.User;
import com.project.expense.repository.ExpenseRepository;
import com.project.expense.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    // ================= CURRENT USER =================

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // ================= CREATE =================

    public Expense addExpense(ExpenseRequest request) {

        User currentUser = getCurrentUser();

        Expense expense = new Expense();

        expense.setTitle(request.getTitle());
        expense.setCategory(request.getCategory());
        expense.setAmount(request.getAmount());
        expense.setPurchaseDate(request.getPurchaseDate());
        expense.setDescription(request.getDescription());

        expense.setUser(currentUser);

        return expenseRepository.save(expense);
    }

    // ================= READ ALL =================

    public List<Expense> getAllExpenses() {

    return expenseRepository.findByUser(getCurrentUser());

}

    // ================= READ BY ID =================

    public Expense getExpenseById(Long id) {

        return expenseRepository
                .findByIdAndUser(id, getCurrentUser())
                .orElseThrow(() -> new RuntimeException("Expense not found"));

    }

    // ================= UPDATE =================

    public Expense updateExpense(Long id, ExpenseRequest request) {

        Expense expense = getExpenseById(id);

        expense.setTitle(request.getTitle());
        expense.setCategory(request.getCategory());
        expense.setAmount(request.getAmount());
        expense.setPurchaseDate(request.getPurchaseDate());
        expense.setDescription(request.getDescription());

        return expenseRepository.save(expense);
    }

    // ================= DELETE =================

    public void deleteExpense(Long id) {

        Expense expense = getExpenseById(id);

        expenseRepository.delete(expense);
    }

    // ================= SEARCH =================

    public List<Expense> searchExpenses(String keyword) {

        return expenseRepository.findByTitleContainingIgnoreCaseAndUser(
                keyword,
                getCurrentUser());

    }

    // ================= CATEGORY =================

    public List<Expense> getExpensesByCategory(String category) {

        return expenseRepository.findByCategoryIgnoreCaseAndUser(
                category,
                getCurrentUser());

    }

    // ================= DASHBOARD =================

    public DashboardResponse getDashboardSummary() {

        User user = getCurrentUser();

        return new DashboardResponse(
                expenseRepository.getTotalExpense(user),
                expenseRepository.getTotalTransactions(user),
                expenseRepository.getHighestExpense(user),
                expenseRepository.getAverageExpense(user)
        );
    }

    // ================= MONTHLY REPORT =================

    public List<MonthlyExpenseResponse> getMonthlyExpense() {

        List<Object[]> rows =
                expenseRepository.getMonthlyExpense(getCurrentUser());

        List<MonthlyExpenseResponse> response = new ArrayList<>();

        for (Object[] row : rows) {

            response.add(new MonthlyExpenseResponse(
                    row[0].toString(),
                    ((Number) row[1]).doubleValue()
            ));
        }

        return response;
    }

    // ================= CATEGORY REPORT =================

    public List<CategoryExpenseResponse> getCategoryExpense() {

        List<Object[]> rows =
                expenseRepository.getCategoryExpense(getCurrentUser());

        List<CategoryExpenseResponse> response = new ArrayList<>();

        for (Object[] row : rows) {

            response.add(new CategoryExpenseResponse(
                    row[0].toString(),
                    ((Number) row[1]).doubleValue()
            ));
        }

        return response;

        
    }

}